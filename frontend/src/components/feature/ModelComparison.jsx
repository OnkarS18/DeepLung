import { useState } from "react";
import Card from "../base/Card";

export default function ModelComparison() {
  const [selectedMetric, setSelectedMetric] = useState("accuracy");
  const [animationKey, setAnimationKey] = useState(0);

  const models = [
    {
      name: "ResNet-50",
      accuracy: 94.2,
      sensitivity: 92.8,
      specificity: 95.6,
      precision: 91.3,
      f1Score: 92.0,
      color: "from-blue-500 to-blue-600",
      description:
        "Deep residual network with skip connections for feature extraction",
      parameters: "25.6M",
      trainingTime: "4.2 hours",
    },
    {
      name: "DenseNet-121",
      accuracy: 93.7,
      sensitivity: 94.1,
      specificity: 93.3,
      precision: 89.8,
      f1Score: 91.9,
      color: "from-green-500 to-green-600",
      description:
        "Densely connected network with feature reuse for efficiency",
      parameters: "8.0M",
      trainingTime: "3.8 hours",
    },
    {
      name: "EfficientNet-B4",
      accuracy: 95.1,
      sensitivity: 93.5,
      specificity: 96.7,
      precision: 94.2,
      f1Score: 93.8,
      color: "from-purple-500 to-purple-600",
      description:
        "Compound scaling method for optimal accuracy and efficiency",
      parameters: "19.3M",
      trainingTime: "5.1 hours",
    },
    {
      name: "DeepLung Ensemble",
      accuracy: 95.7,
      sensitivity: 94.9,
      specificity: 96.5,
      precision: 95.1,
      f1Score: 95.0,
      color: "from-orange-500 to-red-500",
      description: "Combined ensemble of all three models with weighted voting",
      parameters: "52.9M",
      trainingTime: "6.5 hours",
    },
  ];

  const metricLabels = {
    accuracy: "Accuracy (%)",
    sensitivity: "Sensitivity (%)",
    specificity: "Specificity (%)",
    precision: "Precision (%)",
    f1Score: "F1-Score (%)",
  };

  const metricDescriptions = {
    accuracy: "Overall correctness of the model predictions",
    sensitivity: "Ability to correctly identify malignant cases (recall)",
    specificity: "Ability to correctly identify benign cases",
    precision:
      "Proportion of predicted malignant cases that are actually malignant",
    f1Score: "Harmonic mean of precision and sensitivity",
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
    setAnimationKey((prev) => prev + 1);
  };

  const getBestModel = () => {
    return models.reduce((best, current) =>
      current[selectedMetric] > best[selectedMetric] ? current : best,
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Model Performance Comparison
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Compare performance metrics across different deep learning
            architectures used in DeepLung. Each model brings unique strengths
            to our ensemble approach.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(metricLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleMetricChange(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedMetric === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Current Metric Info */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {metricLabels[selectedMetric]}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {metricDescriptions[selectedMetric]}
          </p>
        </div>

        {/* Performance Chart */}
        <div key={animationKey} className="space-y-4 mb-8">
          {models.map((model, index) => (
            <div key={model.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${model.color}`}
                  ></div>
                  <span className="font-medium text-gray-800">
                    {model.name}
                  </span>
                </div>
                <span className="font-bold text-gray-800">
                  {model[selectedMetric].toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 bg-gradient-to-r ${model.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: `${model[selectedMetric]}%`,
                    animationDelay: `${index * 200}ms`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Performer Highlight */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-3 mb-3">
            <i className="ri-trophy-line text-yellow-600 text-2xl"></i>
            <h4 className="text-lg font-semibold text-gray-800">
              Best Performer: {getBestModel().name}
            </h4>
          </div>
          <p className="text-gray-700 mb-2">
            Achieves {getBestModel()[selectedMetric].toFixed(1)}%{" "}
            {selectedMetric} - {getBestModel().description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Parameters:</span>
              <span className="font-medium ml-2">
                {getBestModel().parameters}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Training Time:</span>
              <span className="font-medium ml-2">
                {getBestModel().trainingTime}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model) => (
          <Card key={model.name} className="p-6 hover" hover>
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center`}
              >
                <i className="ri-cpu-line text-white text-xl"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {model.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {model.parameters} parameters
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {model.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-medium">{model.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sensitivity:</span>
                  <span className="font-medium">{model.sensitivity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specificity:</span>
                  <span className="font-medium">{model.specificity}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precision:</span>
                  <span className="font-medium">{model.precision}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">F1-Score:</span>
                  <span className="font-medium">{model.f1Score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Training:</span>
                  <span className="font-medium">{model.trainingTime}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Model Ensemble Explanation */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Ensemble Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-group-line text-blue-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Weighted Voting
            </h4>
            <p className="text-gray-600 text-sm">
              Each model contributes predictions based on its validation
              performance weights
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-check-line text-green-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Uncertainty Reduction
            </h4>
            <p className="text-gray-600 text-sm">
              Multiple models reduce prediction uncertainty and improve
              reliability
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-line-chart-line text-purple-600 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Performance Boost
            </h4>
            <p className="text-gray-600 text-sm">
              Ensemble achieves better performance than any individual model
              alone
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
