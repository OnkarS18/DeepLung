import Card from "../../../components/base/Card";

export default function ArchitectureSection() {
  const modules = [
    {
      icon: "ri-database-2-line",
      title: "Data Storage Module",
      description:
        "Secure cloud-based storage system for CT scan images and patient data with HIPAA compliance",
      features: [
        "Encrypted data storage",
        "Backup & recovery",
        "Access control",
        "Audit logging",
      ],
    },
    {
      icon: "ri-image-edit-line",
      title: "Preprocessing Module",
      description:
        "Advanced image processing pipeline for CT scan enhancement and normalization",
      features: [
        "Noise reduction",
        "Image enhancement",
        "Standardization",
        "Quality assessment",
      ],
    },
    {
      icon: "ri-search-2-line",
      title: "Detection Module",
      description:
        "AI-powered nodule detection using state-of-the-art deep learning algorithms",
      features: [
        "CNN architecture",
        "Multi-scale detection",
        "False positive reduction",
        "Region proposal",
      ],
    },
    {
      icon: "ri-pie-chart-line",
      title: "Classification Module",
      description:
        "Advanced classification system to categorize detected nodules as benign or malignant",
      features: [
        "Ensemble methods",
        "Feature extraction",
        "Risk assessment",
        "Confidence scoring",
      ],
    },
    {
      icon: "ri-eye-line",
      title: "Explainability Module",
      description:
        "Grad-CAM visualization for transparent AI decision-making and clinical interpretation",
      features: [
        "Heat map generation",
        "Feature visualization",
        "Decision transparency",
        "Clinical insights",
      ],
    },
    {
      icon: "ri-dashboard-line",
      title: "User Interface",
      description:
        "Intuitive web-based dashboard for healthcare professionals and administrators",
      features: [
        "Interactive visualization",
        "Report generation",
        "User management",
        "Mobile responsive",
      ],
    },
    {
      icon: "ri-shield-check-line",
      title: "Security Module",
      description:
        "Comprehensive security framework ensuring data privacy and system integrity",
      features: [
        "End-to-end encryption",
        "Authentication",
        "Authorization",
        "Compliance monitoring",
      ],
    },
  ];

  return (
    <section id="architecture" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            System Architecture
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            A comprehensive, modular architecture designed for scalability,
            security, and clinical integration.
          </p>

          {/* Premium System Architecture Image Container */}
          <div className="max-w-5xl mx-auto mb-16 px-2">
            <div className="relative group overflow-hidden rounded-2xl bg-slate-50/50 p-4 md:p-6 border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-blue-200/60 hover:bg-white">
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
              
              <img
                src="/system_architecture.png"
                alt="DeepLung System Architecture Diagram"
                className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-xl select-none transition-transform duration-500 group-hover:scale-[1.005]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card key={index} className="p-6 hover" hover>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                <i className={`${module.icon} text-white text-2xl`}></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {module.title}
              </h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {module.description}
              </p>
              <ul className="space-y-2">
                {module.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start space-x-2 text-sm text-gray-500"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Technology Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Deep Learning Column */}
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-blue-600 mb-4 h-12 flex items-start">
                  Deep Learning
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>TensorFlow & Keras</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>PyTorch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>OpenCV</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Scikit-learn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Grad-CAM</span>
                  </li>
                </ul>
              </div>

              {/* Backend & Database Column */}
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-green-600 mb-4 h-12 flex items-start">
                  Backend & Database
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Python Flask/Django</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Render</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Redis Cache</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Docker Containers</span>
                  </li>
                </ul>
              </div>

              {/* Frontend & Security Column */}
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-purple-600 mb-4 h-12 flex items-start">
                  Frontend & Security
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>React.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Vite</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>TypeScript</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>JWT Authentication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>HIPAA Compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}