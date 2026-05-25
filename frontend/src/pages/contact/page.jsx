import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import XAISanvadChatbot from "../../components/feature/XAISanvadChatbot";
import ContactSection from "../home/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-12">
        <ContactSection />
      </div>
      <Footer />
      <XAISanvadChatbot />
    </div>
  );
}
