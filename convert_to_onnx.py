import os
os.environ['WRAPT_DISABLE_EXTENSIONS'] = 'true'

import numpy as np
import tensorflow as tf
import h5py
import tf2onnx

IMAGE_SIZE = (350, 350)
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main",
    "Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main",
    "best_model.hdf5"
)
OUTPUT_ONNX = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "best_model.onnx"
)

print("Building model architecture...")
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

print("Loading weights...")
with h5py.File(MODEL_PATH, 'r') as f:
    dense_group = f['dense_8']['dense_8']
    kernel = dense_group['kernel:0'][:]
    bias   = dense_group['bias:0'][:]
    model.layers[-1].set_weights([kernel, bias])

print("Verifying prediction...")
dummy = np.zeros((1, IMAGE_SIZE[0], IMAGE_SIZE[1], 3), dtype=np.float32)
pred = model.predict(dummy, verbose=0)
print(f"Prediction: {pred}")

print("Creating tf.function...")
@tf.function
def run_model(x):
    return model(x)

# Trace once
run_model(tf.zeros((1, IMAGE_SIZE[0], IMAGE_SIZE[1], 3), dtype=tf.float32))

print("Converting tf.function directly to ONNX...")
spec = [tf.TensorSpec(shape=[None, IMAGE_SIZE[0], IMAGE_SIZE[1], 3], dtype=tf.float32, name="input_1")]
onnx_model, _ = tf2onnx.convert.from_function(
    run_model,
    input_signature=spec,
    opset=13
)

print(f"Saving ONNX to {OUTPUT_ONNX}...")
with open(OUTPUT_ONNX, "wb") as f:
    f.write(onnx_model.SerializeToString())

print("ONNX conversion completed successfully!")
