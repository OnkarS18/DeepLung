import { useState } from "react";
import Card from "../base/Card";

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const glossaryTerms = [
    {
      term: "Grad-CAM",
      definition:
        "Gradient-weighted Class Activation Mapping is a technique that produces visual explanations for decisions from CNN-based models by highlighting important regions in images.",
      category: "ai",
      examples: [
        "Heat maps showing suspicious areas",
        "Model attention visualization",
      ],
    },
    {
      term: "Convolutional Neural Network (CNN)",
      definition:
        "A type of deep learning architecture particularly effective for image analysis, using convolutional layers to detect features like edges, textures, and patterns.",
      category: "ai",
      examples: ["ResNet-50", "DenseNet-121", "EfficientNet-B4"],
    },
    {
      term: "Lung Nodule",
      definition:
        "A small, round growth in the lungs that appears as a spot on chest imaging. Most nodules are benign, but some can be malignant (cancerous).",
      category: "medical",
      examples: [
        "Benign granuloma",
        "Malignant adenocarcinoma",
        "Suspicious mass",
      ],
    },
    {
      term: "CT Scan",
      definition:
        "Computed Tomography scan uses X-rays to create detailed cross-sectional images of the body, particularly useful for detecting lung abnormalities.",
      category: "medical",
      examples: ["Chest CT", "High-resolution CT", "Contrast-enhanced CT"],
    },
    {
      term: "Sensitivity",
      definition:
        "The ability of a test to correctly identify positive cases (true positive rate). In medical AI, it measures how well the system detects actual disease cases.",
      category: "technical",
      examples: [
        "94.9% sensitivity means 949 out of 1000 cancer cases detected",
      ],
    },
    {
      term: "Specificity",
      definition:
        "The ability of a test to correctly identify negative cases (true negative rate). It measures how well the system avoids false positive diagnoses.",
      category: "technical",
      examples: [
        "96.5% specificity means 965 out of 1000 healthy cases correctly identified",
      ],
    },
    {
      term: "Ensemble Method",
      definition:
        "A machine learning technique that combines multiple models to create a stronger predictor than any individual model alone.",
      category: "ai",
      examples: ["Weighted voting", "Model averaging", "Stacking methods"],
    },
    {
      term: "False Positive",
      definition:
        "When the AI system incorrectly identifies a benign condition as malignant, potentially causing unnecessary anxiety and procedures.",
      category: "technical",
      examples: [
        "Benign nodule classified as malignant",
        "Scar tissue flagged as cancer",
      ],
    },
    {
      term: "False Negative",
      definition:
        "When the AI system fails to detect actual malignant tissue, potentially delaying necessary treatment.",
      category: "technical",
      examples: [
        "Small cancer missed by algorithm",
        "Early-stage tumor not detected",
      ],
    },
    {
      term: "DICOM",
      definition:
        "Digital Imaging and Communications in Medicine - the standard format for medical imaging files that ensures compatibility across different systems.",
      category: "technical",
      examples: ["CT scan files", "MRI images", "X-ray data"],
    },
    {
      term: "Malignant",
      definition:
        "Referring to cancerous tissue that can spread to other parts of the body and is potentially life-threatening if not treated.",
      category: "medical",
      examples: [
        "Lung adenocarcinoma",
        "Squamous cell carcinoma",
        "Small cell lung cancer",
      ],
    },
    {
      term: "Benign",
      definition:
        "Referring to non-cancerous tissue that does not spread to other parts of the body and is generally not life-threatening.",
      category: "medical",
      examples: ["Granuloma", "Hamartoma", "Inflammatory nodule"],
    },
    {
      term: "HIPAA Compliance",
      definition:
        "Adherence to the Health Insurance Portability and Accountability Act, ensuring patient data privacy and security in healthcare systems.",
      category: "technical",
      examples: ["Data encryption", "Access controls", "Audit trails"],
    },
    {
      term: "Feature Extraction",
      definition:
        "The process of identifying and isolating relevant characteristics from raw data that can be used for analysis and classification.",
      category: "ai",
      examples: ["Edge detection", "Texture analysis", "Shape recognition"],
    },
    {
      term: "Confidence Score",
      definition:
        "A numerical value indicating how certain the AI model is about its prediction, typically expressed as a percentage.",
      category: "ai",
      examples: [
        "95% confidence in malignant classification",
        "78% certainty of nodule presence",
      ],
    },
  ];

  const categories = [
    { key: "all", label: "All Terms", color: "text-gray-600" },
    { key: "ai", label: "AI & Machine Learning", color: "text-blue-600" },
    { key: "medical", label: "Medical Terms", color: "text-green-600" },
    { key: "technical", label: "Technical", color: "text-purple-600" },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "ai":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "medical":
        return "bg-green-100 text-green-800 border-green-200";
      case "technical":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Medical AI Glossary
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive definitions of medical, AI, and technical terms used
            in DeepLung. Search or browse by category to learn more.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search terms and definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === category.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-6">
          Showing {filteredTerms.length} of {glossaryTerms.length} terms
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      </Card>

      {/* Glossary Terms */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTerms.map((item, index) => (
          <Card key={index} className="p-6 hover" hover>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-800">{item.term}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}
              >
                {item.category.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              {item.definition}
            </p>

            {item.examples && item.examples.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  Examples:
                </h4>
                <ul className="space-y-1">
                  {item.examples.map((example, exampleIndex) => (
                    <li
                      key={exampleIndex}
                      className="flex items-start space-x-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card className="p-12 text-center">
          <i className="ri-search-line text-4xl text-gray-400 mb-4 block"></i>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No terms found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or selecting a different category.
          </p>
        </Card>
      )}

      {/* Quick Reference */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Quick Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-blue-600 mb-3">
              AI Performance Metrics
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Accuracy: Overall correctness</li>
              <li>• Sensitivity: Disease detection rate</li>
              <li>• Specificity: Healthy identification rate</li>
              <li>• Precision: Positive prediction accuracy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 mb-3">
              Medical Classifications
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Benign: Non-cancerous</li>
              <li>• Malignant: Cancerous</li>
              <li>• Suspicious: Requires investigation</li>
              <li>• Nodule: Small lung growth</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-3">
              AI Techniques
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• CNN: Image analysis network</li>
              <li>• Grad-CAM: Visual explanations</li>
              <li>• Ensemble: Multiple model combination</li>
              <li>• Feature extraction: Pattern detection</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
