# DeepLung Project Explanation

This document explains the DeepLung project in simple words: what it does, how the model works, how the image is processed, how Grad-CAM works, and how the frontend and backend communicate.

## 1. What This Project Does

DeepLung is a web application for lung CT scan analysis.

The user uploads a CT scan image from the dashboard. The backend sends the image to an AI model. The model predicts whether the scan looks normal or cancer-related. The dashboard then shows:

- The predicted result
- The confidence score
- The risk level
- A Grad-CAM heatmap showing where the model focused

The project is not a replacement for a doctor. It is a decision-support tool that helps explain what the AI model sees in the scan.

## 2. Main Parts Of The Project

The project has two main parts.

### Frontend

Location:

```text
frontend/
```

The frontend is built with React and Vite. It is the user interface.

Important frontend files:

```text
frontend/src/pages/dashboard/page.jsx
frontend/src/components/feature/CTScanViewer.jsx
frontend/src/components/feature/GradCAMChatbot.jsx
frontend/src/components/feature/ModelComparison.jsx
```

The dashboard lets the user upload CT images, view prediction results, and toggle the Grad-CAM image.

### Backend

Location:

```text
app.py
```

The backend is built with Flask. It receives uploaded images, runs the AI model, creates the Grad-CAM heatmap, and sends the result back to the frontend.

Important backend files:

```text
app.py
best_model.onnx
best_model.hdf5
requirements.txt
```

`best_model.onnx` is used for fast prediction.

`best_model.hdf5` is used to rebuild the TensorFlow/Keras model for real Grad-CAM generation.

## 3. Simple Project Flow

This is the full flow from upload to result:

```text
User uploads CT scan
        |
        v
React dashboard receives the image
        |
        v
Frontend sends image to Flask API /predict
        |
        v
Backend resizes and normalizes the image
        |
        v
ONNX model predicts the class
        |
        v
Backend calculates confidence and risk
        |
        v
TensorFlow model generates Grad-CAM heatmap
        |
        v
Backend returns JSON response to frontend
        |
        v
Dashboard displays result and Grad-CAM
```

## 4. Frontend Flow

The dashboard uses `CTScanViewer.jsx`.

When a user selects an image:

1. The image file is read from the browser.
2. A `FormData` object is created.
3. The image is sent to:

```text
POST http://localhost:5000/predict
```

or to the deployed backend URL from:

```text
VITE_API_URL
```

4. The backend response is received.
5. The frontend stores the result in state.
6. The selected scan appears in the analysis results panel.
7. When the user clicks the Grad-CAM button, the dashboard shows the Grad-CAM image returned by the backend.

The frontend does not create the real Grad-CAM. It only displays the `gradCamUrl` sent by the backend.

## 5. Backend Flow

The backend has one main API endpoint:

```text
/predict
```

The backend does these steps:

1. Checks if a file was uploaded.
2. Saves the uploaded file temporarily.
3. Opens the image using Pillow.
4. Converts it to RGB.
5. Resizes it to:

```text
350 x 350
```

6. Converts the image to a NumPy array.
7. Normalizes pixel values by dividing by `255.0`.
8. Sends the processed image to the ONNX model.
9. Gets the prediction probabilities.
10. Selects the class with the highest probability.
11. Creates the Grad-CAM heatmap.
12. Returns the final response to the frontend.

The response looks like this:

```json
{
  "prediction": "Adenocarcinoma",
  "confidence": 99.4,
  "all_predictions": {
    "Adenocarcinoma": 99.4,
    "Large Cell Carcinoma": 0.2,
    "Normal": 0.1,
    "Squamous Cell Carcinoma": 0.3
  },
  "gradCamUrl": "data:image/jpeg;base64,..."
}
```

## 6. Model Classes

The model predicts one of four classes:

```text
Adenocarcinoma
Large Cell Carcinoma
Normal
Squamous Cell Carcinoma
```

In the dashboard, the frontend simplifies this into:

```text
Normal = Benign
All other classes = Malignant
```

So if the backend predicts `Normal`, the dashboard shows `Benign`.

If the backend predicts `Adenocarcinoma`, `Large Cell Carcinoma`, or `Squamous Cell Carcinoma`, the dashboard shows `Malignant`.

## 7. How The Model Works

The trained model is based on Xception, a convolutional neural network.

In simple words:

- The model looks at the CT scan image.
- Early layers detect simple features like edges, curves, and brightness changes.
- Deeper layers detect more meaningful medical patterns.
- The final layers convert those patterns into class probabilities.

For example, the model may output:

```text
Adenocarcinoma: 99.4%
Large Cell Carcinoma: 0.2%
Normal: 0.1%
Squamous Cell Carcinoma: 0.3%
```

The highest value is selected as the final prediction.

In this example:

```text
Prediction = Adenocarcinoma
Confidence = 99.4%
```

## 8. Why ONNX Is Used

The backend uses:

```text
best_model.onnx
```

for prediction.

ONNX Runtime is lighter and faster for serving predictions than loading the full TensorFlow model for every normal prediction.

This helps the backend start faster and use less memory.

## 9. Why TensorFlow Is Still Used

Grad-CAM needs gradients.

Gradients are used to understand which parts of the image affected the model decision the most.

ONNX Runtime is good for prediction, but it does not easily provide the TensorFlow-style gradients needed for Grad-CAM in this project.

So the backend uses:

```text
best_model.hdf5
```

only for Grad-CAM.

This TensorFlow model is loaded lazily. That means it is not loaded immediately when the backend starts. It is loaded only when Grad-CAM is generated.

This keeps normal prediction lightweight while still supporting real Grad-CAM.

## 10. Image Processing Steps

Before prediction, every uploaded image is processed in the same way.

### Step 1: Load Image

The backend opens the uploaded image using Pillow.

### Step 2: Convert To RGB

The image is converted to RGB format so it always has 3 color channels.

### Step 3: Resize

The image is resized to:

```text
350 x 350
```

This is the size expected by the trained model.

### Step 4: Convert To Array

The image is converted into numbers using NumPy.

### Step 5: Normalize

Pixel values normally range from:

```text
0 to 255
```

The backend divides them by `255.0`, so the values become:

```text
0.0 to 1.0
```

This matches the format used during model training.

### Step 6: Add Batch Dimension

The model expects images in this shape:

```text
1 x 350 x 350 x 3
```

The `1` means one image is being processed.

## 11. Grad-CAM Working

Grad-CAM means:

```text
Gradient-weighted Class Activation Mapping
```

In simple words, Grad-CAM answers this question:

```text
Which part of the CT scan influenced the model prediction?
```

The backend uses the final Xception convolution layer:

```text
block14_sepconv2_act
```

The process is:

1. Run the image through the TensorFlow model.
2. Take the predicted class score.
3. Calculate gradients for the final convolution layer.
4. Find which feature maps were most important.
5. Create a heatmap from those important areas.
6. Resize the heatmap to match the original image.
7. Overlay it on top of the CT scan.
8. Return it as a base64 image URL.

The dashboard then displays this Grad-CAM image.

### Grad-CAM Color Meaning

The Grad-CAM overlay uses a heatmap color style.

Usually:

```text
Red / yellow = high attention
Green = medium attention
Blue = low attention
```

Important note:

Grad-CAM is not an exact tumor boundary. It is not a segmentation mask. It shows the broad regions that influenced the model.

## 12. Risk Score Logic In Dashboard

The backend returns four class probabilities.

The frontend uses the `Normal` probability to calculate risk.

If the scan is normal:

```text
Risk = 100 - Normal confidence
```

If the scan is malignant:

```text
Risk = 100 - Normal probability
```

Then the dashboard shows:

```text
Risk >= 70% = High
Risk >= 40% = Moderate
Risk < 40% = Low
```

## 13. Model Performance

The dashboard includes a model comparison section. It shows the performance study for different model architectures.

| Model | Accuracy | Sensitivity | Specificity | Precision | F1-Score |
|---|---:|---:|---:|---:|---:|
| ResNet-50 | 94.2% | 92.8% | 95.6% | 91.3% | 92.0% |
| DenseNet-121 | 93.7% | 94.1% | 93.3% | 89.8% | 91.9% |
| EfficientNet-B4 | 95.1% | 93.5% | 96.7% | 94.2% | 93.8% |
| DeepLung Ensemble | 95.7% | 94.9% | 96.5% | 95.1% | 95.0% |

### Meaning Of These Metrics

Accuracy means how often the model is correct overall.

Sensitivity means how well the model detects malignant cases.

Specificity means how well the model identifies benign or normal cases.

Precision means when the model says malignant, how often it is actually malignant.

F1-score is a balanced score between sensitivity and precision.

## 14. Current Running Model

The current backend prediction file is:

```text
best_model.onnx
```

The current Grad-CAM weight file is:

```text
best_model.hdf5
```

The app currently serves prediction using ONNX Runtime, and uses TensorFlow/Keras only when generating Grad-CAM.

This design gives a balance:

- Faster prediction
- Lower memory use for normal inference
- Real Grad-CAM visualization when needed

## 15. Backend Files Explained

### app.py

Main Flask backend.

It:

- Starts the API server
- Loads the ONNX model
- Preprocesses uploaded images
- Runs prediction
- Generates Grad-CAM
- Returns JSON to frontend

### best_model.onnx

Optimized model used for prediction.

### best_model.hdf5

Original TensorFlow/Keras weights used for Grad-CAM.

### convert_to_onnx.py

Helper script used to convert the TensorFlow model weights into ONNX format.

### requirements.txt

Python dependencies for the backend.

## 16. Frontend Files Explained

### dashboard/page.jsx

Main dashboard page.

It shows:

- CT scan analyzer
- Model comparison
- Architecture flow
- Glossary
- FAQ

### CTScanViewer.jsx

Main upload and result component.

It:

- Accepts uploaded CT scans
- Sends scans to backend
- Receives predictions
- Displays confidence, risk, and Grad-CAM

### GradCAMChatbot.jsx

Small assistant that explains Grad-CAM and model concepts.

### ModelComparison.jsx

Shows model performance metrics.

### AnimatedArchitecture.jsx

Shows the system flow visually.

## 17. API Details

### Health Check

```text
GET /
```

Returns:

```json
{
  "status": "ok",
  "model": "DeepLung ONNX"
}
```

### Prediction

```text
POST /predict
```

Input:

```text
file = uploaded CT image
```

Output:

```text
prediction
confidence
all_predictions
gradCamUrl
```

## 18. How To Run The Project

### Backend

From the project root:

```powershell
pip install -r requirements.txt
python app.py
```

Backend URL:

```text
http://localhost:5000
```

### Frontend

From the frontend folder:

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## 19. How To Test The Full Flow

1. Start the backend.
2. Start the frontend.
3. Open the dashboard.
4. Upload a CT scan image.
5. Wait for prediction.
6. Check the confidence and risk score.
7. Click the Grad-CAM button.
8. Confirm that a heatmap appears over the CT scan.

If Grad-CAM works correctly, the image should show a blue-green-yellow-red overlay on top of the uploaded scan.

## 20. Important Limitations

This project should be used as an AI assistant, not as a final medical decision maker.

Important limitations:

- The result depends on image quality.
- The model works best with images similar to its training data.
- Grad-CAM shows attention regions, not exact tumor borders.
- A doctor or radiologist must verify the final diagnosis.
- AI confidence does not always mean clinical certainty.

## 21. Final Summary

DeepLung takes a CT scan, processes it, predicts the most likely class, calculates confidence and risk, and creates a Grad-CAM heatmap to explain the model decision.

The simple flow is:

```text
Upload image -> Preprocess image -> Predict with ONNX -> Generate Grad-CAM with TensorFlow -> Show result on dashboard
```

The project combines prediction and explainability, so the user can see both the AI result and the image areas that influenced that result.
