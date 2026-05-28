import { useNavigate } from "react-router-dom";
import Button from "../../../components/base/Button";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-screen h-screen object-cover pointer-events-none"
      >
        <source src="/Video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Gradient Overlay for perfect centered text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black/45 to-blue-950/65"></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="w-full max-w-5xl mx-auto">
          <div className="animate-fade-in-up text-center">
            {/* Logo and Title - Centered */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-36 h-36 flex items-center justify-center relative mb-4">
                <img
                  src="https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/eb467829726c2f3f5aff07820ab28496.png"
                  alt="DeepLung Logo"
                  className="w-full h-full object-contain filter drop-shadow-2xl animate-pulse"
                />
              </div>
              <div className="text-center">
                <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-200 tracking-tight leading-none filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
                  DeepLung
                </h1>
                <p className="text-xl md:text-2xl text-blue-200 font-light mt-4 tracking-wide max-w-2xl mx-auto">
                  AI-Driven System for Lung Cancer Detection
                </p>
              </div>
            </div>

            {/* XAI Tagline */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20 hover-lift max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <i className="ri-brain-line text-white text-2xl animate-pulse"></i>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
                    <span>Explainable AI Implementation</span>
                    <i className="ri-sparkling-2-line text-yellow-400 animate-bounce"></i>
                  </h3>
                  <p className="text-blue-100 dark:text-blue-200 text-base md:text-lg">
                    Transparent, interpretable decisions you can trust
                  </p>
                </div>
              </div>
            </div>

            {/* <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-4xl mx-auto text-center font-light">
              Revolutionizing early lung cancer detection through cutting-edge
              explainable artificial intelligence, enabling healthcare
              professionals to understand, trust, and validate AI decisions with
              complete transparency and confidence in clinical settings.
            </p> */}

            {/* Buttons - Centered */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigate("/about")}
                className="bg-white text-blue-900 border-white hover:bg-blue-50 btn-glow hover-lift whitespace-nowrap shadow-xl"
              >
                <i className="ri-play-circle-line"></i>
                Explore Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigate("/architecture")}
                className="border-white text-white hover:bg-white hover:text-blue-800 hover-lift whitespace-nowrap"
              >
                <i className="ri-settings-3-line"></i>
                View Architecture
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigate("/dashboard")}
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-800 hover-lift xai-glow whitespace-nowrap"
              >
                <i className="ri-login-box-line"></i>
                Access Dashboard
              </Button>
            </div> */}

            {/* Feature Cards - Centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-38 max-w-6xl mx-auto">
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 shadow-lg mx-auto">
                  <i className="ri-brain-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI-Powered Detection
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Advanced deep learning algorithms for accurate nodule
                  identification with 96.2% accuracy
                </p>
              </div>

              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg mx-auto">
                  <i className="ri-eye-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Explainable AI
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Grad-CAM visualization for transparent decision-making process
                  and clinical interpretation
                </p>
              </div>

              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 shadow-lg mx-auto">
                  <i className="ri-shield-check-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure & Private
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  HIPAA-compliant data handling and privacy protection for
                  healthcare environments
                </p>
              </div>
            </div>

            {/* Department Badge - Centered */}
            {/* <div className="mt-12 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <p className="text-white text-sm font-medium">
                  <i className="ri-graduation-cap-line mr-2"></i>
                  Department of Electronics & Telecommunication Engineering
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => handleNavigate("/about")}
          className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-all hover-lift"
        >
          <i className="ri-arrow-down-line text-xl"></i>
        </button>
      </div> */}
    </section>
  );
}