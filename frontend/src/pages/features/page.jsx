import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import FeaturesSection from "../home/components/FeaturesSection";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-12">
        <FeaturesSection />
      </div>
      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
