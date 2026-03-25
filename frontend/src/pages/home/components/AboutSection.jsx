import Card from "../../../components/base/Card";

export default function AboutSection() {
  const objectives = [
    {
      icon: "ri-target-line",
      title: "Early Detection",
      description:
        "Implement AI algorithms to detect lung cancer at early stages when treatment is most effective",
    },
    {
      icon: "ri-accuracy-line",
      title: "High Accuracy",
      description:
        "Achieve superior accuracy in nodule classification compared to traditional methods",
    },
    {
      icon: "ri-time-line",
      title: "Rapid Analysis",
      description:
        "Reduce diagnosis time from hours to minutes through automated CT scan analysis",
    },
    {
      icon: "ri-eye-line",
      title: "Transparency",
      description:
        "Provide explainable AI results through Grad-CAM visualization techniques",
    },
    {
      icon: "ri-shield-check-line",
      title: "Data Security",
      description:
        "Ensure HIPAA compliance and robust data privacy protection mechanisms",
    },
    {
      icon: "ri-user-heart-line",
      title: "Clinical Support",
      description:
        "Assist healthcare professionals in making informed diagnostic decisions",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About the Project
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            DeepLung represents a breakthrough in medical AI technology,
            combining state-of-the-art deep learning with clinical expertise to
            revolutionize lung cancer detection and classification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Card className="p-8 h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-search-eye-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Project Overview
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                DeepLung is an innovative AI-driven system designed to assist
                healthcare professionals in the early detection and
                classification of lung cancer through automated analysis of CT
                scans. Our system leverages advanced deep learning
                architectures, including Convolutional Neural Networks (CNNs)
                and ensemble methods, to identify suspicious nodules with high
                precision.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The system integrates multiple AI models, provides explainable
                results through visualization techniques, and maintains strict
                data privacy standards to support clinical decision-making in
                real-world healthcare environments.
              </p>
            </Card>
          </div>

          <div>
            <Card className="p-8 h-full">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-alarm-warning-line text-red-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Problem Statement
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Lung cancer remains the leading cause of cancer-related deaths
                worldwide, with over 1.8 million deaths annually. Early
                detection is crucial, as the 5-year survival rate increases from
                18% to 56% when caught in early stages.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <i className="ri-arrow-right-circle-line text-red-500 mt-1"></i>
                  <span>
                    Manual CT scan analysis is time-consuming and prone to human
                    error
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-arrow-right-circle-line text-red-500 mt-1"></i>
                  <span>
                    Shortage of qualified radiologists in many healthcare
                    systems
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-arrow-right-circle-line text-red-500 mt-1"></i>
                  <span>
                    Inconsistent diagnosis results between different
                    practitioners
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-arrow-right-circle-line text-red-500 mt-1"></i>
                  <span>
                    Delayed diagnosis leading to advanced-stage detection
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Project Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <Card key={index} className="p-6 hover" hover>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${objective.icon} text-white text-xl`}></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {objective.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {objective.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
