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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A comprehensive, modular architecture designed for scalability,
            security, and clinical integration.
          </p>
        </div>

        <div className="mb-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Architecture Overview
            </h3>
            <div
              className="w-full h-96 bg-cover bg-center rounded-xl mb-6"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20system%20architecture%20diagram%20showing%20AI%20medical%20system%20modules%2C%20clean%20technical%20illustration%2C%20modular%20design%20with%20interconnected%20components%2C%20data%20flow%20visualization%2C%20modern%20healthcare%20technology%20stack%2C%20blue%20and%20green%20color%20scheme%2C%20professional%20technical%20documentation%20style&width=1200&height=600&seq=architecture-diagram&orientation=landscape')`,
              }}
            ></div>
            <p className="text-gray-600 text-center leading-relaxed">
              The DeepLung system follows a microservices architecture with
              clearly defined modules, ensuring maintainability, scalability,
              and seamless integration with existing healthcare systems.
            </p>
          </Card>
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
                    className="flex items-center space-x-2 text-sm text-gray-500"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
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
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-4">
                  Machine Learning
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• TensorFlow & Keras</li>
                  <li>• PyTorch</li>
                  <li>• OpenCV</li>
                  <li>• Scikit-learn</li>
                  <li>• Grad-CAM</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-4">
                  Backend & Database
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Python Flask/Django</li>
                  <li>• PostgreSQL</li>
                  <li>• Redis Cache</li>
                  <li>• AWS/Azure Cloud</li>
                  <li>• Docker Containers</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-4">
                  Frontend & Security
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• React.js</li>
                  <li>• TypeScript</li>
                  <li>• JWT Authentication</li>
                  <li>• SSL/TLS Encryption</li>
                  <li>• HIPAA Compliance</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
