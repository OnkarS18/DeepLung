import Card from "../../../components/base/Card";

export default function FeaturesSection() {
  const keyFeatures = [
    {
      icon: "ri-brain-line",
      title: "Advanced AI Detection",
      description:
        "State-of-the-art deep learning algorithms trained on thousands of CT scans for accurate nodule detection",
      details: [
        "CNN-based architecture with 95%+ accuracy",
        "Multi-scale feature extraction",
        "Real-time processing capabilities",
        "Continuous learning and improvement",
      ],
      color: "blue",
    },
    {
      icon: "ri-eye-line",
      title: "Explainable AI with Grad-CAM",
      description:
        "Transparent decision-making through advanced visualization techniques for clinical understanding",
      details: [
        "Heat map generation for suspicious regions",
        "Feature importance visualization",
        "Decision transparency for clinicians",
        "Interactive exploration tools",
      ],
      color: "green",
    },
    {
      icon: "ri-bar-chart-box-line",
      title: "Comparative Model Study",
      description:
        "Comprehensive evaluation of multiple AI models to ensure optimal performance and reliability",
      details: [
        "ResNet, DenseNet, EfficientNet comparison",
        "Ensemble method implementation",
        "Performance benchmarking",
        "Model selection optimization",
      ],
      color: "purple",
    },
    {
      icon: "ri-dashboard-3-line",
      title: "Interactive Dashboard",
      description:
        "User-friendly prototype dashboard for healthcare professionals with comprehensive analytics",
      details: [
        "Intuitive user interface design",
        "Real-time analysis results",
        "Patient data management",
        "Report generation and export",
      ],
      color: "orange",
    },
    {
      icon: "ri-shield-check-line",
      title: "Data Privacy & Security",
      description:
        "HIPAA-compliant system with end-to-end encryption and secure data handling protocols",
      details: [
        "End-to-end data encryption",
        "Role-based access control",
        "Audit trail maintenance",
        "Compliance with medical standards",
      ],
      color: "red",
    },
    {
      icon: "ri-time-line",
      title: "Rapid Processing",
      description:
        "High-speed analysis reducing diagnosis time from hours to minutes for improved patient outcomes",
      details: [
        "Sub-minute processing time",
        "Batch processing capabilities",
        "Cloud-based scalability",
        "Optimized inference pipeline",
      ],
      color: "teal",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
      green: "from-green-500 to-green-600 bg-green-100 text-green-600",
      purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600",
      orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-600",
      red: "from-red-500 to-red-600 bg-red-100 text-red-600",
      teal: "from-teal-500 to-teal-600 bg-teal-100 text-teal-600",
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Comprehensive AI-driven features designed to revolutionize lung
            cancer detection and support healthcare professionals in making
            accurate, timely diagnoses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {keyFeatures.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);
            const gradientClasses = colorClasses.split(" bg-")[0];
            return (
              <Card key={index} className="p-6 hover h-full" hover>
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${gradientClasses} rounded-xl flex items-center justify-center mb-4`}
                >
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-start space-x-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <div
                        className={`w-1.5 h-1.5 ${feature.color === 'blue' ? 'bg-blue-500' : feature.color === 'green' ? 'bg-green-500' : feature.color === 'purple' ? 'bg-purple-500' : feature.color === 'orange' ? 'bg-orange-500' : feature.color === 'red' ? 'bg-red-500' : 'bg-teal-500'} rounded-full mt-2 flex-shrink-0`}
                      ></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Performance Metrics
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Detection Accuracy
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">95.7%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    style={{ width: "95.7%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Classification Precision
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-bold">92.3%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                    style={{ width: "92.3%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Processing Speed
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">98.1%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                    style={{ width: "98.1%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    System Reliability
                  </span>
                  <span className="text-orange-600 dark:text-orange-400 font-bold">99.2%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full"
                    style={{ width: "99.2%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Technical Achievements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                  <i className="ri-cpu-line text-blue-600 dark:text-blue-400 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Multi-Model Ensemble
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Advanced ensemble of 5+ deep learning models
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                  <i className="ri-cloud-line text-green-600 dark:text-green-400 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Cloud Integration
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Scalable cloud-based processing infrastructure
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                  <i className="ri-smartphone-line text-purple-600 dark:text-purple-400 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Mobile Compatibility
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Responsive design for mobile device access
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                  <i className="ri-share-line text-orange-600 dark:text-orange-400 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    API Integration
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    RESTful APIs for seamless system integration
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
