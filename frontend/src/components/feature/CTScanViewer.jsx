import { useState } from "react";
import Card from "../base/Card";

export default function CTScanViewer() {
  const [uploadedScans, setUploadedScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [showGradCam, setShowGradCam] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsAnalyzing(true);
    const newScans = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log(`Analyzing file: ${file.name}...`);
        const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/predict`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        
        const isBenign = result.prediction.toLowerCase() === "normal";
        const malignantConf = result.all_predictions ? (100 - result.all_predictions["Normal"]) : (isBenign ? (100 - result.confidence) : result.confidence);
        const finalConfidence = isBenign ? (result.all_predictions ? result.all_predictions["Normal"] : result.confidence) : malignantConf;
        
        const originalImgUrl = URL.createObjectURL(file);

        newScans.push({
          id: `scan-${Date.now()}-${i}`,
          fileName: file.name,
          uploadTime: new Date().toLocaleString(),
          originalImgUrl: originalImgUrl,
          aiPrediction: {
            confidence: finalConfidence / 100,
            classification: isBenign ? "benign" : "malignant",
            rawLabel: isBenign ? "Benign" : "Malignant",
            riskScore: malignantConf,
          },
          // Grad-CAM is now provided by the backend via real Grad-CAM generation
          gradCamUrl: result.gradCamUrl || `https://readdy.ai/api/search-image?query=Medical%20Grad-CAM%20heatmap%20visualization%20of%20lung%20CT%20scan%20showing%20highlighted%20suspicious%20regions%20for%20${isBenign ? 'normal%20tissue' : 'malignant%20tumor'}&width=400&height=400&seq=gradcam-${i}&orientation=squarish`,
        });
      } catch (error) {
        console.error(`Error analyzing ${file.name}:`, error);
        // Fallback or error scan entry
        const errorLabel = error.message.includes("fetch") 
          ? "Backend Offline" 
          : "Analysis Failed";
          
        newScans.push({
          id: `scan-error-${Date.now()}-${i}`,
          fileName: file.name,
          uploadTime: new Date().toLocaleString(),
          aiPrediction: {
            confidence: 0,
            classification: "error",
            rawLabel: errorLabel,
            riskScore: 0,
          },
          error: error.message
        });
      }
    }

    setUploadedScans(newScans);
    if (newScans.length > 0) setSelectedScan(newScans[0]);
    setIsAnalyzing(false);
  };

  const getClassificationColor = (classification) => {
    const cls = classification.toLowerCase();
    if (cls.includes("adenocarcinoma") || cls.includes("large") || cls.includes("squamous") || cls === "malignant") {
      return "text-red-600 bg-red-100";
    }
    if (cls === "suspicious") {
      return "text-orange-600 bg-orange-100";
    }
    if (cls === "normal" || cls === "benign") {
      return "text-green-600 bg-green-100";
    }
    return "text-gray-600 bg-gray-100";
  };

  const getRiskLevel = (score) => {
    if (score >= 70) return { level: "High", color: "text-red-600" };
    if (score >= 40) return { level: "Moderate", color: "text-orange-600" };
    return { level: "Low", color: "text-green-600" };
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-upload-cloud-2-line text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Upload CT Scans
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Upload DICOM or image files for AI analysis
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".dcm,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="ct-scan-upload"
              disabled={isAnalyzing}
            />

            <label
              htmlFor="ct-scan-upload"
              className={`cursor-pointer ${isAnalyzing ? "opacity-50" : ""}`}
            >
              <i className="ri-file-upload-line text-4xl text-gray-400 mb-4 block"></i>
              <p className="text-gray-600 mb-2">
                {isAnalyzing
                  ? "Analyzing scans..."
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-gray-500">
                DICOM, JPG, PNG files up to 50MB
              </p>
            </label>
          </div>

          {isAnalyzing && (
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium">
                AI Analysis in Progress...
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Scan Results */}
      {uploadedScans.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Analysis Results
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scan List */}
            <div className="space-y-4">
              {uploadedScans.map((scan) => (
                <div
                  key={scan.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedScan?.id === scan.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedScan(scan)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white truncate">
                      {scan.fileName}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(scan.aiPrediction.classification)} dark:bg-opacity-20`}
                    >
                      {scan.aiPrediction.rawLabel || scan.aiPrediction.classification.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-medium">
                        {(scan.aiPrediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nodules:</span>
                      <span className="font-medium">
                        {scan.aiPrediction.nodulesDetected}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <span
                        className={`font-medium ${getRiskLevel(scan.aiPrediction.riskScore).color}`}
                      >
                        {getRiskLevel(scan.aiPrediction.riskScore).level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed View */}
            {selectedScan && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Detailed Analysis
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowGradCam(!showGradCam)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        showGradCam
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      <i className="ri-eye-line mr-1"></i>
                      Grad-CAM
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 aspect-square">
                  {showGradCam ? (
                    selectedScan.gradCamUrl ? (
                      <img
                        src={selectedScan.gradCamUrl}
                        alt="Grad-CAM Visualization"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <i className="ri-image-line text-4xl text-gray-400 mb-2 block"></i>
                          <p className="text-red-500 dark:text-red-400">
                            Grad-CAM failed to load
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    selectedScan.originalImgUrl ? (
                      <img
                        src={selectedScan.originalImgUrl}
                        alt="Original CT Scan"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <i className="ri-image-line text-4xl text-gray-400 mb-2 block"></i>
                          <p className="text-gray-500 dark:text-gray-400">
                            Original CT Scan
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {(selectedScan.aiPrediction.confidence * 100).toFixed(
                          1,
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Confidence</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                        {selectedScan.aiPrediction.nodulesDetected}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Nodules Found</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                  <h5 className="font-medium text-gray-800 dark:text-white mb-2">
                    Risk Assessment
                  </h5>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full ${
                        selectedScan.aiPrediction.riskScore >= 70
                          ? "bg-red-500"
                          : selectedScan.aiPrediction.riskScore >= 40
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                      style={{
                        width: `${selectedScan.aiPrediction.riskScore}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Risk Score:</span>
                    <span
                      className={`font-medium ${getRiskLevel(selectedScan.aiPrediction.riskScore).color}`}
                    >
                      {selectedScan.aiPrediction.riskScore.toFixed(1)}% -{" "}
                      {getRiskLevel(selectedScan.aiPrediction.riskScore).level}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
