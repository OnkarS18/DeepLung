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
      {/* Background with XAI imagery */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Advanced%20explainable%20AI%20visualization%20for%20medical%20imaging%2C%20transparent%20neural%20network%20overlay%20on%20lung%20CT%20scan%2C%20glowing%20neural%20pathways%20showing%20AI%20decision%20process%2C%20medical%20professional%20analyzing%20transparent%20AI%20predictions%20with%20glowing%20heatmaps%2C%20modern%20healthcare%20technology%20with%20blue%20and%20green%20gradients%2C%20professional%20clinical%20setting%20with%20holographic%20AI%20interface%2C%20futuristic%20medical%20diagnostic%20environment%20showing%20explainable%20artificial%20intelligence&width=1920&height=1080&seq=xai-medical-hero&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent medical-shadow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="w-full max-w-5xl">
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 flex items-center justify-center relative">
                <img
                  src="https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/eb467829726c2f3f5aff07820ab28496.png"
                  alt="DeepLung Logo"
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  DeepLung
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light">
                  AI-Driven System for Lung Cancer Detection
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl text-white font-light mb-6 leading-relaxed">
              Advanced Nodule Classification Using CT Scans
            </h2>

            {/* XAI Tagline */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20 hover-lift">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-brain-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <span>Explainable AI Implementation</span>
                    <i className="ri-sparkling-2-line text-yellow-400"></i>
                  </h3>
                  <p className="text-blue-100 dark:text-blue-200 text-lg">
                    Transparent, interpretable decisions you can trust
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-4xl">
              Revolutionizing early lung cancer detection through cutting-edge
              explainable artificial intelligence, enabling healthcare
              professionals to understand, trust, and validate AI decisions with
              complete transparency and confidence in clinical settings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <i className="ri-brain-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI-Powered Detection
                </h3>
                <p className="text-blue-100">
                  Advanced deep learning algorithms for accurate nodule
                  identification with 96.2% accuracy
                </p>
              </div>

              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <i className="ri-eye-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Explainable AI
                </h3>
                <p className="text-blue-100">
                  Grad-CAM visualization for transparent decision-making process
                  and clinical interpretation
                </p>
              </div>

              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <i className="ri-shield-check-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure & Private
                </h3>
                <p className="text-blue-100">
                  HIPAA-compliant data handling and privacy protection for
                  healthcare environments
                </p>
              </div>
            </div>

            {/* Department Badge */}
            <div className="mt-12 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <p className="text-white text-sm font-medium">
                  <i className="ri-graduation-cap-line mr-2"></i>
                  Department of Electronics & Telecommunication Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => handleNavigate("/about")}
          className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-all hover-lift"
        >
          <i className="ri-arrow-down-line text-xl"></i>
        </button>
      </div>
    </section>
  );
}
