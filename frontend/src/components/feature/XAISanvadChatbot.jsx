import { useState } from "react";
import Card from "../base/Card";
import Button from "../base/Button";

export default function XAISanvadChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content:
        "नमस्ते! I'm XAI Sanvad (संवाद), your Explainable AI assistant for DeepLung. I can help explain how our AI makes decisions, interpret scan results, and answer questions about lung cancer detection. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How does the AI detect lung nodules?",
    "What is Grad-CAM visualization?",
    "Explain the confidence score",
    "What are the model limitations?",
    "How accurate is the detection?",
  ];

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("nodule") || lowerMessage.includes("detect")) {
      return "Our AI uses deep convolutional neural networks (ResNet, DenseNet, EfficientNet) to analyze CT scan images. The model identifies suspicious areas by examining texture patterns, shape characteristics, and density variations. Each detection comes with a confidence score showing how certain the AI is about the finding.";
    }
    if (
      lowerMessage.includes("grad-cam") ||
      lowerMessage.includes("visualization")
    ) {
      return "Grad-CAM (Gradient-weighted Class Activation Mapping) creates heatmaps showing which parts of the CT scan the AI focused on when making its decision. Red/hot areas indicate regions that strongly influenced the AI's prediction, while blue/cool areas had less impact. This helps doctors understand the AI's reasoning.";
    }
    if (lowerMessage.includes("confidence") || lowerMessage.includes("score")) {
      return "The confidence score (0-100%) indicates how certain our AI is about its prediction. Scores above 80% suggest high confidence, 60-80% moderate confidence, and below 60% low confidence. Higher scores typically correlate with clearer, more definitive imaging features.";
    }
    if (
      lowerMessage.includes("accurate") ||
      lowerMessage.includes("accuracy")
    ) {
      return "Our ensemble model achieves 96.2% accuracy on test data. However, AI should always be used as a diagnostic aid, not a replacement for clinical judgment. Sensitivity is 93.1% (correctly identifies 93.1% of actual nodules) and specificity is 97.8% (correctly identifies 97.8% of non-nodules).";
    }
    if (lowerMessage.includes("limitation") || lowerMessage.includes("limit")) {
      return "Key limitations include: 1) Trained primarily on specific CT scan protocols, 2) May struggle with very small nodules (&lt;3mm), 3) Cannot replace histopathological confirmation, 4) Performance may vary with different scanner manufacturers, 5) Requires high-quality, artifact-free images for optimal results.";
    }
    return "I understand you're asking about our AI system. Could you be more specific? I can explain how the AI detects nodules, interpret Grad-CAM visualizations, discuss accuracy metrics, or clarify any aspect of the DeepLung system. What specific topic would you like to explore?";
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all cursor-pointer animate-pulse hover:scale-110 medical-shadow"
          title="XAI Sanvad - Explainable AI Assistant"
        >
          <div className="relative">
            <i className="ri-chat-ai-line text-2xl"></i>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        </button>
        <div className="absolute -top-16 right-0 bg-gradient-to-r from-indigo-800 to-purple-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">XAI संवाद</span>
            <i className="ri-sparkling-2-line text-yellow-400"></i>
          </div>
          <div className="text-xs text-indigo-200">
            Explainable AI Assistant
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-96 shadow-2xl transition-all medical-shadow ${isMinimized ? "h-16" : "h-96"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center relative">
              <i className="ri-chat-ai-line"></i>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold flex items-center space-x-2">
                <span>XAI संवाद</span>
                <i className="ri-sparkling-2-line text-yellow-400 text-sm"></i>
              </h3>
              <p className="text-xs text-indigo-100">
                Explainable AI Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 rounded p-1 cursor-pointer transition-all"
            >
              <i
                className={isMinimized ? "ri-add-line" : "ri-subtract-line"}
              ></i>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded p-1 cursor-pointer transition-all"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 px-3 py-2 rounded-lg text-sm border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-2 py-1 rounded hover:from-indigo-100 hover:to-purple-100 cursor-pointer transition-all border border-indigo-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendMessage(inputMessage)
                  }
                  placeholder="Ask about AI decisions..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />

                <Button
                  size="sm"
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 whitespace-nowrap"
                >
                  <i className="ri-send-plane-line"></i>
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
