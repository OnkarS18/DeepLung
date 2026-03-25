import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ArchitectureSection from "./components/ArchitectureSection";
import MethodologySection from "./components/MethodologySection";
import FeaturesSection from "./components/FeaturesSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ArchitectureSection />
      <FeaturesSection />
      <MethodologySection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
