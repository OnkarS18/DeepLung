import { useState, useRef, useEffect } from "react";
import Card from "../base/Card";

export default function GradCAMChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI assistant for DeepLung. I can help explain model decisions, interpret Grad-CAM visualizations, and answer questions about lung cancer detection. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    "grad-cam": {
      content:
        "Grad-CAM (Gradient-weighted Class Activation Mapping) highlights the regions in a CT scan that our AI model focuses on when making predictions. Red areas indicate high attention (suspicious regions), while blue areas show lower attention. This helps doctors understand why the AI made a specific classification.",
      hasGradCam: true,
      gradCamUrl:
        "https://readdy.ai/api/search-image?query=Medical%20Grad-CAM%20heatmap%20explanation%20diagram%20showing%20color-coded%20attention%20regions%20on%20lung%20CT%20scan%2C%20educational%20medical%20visualization%20with%20red%20and%20blue%20overlays%20indicating%20AI%20focus%20areas&width=400&height=300&seq=gradcam-explanation&orientation=landscape",
    },
    accuracy: {
      content:
        "Our DeepLung system achieves 95.7% accuracy in nodule detection. This means out of 100 cases, we correctly identify 95-96 cases. We use ensemble methods combining ResNet-50, DenseNet-121, and EfficientNet-B4 to achieve this high accuracy.",
      hasGradCam: false,
    },
    nodule: {
      content:
        "A lung nodule is a small, round growth in the lungs. Most nodules (95%) are benign (non-cancerous), but some can be malignant (cancerous). Our AI analyzes size, shape, density, and growth patterns to classify nodules and assess cancer risk.",
      hasGradCam: false,
    },
    model: {
      content:
        "DeepLung uses a multi-model ensemble approach: ResNet-50 for feature extraction, DenseNet-121 for dense connectivity patterns, and EfficientNet-B4 for optimal efficiency. Each model votes on the final classification, improving overall accuracy and reducing false positives.",
      hasGradCam: false,
    },
    confidence: {
      content:
        "Confidence scores indicate how certain our AI is about its prediction. Scores above 90% are highly reliable, 70-90% are moderately reliable, and below 70% may require additional review. We also provide uncertainty quantification to help clinicians make informed decisions.",
      hasGradCam: false,
    },
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = predefinedResponses["accuracy"]; // default
    if (
      lowerInput.includes("grad-cam") ||
      lowerInput.includes("gradcam") ||
      lowerInput.includes("visualization") ||
      lowerInput.includes("heatmap")
    ) {
      response = predefinedResponses["grad-cam"];
    } else if (
      lowerInput.includes("accuracy") ||
      lowerInput.includes("performance") ||
      lowerInput.includes("precise")
    ) {
      response = predefinedResponses["accuracy"];
    } else if (
      lowerInput.includes("nodule") ||
      lowerInput.includes("tumor") ||
      lowerInput.includes("growth")
    ) {
      response = predefinedResponses["nodule"];
    } else if (
      lowerInput.includes("model") ||
      lowerInput.includes("algorithm") ||
      lowerInput.includes("ai") ||
      lowerInput.includes("neural")
    ) {
      response = predefinedResponses["model"];
    } else if (
      lowerInput.includes("confidence") ||
      lowerInput.includes("certainty") ||
      lowerInput.includes("score")
    ) {
      response = predefinedResponses["confidence"];
    } else if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("help")
    ) {
      response = {
        content:
          "Hello! I can help you understand our AI model decisions, explain Grad-CAM visualizations, discuss accuracy metrics, or answer questions about lung nodules and cancer detection. What would you like to know?",
        hasGradCam: false,
      };
    } else {
      response = {
        content:
          'I can help explain AI model decisions, Grad-CAM visualizations, accuracy metrics, lung nodules, and our detection algorithms. Could you please be more specific about what you\'d like to know? For example, ask about "Grad-CAM", "model accuracy", "lung nodules", or "confidence scores".',
        hasGradCam: false,
      };
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response.content,
      timestamp: new Date(),
      hasGradCam: response.hasGradCam,
      gradCamUrl: response.gradCamUrl,
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How does Grad-CAM work?",
    "What is model accuracy?",
    "Explain lung nodules",
    "How confident is the AI?",
  ];

  return (
    <Card className="p-0 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-robot-line text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold">DeepLung AI Assistant</h3>
            <p className="text-sm opacity-90">
              Ask me about model decisions and Grad-CAM
            </p>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              {message.hasGradCam && message.gradCamUrl && (
                <div className="mt-3">
                  <img
                    src={message.gradCamUrl}
                    alt="Grad-CAM Visualization"
                    className="w-full rounded-lg border"
                  />
                </div>
              )}
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputValue(question)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about AI decisions, Grad-CAM, or model explanations..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />

          <button
            onClick={handleSendMessage}
            disabled={isTyping || !inputValue.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-send-plane-line"></i>
          </button>
        </div>
      </div>
    </Card>
  );
}
