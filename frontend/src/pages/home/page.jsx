import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      {/* High-level overview could go here, or just keep it as a landing page */}
      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
