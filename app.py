import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['OMP_NUM_THREADS'] = '1'
os.environ['MKL_NUM_THREADS'] = '1'

import numpy as np
import tensorflow as tf

# Limit TensorFlow to 1 thread to optimize memory/CPU usage on Render free tier
tf.config.threading.set_intra_op_parallelism_threads(1)
tf.config.threading.set_inter_op_parallelism_threads(1)

from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Path to the trained model
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main",
    "Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main",
    "best_model.hdf5"
)

# Class labels (must match training order)
CLASS_LABELS = [
    'Adenocarcinoma',
    'Large Cell Carcinoma',
    'Normal',
    'Squamous Cell Carcinoma'
]

# Configure image size (from training)
IMAGE_SIZE = (350, 350)

def get_model():
    base_model = tf.keras.applications.Xception(
        weights='imagenet',
        include_top=False, 
        input_shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3)
    )
    model = tf.keras.models.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(4, activation='softmax')
    ])
    
    # Manually load the dense layer weights from the hdf5 file
    import h5py
    with h5py.File(MODEL_PATH, 'r') as f:
        dense_group = f['dense_8']['dense_8']
        kernel = dense_group['kernel:0'][:]
        bias = dense_group['bias:0'][:]
        model.layers[-1].set_weights([kernel, bias])
        
    return model

print("Loading model...")
model = get_model()
print("Model loaded successfully. Warming up model...")
# Warmup prediction to compile the graph during boot
try:
    warmup_data = np.zeros((1, IMAGE_SIZE[0], IMAGE_SIZE[1], 3))
    model.predict(warmup_data, verbose=0)
    print("Model warmed up and ready.")
except Exception as e:
    print(f"Model warmup failed: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save temp file
        temp_path = "temp_prediction_image.jpg"
        file.save(temp_path)

        # Preprocessing
        img = image.load_img(temp_path, target_size=IMAGE_SIZE)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Rescale as per training

        # Inference
        predictions = model.predict(img_array)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx]) * 100

        # Grad-CAM Generation
        try:
            import matplotlib as mpl
            import base64
            import io
            
            # Get inner Xception model and build a sub-model to target block14_sepconv2_act safely
            base_model = model.layers[0]
            try:
                # Try explicit targeting first
                grad_base = tf.keras.models.Model(
                    base_model.inputs, 
                    base_model.get_layer('block14_sepconv2_act').output
                )
            except ValueError:
                # Fallback to the entire base model if layer name differs
                grad_base = base_model

            with tf.GradientTape() as tape:
                last_conv_layer_output = grad_base(img_array)
                tape.watch(last_conv_layer_output)
                
                # We need to map from the targeted conv layer's output to the final dense prediction
                # If we used explicit grad_base, the rest of Xception wasn't called.
                # However, block14_sepconv2_act IS the final layer of Xception (include_top=False). 
                # So last_conv_layer_output is identical to base_model(img_array) anyway.
                
                # GlobalAveragePooling2D
                x = model.layers[1](last_conv_layer_output)
                # Dense
                preds = model.layers[2](x)
                
                class_channel = preds[:, predicted_class_idx]

            grads = tape.gradient(class_channel, last_conv_layer_output)
            pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

            last_conv_layer_output = last_conv_layer_output[0]
            heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
            heatmap = tf.squeeze(heatmap)
            
            # Apply ReLU
            heatmap = tf.maximum(heatmap, 0)
            
            # Sharpening the heatmap by squaring it to suppress weak background noise (e.g. heart region)
            heatmap = heatmap ** 2  
            
            # Normalize
            heatmap = heatmap / (tf.math.reduce_max(heatmap) + 1e-10)
            heatmap = heatmap.numpy()
            
            # Overlay
            original_img = image.load_img(temp_path)
            original_img_array = image.img_to_array(original_img)
            
            heatmap_uint8 = np.uint8(255 * heatmap)
            jet = mpl.colormaps['jet']
            jet_colors = jet(np.arange(256))[:, :3]
            jet_heatmap = jet_colors[heatmap_uint8]
            
            # Use PIL for bicubic resizing to get a smoother map
            from PIL import Image
            jet_heatmap = image.array_to_img(jet_heatmap)
            jet_heatmap = jet_heatmap.resize((original_img_array.shape[1], original_img_array.shape[0]), Image.BICUBIC)
            jet_heatmap = image.img_to_array(jet_heatmap)
            
            # New controlled blending (overlay = original_image * 0.65 + heatmap_colored * 0.35)
            superimposed_img = np.clip(jet_heatmap * 0.35 + original_img_array * 0.65, 0, 255)
            superimposed_img = image.array_to_img(superimposed_img)
            
            buffered = io.BytesIO()
            superimposed_img.save(buffered, format="JPEG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            gradcam_url = f"data:image/jpeg;base64,{img_str}"
        except Exception as e:
            import traceback
            error_str = traceback.format_exc()
            print(f"GradCAM failed: {error_str}")
            gradcam_url = f"error: {str(e)}"

        result = {
            "prediction": CLASS_LABELS[predicted_class_idx],
            "confidence": confidence,
            "all_predictions": {CLASS_LABELS[i]: float(predictions[0][i]) * 100 for i in range(len(CLASS_LABELS))},
            "gradCamUrl": gradcam_url
        }

        # Cleanup
        os.remove(temp_path)

        return jsonify(result)

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
