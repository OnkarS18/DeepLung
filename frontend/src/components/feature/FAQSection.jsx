import { useState } from "react";
import Card from "../base/Card";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      id: "1",
      question: "What is DeepLung and how does it work?",
      answer:
        "DeepLung is an AI-driven system that analyzes CT scans to detect and classify lung nodules for early cancer detection. It uses advanced deep learning models including ResNet-50, DenseNet-121, and EfficientNet-B4 in an ensemble approach to achieve 95.7% accuracy. The system processes CT scan images, identifies suspicious nodules, classifies them as benign or malignant, and provides explainable results through Grad-CAM visualizations.",
      category: "general",
    },
    {
      id: "2",
      question: "How accurate is the DeepLung system?",
      answer:
        "Our ensemble model achieves 95.7% overall accuracy, with 94.9% sensitivity (ability to detect cancer) and 96.5% specificity (ability to correctly identify healthy tissue). The system has been trained and validated on over 10,000 CT scan images from diverse populations. However, it's designed to assist, not replace, medical professionals in diagnosis.",
      category: "technical",
    },
    {
      id: "3",
      question: "What makes DeepLung different from other AI diagnostic tools?",
      answer:
        "DeepLung stands out through its multi-model ensemble approach, explainable AI features with Grad-CAM visualizations, comprehensive comparative analysis of different architectures, and focus on clinical integration. Our system provides transparent decision-making, allowing healthcare professionals to understand why the AI made specific classifications.",
      category: "general",
    },
    {
      id: "4",
      question: "Is my medical data secure and private?",
      answer:
        "Yes, DeepLung is fully HIPAA-compliant with end-to-end encryption, role-based access controls, and comprehensive audit trails. All patient data is encrypted both in transit and at rest. We implement strict privacy protocols and never store personal identifying information with medical images. Regular security audits ensure ongoing compliance.",
      category: "privacy",
    },
    {
      id: "5",
      question: "What types of CT scans does DeepLung support?",
      answer:
        "DeepLung supports standard chest CT scans in DICOM format, as well as common image formats (JPEG, PNG). The system works with both contrast and non-contrast CT scans, with slice thickness recommendations of 1-5mm for optimal accuracy. High-resolution CT scans provide the best results for small nodule detection.",
      category: "technical",
    },
    {
      id: "6",
      question: "Can DeepLung replace radiologists?",
      answer:
        "No, DeepLung is designed to assist, not replace, healthcare professionals. It serves as a second opinion tool to help radiologists identify potentially suspicious areas more efficiently and reduce oversight. Final diagnostic decisions should always be made by qualified medical professionals who can consider the full clinical context.",
      category: "medical",
    },
    {
      id: "7",
      question: "How long does it take to analyze a CT scan?",
      answer:
        "DeepLung can analyze a complete CT scan in under 60 seconds, significantly faster than traditional manual analysis which can take 30-60 minutes. This rapid processing enables real-time clinical decision support and can help reduce patient wait times for preliminary results.",
      category: "technical",
    },
    {
      id: "8",
      question: "What is Grad-CAM and why is it important?",
      answer:
        "Grad-CAM (Gradient-weighted Class Activation Mapping) creates visual heat maps showing which areas of the CT scan the AI focused on when making its decision. Red areas indicate high attention (suspicious regions), while blue areas show lower attention. This transparency helps doctors understand and trust the AI's reasoning.",
      category: "technical",
    },
    {
      id: "9",
      question: "What should I do if DeepLung detects suspicious nodules?",
      answer:
        "If suspicious nodules are detected, consult with your healthcare provider immediately. They will review the AI results alongside your complete medical history, symptoms, and may recommend additional tests like PET scans, biopsies, or follow-up CT scans. Early detection significantly improves treatment outcomes.",
      category: "medical",
    },
    {
      id: "10",
      question: "How was DeepLung trained and validated?",
      answer:
        "DeepLung was trained on a diverse dataset of over 50,000 annotated CT scan images from multiple medical institutions. We used cross-validation techniques, independent test sets, and compared performance against board-certified radiologists. The training process included data augmentation, transfer learning, and extensive hyperparameter optimization.",
      category: "technical",
    },
    {
      id: "11",
      question: "What are the limitations of DeepLung?",
      answer:
        "While highly accurate, DeepLung may have reduced performance on very small nodules (&lt;3mm), unusual presentations, or scans with significant artifacts. The system works best with high-quality CT scans and may require additional clinical correlation for complex cases. It cannot assess factors like patient history, symptoms, or other relevant clinical data.",
      category: "medical",
    },
    {
      id: "12",
      question: "Is DeepLung FDA approved?",
      answer:
        "DeepLung is currently a research project and prototype system developed by B.Tech students. It is not yet FDA approved and should not be used for actual clinical diagnosis. This is an academic project demonstrating the potential of AI in medical imaging, and any clinical implementation would require extensive regulatory approval.",
      category: "general",
    },
    {
      id: "13",
      question: "How can healthcare institutions integrate DeepLung?",
      answer:
        "Integration would involve API connections to existing PACS (Picture Archiving and Communication Systems), ensuring compatibility with hospital workflows, staff training, and establishing proper clinical protocols. The system is designed to work within existing radiology departments as a decision support tool.",
      category: "technical",
    },
    {
      id: "14",
      question: "What happens to the data after analysis?",
      answer:
        "Analysis results are securely stored with encryption and access controls. Original images can be deleted after analysis if requested. All data handling follows strict privacy protocols with automatic deletion timelines. Patients have the right to request data deletion at any time, and we maintain detailed logs of all data access.",
      category: "privacy",
    },
    {
      id: "15",
      question: "Can DeepLung detect other lung conditions besides cancer?",
      answer:
        "Currently, DeepLung is specifically trained for lung nodule detection and cancer classification. While it may identify other abnormalities incidentally, it's not designed or validated for diagnosing conditions like pneumonia, emphysema, or other lung diseases. Future versions may expand to additional conditions.",
      category: "medical",
    },
  ];

  const categories = [
    { key: "all", label: "All Questions", icon: "ri-question-line" },
    { key: "general", label: "General", icon: "ri-information-line" },
    { key: "technical", label: "Technical", icon: "ri-settings-line" },
    { key: "medical", label: "Medical", icon: "ri-heart-pulse-line" },
    {
      key: "privacy",
      label: "Privacy & Security",
      icon: "ri-shield-check-line",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about DeepLung, our AI-driven lung
            cancer detection system.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search questions and answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === category.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700"
              }`}
            >
              <i className={category.icon}></i>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Showing {filteredFAQs.length} of {faqData.length} questions
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      </Card>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <Card key={faq.id} className="overflow-hidden">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {faq.question}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    faq.category === "general"
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300"
                      : faq.category === "technical"
                        ? "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300"
                        : faq.category === "medical"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                          : "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300"
                  }`}
                >
                  {faq.category.toUpperCase()}
                </span>
              </div>
              <i
                className={`${openFAQ === faq.id ? "ri-subtract-line" : "ri-add-line"} text-xl text-gray-400 transition-transform`}
              ></i>
            </button>

            {openFAQ === faq.id && (
              <div className="px-6 pb-6">
                <div className="border-t dark:border-gray-700 pt-4">
                  <p
                    className="text-gray-600 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  ></p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <Card className="p-12 text-center">
          <i className="ri-question-line text-4xl text-gray-400 mb-4 block"></i>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No questions found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search terms or selecting a different category.
          </p>
        </Card>
      )}

      {/* Contact Support */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-customer-service-2-line text-blue-600 dark:text-blue-400 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our team is here to help. Contact us for more information about
            DeepLung.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-line mr-2"></i>
              Contact Our Team
            </a>
            <a
              href="#team"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-team-line mr-2"></i>
              Meet the Developers
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
