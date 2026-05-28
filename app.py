import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['OMP_NUM_THREADS'] = '1'
os.environ['MKL_NUM_THREADS'] = '1'

import numpy as np
import onnxruntime as ort
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Path to the ONNX model used for lightweight prediction
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "best_model.onnx"
)

# Original TensorFlow weights used only for real Grad-CAM generation
TF_MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
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

def _get_session_options():
    sess_options = ort.SessionOptions()
    sess_options.intra_op_num_threads = 1
    sess_options.inter_op_num_threads = 1
    sess_options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
    return sess_options

# Load ONNX model
print("Loading ONNX model...")
session = ort.InferenceSession(
    MODEL_PATH,
    providers=['CPUExecutionProvider'],
    sess_options=_get_session_options()
)

input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name
_gradcam_model = None
_gradcam_lock = threading.Lock()

# Warmup
print("Warming up model...")
warmup_data = np.zeros((1, IMAGE_SIZE[0], IMAGE_SIZE[1], 3), dtype=np.float32)
session.run([output_name], {input_name: warmup_data})
print("Model loaded and ready.")



def preprocess_image(file_path):
    """Load and preprocess image using PIL (no TensorFlow needed)."""
    img = Image.open(file_path).convert('RGB')
    img = img.resize(IMAGE_SIZE, Image.BICUBIC)
    img_array = np.array(img, dtype=np.float32)
    img_array = img_array / 255.0  # Rescale as per training
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


def get_gradcam_model():
    """Build the original Keras model lazily so normal prediction stays on ONNX."""
    global _gradcam_model
    if _gradcam_model is not None:
        return _gradcam_model

    with _gradcam_lock:
        if _gradcam_model is not None:
            return _gradcam_model

        import h5py
        import tensorflow as tf

        tf.config.threading.set_intra_op_parallelism_threads(1)
        tf.config.threading.set_inter_op_parallelism_threads(1)

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

        with h5py.File(TF_MODEL_PATH, 'r') as f:
            dense_group = f['dense_8']['dense_8']
            kernel = dense_group['kernel:0'][:]
            bias = dense_group['bias:0'][:]
            model.layers[-1].set_weights([kernel, bias])

        _gradcam_model = model
        return _gradcam_model


def generate_gradcam(file_path, img_array, predicted_class_idx):
    """Generate true Grad-CAM from the final Xception convolutional activation."""
    import matplotlib as mpl
    import tensorflow as tf
    from tensorflow.keras.preprocessing import image

    model = get_gradcam_model()
    base_model = model.layers[0]

    try:
        grad_base = tf.keras.models.Model(
            base_model.inputs,
            base_model.get_layer('block14_sepconv2_act').output
        )
    except ValueError:
        grad_base = base_model

    with tf.GradientTape() as tape:
        last_conv_layer_output = grad_base(img_array)
        tape.watch(last_conv_layer_output)

        x = model.layers[1](last_conv_layer_output)
        preds = model.layers[2](x)
        class_channel = preds[:, predicted_class_idx]

    grads = tape.gradient(class_channel, last_conv_layer_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0)
    heatmap = heatmap ** 2
    heatmap = heatmap / (tf.math.reduce_max(heatmap) + 1e-10)
    heatmap = heatmap.numpy()

    original_img = image.load_img(file_path)
    original_img_array = image.img_to_array(original_img)

    heatmap_uint8 = np.uint8(255 * heatmap)
    jet = mpl.colormaps['jet']
    jet_colors = jet(np.arange(256))[:, :3]
    jet_heatmap = jet_colors[heatmap_uint8]

    jet_heatmap = image.array_to_img(jet_heatmap)
    jet_heatmap = jet_heatmap.resize(
        (original_img_array.shape[1], original_img_array.shape[0]),
        Image.BICUBIC
    )
    jet_heatmap = image.img_to_array(jet_heatmap)

    superimposed_img = np.clip(jet_heatmap * 0.35 + original_img_array * 0.65, 0, 255)
    superimposed_img = image.array_to_img(superimposed_img)

    buffered = io.BytesIO()
    superimposed_img.save(buffered, format="JPEG", quality=90)
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{img_str}"


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

        # Preprocessing with PIL
        img_array = preprocess_image(temp_path)

        # Inference with ONNX Runtime
        predictions = session.run([output_name], {input_name: img_array})
        pred = predictions[0][0]
        predicted_class_idx = int(np.argmax(pred))
        confidence = float(pred[predicted_class_idx]) * 100

        try:
            gradcam_url = generate_gradcam(temp_path, img_array, predicted_class_idx)
        except Exception as e:
            print(f"Grad-CAM generation failed: {e}")
            import traceback
            traceback.print_exc()
            gradcam_url = None

        result = {
            "prediction": CLASS_LABELS[predicted_class_idx],
            "confidence": confidence,
            "all_predictions": {CLASS_LABELS[i]: float(pred[i]) * 100 for i in range(len(CLASS_LABELS))},
            "gradCamUrl": gradcam_url
        }

        # Cleanup
        os.remove(temp_path)

        return jsonify(result)

    except Exception as e:
        print(f"Error during prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok", "model": "DeepLung ONNX"})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
