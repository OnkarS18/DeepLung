import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os

IMAGE_SIZE = (350, 350)
MODEL_PATH = r"C:\Users\Omkar\OneDrive\Desktop\DeepLung\Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main\Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main\best_model.hdf5"

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
    import h5py
    with h5py.File(MODEL_PATH, 'r') as f:
        dense_group = f['dense_8']['dense_8']
        kernel = dense_group['kernel:0'][:]
        bias = dense_group['bias:0'][:]
        model.layers[-1].set_weights([kernel, bias])
    return model

model = get_model()

test_dir = r"C:\Users\Omkar\OneDrive\Desktop\DeepLung\Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main\Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main\dataset\test"
classes = os.listdir(test_dir)
for c in classes:
    cls_dir = os.path.join(test_dir, c)
    if os.path.isdir(cls_dir):
        images = os.listdir(cls_dir)
        if images:
            img_path = os.path.join(cls_dir, images[0])
            img = image.load_img(img_path, target_size=IMAGE_SIZE)
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array /= 255.0  # Rescale
            predictions = model.predict(img_array, verbose=0)
            print(f"{c}: {predictions[0]}")
