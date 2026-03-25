import { useState, useEffect } from "react";
import Card from "../base/Card";

export default function AnimatedArchitecture() {
  const [activeStep, setActiveStep] = useState(null);
  const [flowActive, setFlowActive] = useState(false);

  const flowSteps = [
    {
      id: "input",
      title: "CT Scan Input",
      description: "DICOM files uploaded securely",
      icon: "ri-upload-cloud-2-line",
      position: { x: 10, y: 50 },
      connections: ["preprocessing"],
      delay: 0,
    },
    {
      id: "preprocessing",
      title: "Image Processing",
      description: "Noise reduction & enhancement",
      icon: "ri-image-edit-line",
      position: { x: 30, y: 20 },
      connections: ["detection"],
      delay: 1000,
    },
    {
      id: "detection",
      title: "Nodule Detection",
      description: "AI identifies suspicious regions",
      icon: "ri-search-2-line",
      position: { x: 50, y: 50 },
      connections: ["classification", "gradcam"],
      delay: 2000,
    },
    {
      id: "classification",
      title: "Classification",
      description: "Benign vs malignant analysis",
      icon: "ri-pie-chart-line",
      position: { x: 70, y: 20 },
      connections: ["results"],
      delay: 3000,
    },
    {
      id: "gradcam",
      title: "Grad-CAM Analysis",
      description: "Explainable AI visualization",
      icon: "ri-eye-line",
      position: { x: 70, y: 80 },
      connections: ["results"],
      delay: 3500,
    },
    {
      id: "results",
      title: "Clinical Report",
      description: "Comprehensive diagnostic report",
      icon: "ri-file-text-line",
      position: { x: 90, y: 50 },
      connections: [],
      delay: 4000,
    },
  ];

  useEffect(() => {
    if (flowActive) {
      const maxDelay = Math.max(...flowSteps.map((step) => step.delay));
      const timer = setTimeout(() => {
        setFlowActive(false);
        setActiveStep(null);
      }, maxDelay + 2000);
      return () => clearTimeout(timer);
    }
  }, [flowActive]);

  const startAnimation = () => {
    setFlowActive(true);
    setActiveStep(null);
    flowSteps.forEach((step) => {
      setTimeout(() => {
        if (flowActive) {
          setActiveStep(step.id);
        }
      }, step.delay);
    });
  };

  const getConnectionPath = (from, to) => {
    const fromX = from.position.x + 5; // Account for node size
    const fromY = from.position.y + 2.5;
    const toX = to.position.x;
    const toY = to.position.y + 2.5;
    // Create curved path
    const midX = (fromX + toX) / 2;
    const controlY = Math.abs(fromY - toY) > 20 ? (fromY + toY) / 2 : fromY;
    return `M ${fromX} ${fromY} Q ${midX} ${controlY} ${toX} ${toY}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            System Architecture Flow
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Watch how DeepLung processes CT scans through our advanced AI
            pipeline, from input to diagnostic report generation.
          </p>
          <button
            onClick={startAnimation}
            disabled={flowActive}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              flowActive
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <i className="ri-play-line mr-2"></i>
            {flowActive ? "Processing..." : "Start Animation"}
          </button>
        </div>

        {/* Animated Flow Diagram */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection Lines */}
            {flowSteps.map((step) =>
              step.connections.map((connectionId) => {
                const targetStep = flowSteps.find((s) => s.id === connectionId);
                if (!targetStep) return null;
                return (
                  <path
                    key={`${step.id}-${connectionId}`}
                    d={getConnectionPath(step, targetStep)}
                    stroke={flowActive ? "#3B82F6" : "#D1D5DB"}
                    strokeWidth="0.5"
                    fill="none"
                    className={`transition-all duration-500 ${
                      flowActive ? "animate-pulse" : ""
                    }`}
                    markerEnd="url(#arrowhead)"
                  />
                );
              }),
            )}

            {/* Arrow marker */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill={flowActive ? "#3B82F6" : "#D1D5DB"}
                  className="transition-all duration-500"
                />
              </marker>
            </defs>
          </svg>

          {/* Flow Steps */}
          {flowSteps.map((step) => (
            <div
              key={step.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeStep === step.id
                  ? "scale-110 z-10"
                  : flowActive
                    ? "scale-100"
                    : "scale-95"
              }`}
              style={{
                left: `${step.position.x}%`,
                top: `${step.position.y}%`,
              }}
            >
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-center p-2 transition-all duration-500 cursor-pointer ${
                  activeStep === step.id
                    ? "bg-blue-600 text-white shadow-xl ring-4 ring-blue-200"
                    : flowActive
                      ? "bg-white text-gray-700 shadow-lg border-2 border-blue-200"
                      : "bg-white text-gray-600 shadow-md border border-gray-200 hover:shadow-lg"
                }`}
                onClick={() =>
                  setActiveStep(activeStep === step.id ? null : step.id)
                }
              >
                <i className={`${step.icon} text-lg mb-1`}></i>
                <span className="text-xs font-medium leading-tight">
                  {step.title}
                </span>
              </div>

              {/* Tooltip */}
              {activeStep === step.id && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap z-20">
                  {step.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          ))}

          {/* Processing Indicators */}
          {flowActive && (
            <>
              {/* Data Flow Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"
                    style={{
                      left: `${10 + i * 20}%`,
                      top: "50%",
                      animationDelay: `${i * 800}ms`,
                      animationDuration: "2s",
                    }}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Detailed Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flowSteps.map((step, index) => (
          <Card
            key={step.id}
            className={`p-6 transition-all duration-300 cursor-pointer ${
              activeStep === step.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-lg"
            }`}
            onClick={() =>
              setActiveStep(activeStep === step.id ? null : step.id)
            }
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activeStep === step.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <i className={`${step.icon} text-xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      activeStep === step.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h4 className="font-semibold text-gray-800">{step.title}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Processing Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-time-line text-blue-600 text-2xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">&lt;60s</div>
            <div className="text-sm text-gray-600">Processing Time</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-cpu-line text-green-600 text-2xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">95.7%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-cloud-line text-purple-600 text-2xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">Cloud</div>
            <div className="text-sm text-gray-600">Scalable Infrastructure</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-check-line text-orange-600 text-2xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">HIPAA</div>
            <div className="text-sm text-gray-600">Compliant</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
