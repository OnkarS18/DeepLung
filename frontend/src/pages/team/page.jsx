import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import TeamSection from "../home/components/TeamSection";

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-12">
        <TeamSection />
      </div>
      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
