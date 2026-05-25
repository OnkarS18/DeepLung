import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import AboutSection from "../home/components/AboutSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className="py-12">
        <AboutSection />
      </div>
      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
