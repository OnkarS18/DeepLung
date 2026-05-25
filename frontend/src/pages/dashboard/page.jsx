import { useState } from "react";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import CTScanViewer from "../../components/feature/CTScanViewer";
import GradCAMChatbot from "../../components/feature/GradCAMChatbot";
import ModelComparison from "../../components/feature/ModelComparison";
import Glossary from "../../components/feature/Glossary";
import FAQSection from "../../components/feature/FAQSection";
import AnimatedArchitecture from "../../components/feature/AnimatedArchitecture";
import Card from "../../components/base/Card";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("scanner");

  const tabs = [
    { key: "scanner", label: "CT Scan Analyzer", icon: "ri-scan-line" },
    {
      key: "comparison",
      label: "Model Comparison",
      icon: "ri-bar-chart-box-line",
    },
    { key: "architecture", label: "System Flow", icon: "ri-flow-chart" },
    { key: "glossary", label: "Glossary", icon: "ri-book-open-line" },
    { key: "faq", label: "FAQ", icon: "ri-question-answer-line" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "scanner":
        return (
          <div className="space-y-8">
            <CTScanViewer />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  AI Assistant
                </h3>
                <GradCAMChatbot />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-download-line mr-2"></i>
                      Download Analysis Report
                    </button>
                    <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-share-line mr-2"></i>
                      Share with Healthcare Team
                    </button>
                    <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-history-line mr-2"></i>
                      View Analysis History
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
      case "comparison":
        return <ModelComparison />;
      case "architecture":
        return <AnimatedArchitecture />;
      case "glossary":
        return <Glossary />;
      case "faq":
        return <FAQSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            DeepLung AI Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced AI-powered tools for lung cancer detection, analysis, and
            clinical decision support.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">{renderContent()}</div>
      </main>

      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
