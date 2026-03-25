import Card from "../../../components/base/Card";

export default function MethodologySection() {
  const processSteps = [
    {
      step: "01",
      title: "Data Collection & Preparation",
      description:
        "Gathering diverse CT scan datasets from multiple medical institutions and preparing data for training",
      icon: "ri-database-line",
      duration: "Weeks 1-3",
    },
    {
      step: "02",
      title: "Image Preprocessing",
      description:
        "Implementing advanced preprocessing techniques including noise reduction, normalization, and augmentation",
      icon: "ri-image-edit-line",
      duration: "Weeks 4-5",
    },
    {
      step: "03",
      title: "Model Development",
      description:
        "Developing and training deep learning models using CNN architectures for nodule detection",
      icon: "ri-brain-line",
      duration: "Weeks 6-10",
    },
    {
      step: "04",
      title: "Classification System",
      description:
        "Building advanced classification algorithms to distinguish between benign and malignant nodules",
      icon: "ri-pie-chart-line",
      duration: "Weeks 11-13",
    },
    {
      step: "05",
      title: "Explainability Integration",
      description:
        "Implementing Grad-CAM visualization for transparent AI decision-making processes",
      icon: "ri-eye-line",
      duration: "Weeks 14-15",
    },
    {
      step: "06",
      title: "System Integration",
      description:
        "Integrating all modules into a cohesive system with user interface and security features",
      icon: "ri-settings-3-line",
      duration: "Weeks 16-18",
    },
    {
      step: "07",
      title: "Testing & Validation",
      description:
        "Comprehensive testing, validation, and performance evaluation with real-world data",
      icon: "ri-test-tube-line",
      duration: "Weeks 19-20",
    },
    {
      step: "08",
      title: "Deployment & Documentation",
      description:
        "Final deployment, documentation, and preparation for clinical evaluation and presentation",
      icon: "ri-rocket-line",
      duration: "Weeks 21-22",
    },
  ];

  return (
    <section id="methodology" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Methodology & Process Flow
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A systematic approach to developing an AI-driven lung cancer
            detection system through rigorous research, development, and
            validation phases.
          </p>
        </div>

        <div className="mb-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Project Timeline & Gantt Chart
            </h3>
            <div
              className="w-full h-80 bg-cover bg-center rounded-xl mb-6"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20Gantt%20chart%20showing%2022-week%20project%20timeline%20for%20AI%20medical%20system%20development%2C%20clean%20project%20management%20visualization%2C%20timeline%20bars%20in%20blue%20and%20green%20colors%2C%20milestones%20marked%20clearly%2C%20modern%20business%20chart%20design%2C%20professional%20documentation%20style&width=1200&height=500&seq=gantt-chart&orientation=landscape')`,
              }}
            ></div>
            <p className="text-gray-600 text-center leading-relaxed">
              The project follows a structured 22-week timeline with clearly
              defined phases, milestones, and deliverables to ensure systematic
              development and thorough validation.
            </p>
          </Card>
        </div>

        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {step.step}
                  </span>
                </div>
              </div>

              <Card className="flex-1 p-6 hover" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className={`${step.icon} text-blue-600 text-xl`}></i>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {step.title}
                    </h4>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Research Methodology
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start space-x-3">
                <i className="ri-checkbox-circle-line text-green-500 mt-1"></i>
                <span>
                  Literature review of existing lung cancer detection methods
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-checkbox-circle-line text-green-500 mt-1"></i>
                <span>Comparative analysis of deep learning architectures</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-checkbox-circle-line text-green-500 mt-1"></i>
                <span>Dataset curation from multiple medical institutions</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-checkbox-circle-line text-green-500 mt-1"></i>
                <span>Experimental design for model evaluation</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-checkbox-circle-line text-green-500 mt-1"></i>
                <span>Statistical analysis and performance metrics</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Quality Assurance
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start space-x-3">
                <i className="ri-shield-check-line text-blue-500 mt-1"></i>
                <span>Cross-validation techniques for model reliability</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-shield-check-line text-blue-500 mt-1"></i>
                <span>Independent test set validation</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-shield-check-line text-blue-500 mt-1"></i>
                <span>Clinical expert review and feedback</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-shield-check-line text-blue-500 mt-1"></i>
                <span>Bias detection and mitigation strategies</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="ri-shield-check-line text-blue-500 mt-1"></i>
                <span>Continuous monitoring and improvement</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
