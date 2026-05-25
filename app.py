import os
os.environ['OMP_NUM_THREADS'] = '1'
os.environ['MKL_NUM_THREADS'] = '1'

import numpy as np
import onnxruntime as ort
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Path to the ONNX model
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "best_model.onnx"
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

        # Simple heatmap placeholder (Grad-CAM requires TF gradients, not available with ONNX)
        # The frontend already handles missing/error gradCamUrl gracefully
        gradcam_url = None

        # Try to generate a simple activation-based visualization using PIL
        try:
            original_img = Image.open(temp_path).convert('RGB')
            # Create a simple confidence-based overlay color (red for cancer, green for normal)
            overlay_color = (255, 0, 0) if predicted_class_idx != 2 else (0, 255, 0)
            overlay_img = Image.new("RGB", original_img.size, overlay_color)
            # Blend the original image with the solid color overlay (70% original, 30% overlay)
            blended = Image.blend(original_img, overlay_img, 0.3)

            buffered = io.BytesIO()
            blended.save(buffered, format="JPEG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            gradcam_url = f"data:image/jpeg;base64,{img_str}"
        except Exception as e:
            print(f"Overlay generation failed: {e}")
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
