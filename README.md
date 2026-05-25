# DeepLung 🫁 - AI-Powered Lung Cancer Prediction & Diagnostic Visualization

DeepLung is a state-of-the-art Clinical Decision Support System (CDSS) that leverages Deep Learning (CNN & Transfer Learning) to detect, classify, and visualize lung cancer nodules from CT scan images. 

Using an optimized **Xception** architecture, the backend performs inference on uploaded scans to classify them into one of four clinical categories, while generating real-time **Grad-CAM (Gradient-weighted Class Activation Mapping)** heatmaps to highlight the exact visual regions driving the AI's diagnostic confidence.

---

## 🚀 Key Features

* **High-Accuracy Classification**: Classifies lung CT scans into four distinct categories:
  * 🎗️ **Adenocarcinoma** (Malignant)
  * 🎗️ **Squamous Cell Carcinoma** (Malignant)
  * 🎗️ **Large Cell Carcinoma** (Malignant)
  * 🟢 **Normal** (Benign)
* **Explainable AI (XAI)**: Generates automated Grad-CAM heatmaps overlaying the original CT scan, showing radiologists and clinicians where the neural network detects suspicious nodule patterns.
* **Interactive Dashboard**: Sleek, responsive React-based interface for managing scan uploads, comparing predictions, and viewing detailed risk assessments.
* **Dual-Service Production Setup**: Fully configured for containerized/serverless hosting (Vercel for Frontend, Render for Python API).

---

## 🛠️ Tech Stack

### Frontend
* **React 19** & **Vite** (Next-gen bundling)
* **Tailwind CSS v4** (Modern utility-first styling)
* **React Router Dom** (Seamless view transitions)

### Backend
* **Python 3.12** & **Flask**
* **TensorFlow CPU** (Optimized for cloud-container hosting memory footprint)
* **Matplotlib & Pillow** (Image processing and heatmap generation)
* **Gunicorn** (Production-grade WSGI HTTP Server)

---

## 📁 Repository Structure

```text
DeepLung/
├── Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main/
│   └── Lung-Cancer-Prediction-using-CNN-and-Transfer-Learning-main/
│       └── best_model.hdf5      # Trained TensorFlow model weights (83.6MB)
├── frontend/                     # React + Vite client application
│   ├── src/
│   │   ├── components/           # UI and feature components
│   │   └── pages/                # Dashboard and landing pages
│   ├── package.json
│   └── vite.config.js
├── app.py                        # Flask API entrypoint
├── requirements.txt              # Production Python dependencies
├── render.yaml                   # Infrastructure-as-code blueprint for Render
├── start.bat                     # Local launch script for Windows
└── README.md                     # Project documentation
```

---

## 💻 Local Setup and Running

The project can be run locally using the included Windows launcher or by running manually.

### Option A: The Fast Windows Launcher
If you are on Windows, simply run the launcher script from the root directory:
```bash
start.bat
```
This script automatically boots the Flask API server and launches the React frontend developer server in separate console windows.

### Option B: Manual Setup

#### 1. Setup Backend
Open a terminal in the root directory:
```bash
# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```
The Flask backend runs at `http://localhost:5000`.

#### 2. Setup Frontend
Open a new terminal in the `frontend` directory:
```bash
cd frontend

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
The client dashboard opens at `http://localhost:5173`.

---

## 🌐 Production Deployment Guide

This project is optimized to run with the **Frontend on Vercel** and the **Backend on Render**.

### 1. Deploy the Backend (Render)

Render automatically handles deployment using the root `render.yaml` Blueprint file, or you can create the web service manually:

#### Automated Blueprint Method:
1. Log in to your account on [Render](https://render.com).
2. Click **New** -> **Blueprint**.
3. Connect your GitHub repository: `https://github.com/OnkarS18/DeepLung.git`.
4. Render will parse the `render.yaml` configurations and spin up your Web Service automatically!

#### Manual Web Service Method:
1. Click **New** -> **Web Service**.
2. Select your DeepLung repository.
3. Configure the following:
   * **Language**: `Python 3`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `gunicorn app:app`
   * **Plan**: Free or Starter
4. Under **Advanced** -> **Environment Variables**, add:
   * `PYTHON_VERSION`: `3.12.2`
   * `TF_CPP_MIN_LOG_LEVEL`: `2`
5. Copy your deployed Render service URL (e.g. `https://deeplung-backend.onrender.com`).

---

### 2. Deploy the Frontend (Vercel)

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository: `https://github.com/OnkarS18/DeepLung.git`.
4. Configure the project:
   * **Root Directory**: Select `frontend` (crucial so Vercel builds the React app instead of root)
   * **Framework Preset**: `Vite` (automatically detected)
5. Under the **Environment Variables** accordion, add:
   * **Key**: `VITE_API_URL`
   * **Value**: Your Render URL (e.g., `https://deeplung-backend.onrender.com`)
6. Click **Deploy**.
7. Your app is live! Vercel will build the frontend assets, compile environment variables, and serve them via their global edge network.

---

## 🧠 Model & Grad-CAM Methodology

* **Inference Pipeline**: The Flask API loads the `Xception` base network pre-trained on ImageNet. Custom classification heads are then mapped to the dense layers trained on the CT scan dataset (weights loaded from `best_model.hdf5`).
* **Input Dimension**: Rescaled to `350x350` RGB images.
* **Explainability (Grad-CAM)**: The API targets the output activation map of `block14_sepconv2_act` (the final convolutional layer of Xception) and monitors the gradients of the predicted class score relative to this map. It then computes weighted activations, applies a ReLU filter, sharpens features, and overlays a jet-color heatmap onto the original CT scan to identify lesion boundaries and nodule clusters.

---

## 📄 License
This project is licensed under the MIT License. See the LICENSE files for details.
