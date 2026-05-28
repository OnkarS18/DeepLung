import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import ArchitectureSection from "../home/components/ArchitectureSection";
import MethodologySection from "../home/components/MethodologySection";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-12">
        <ArchitectureSection />
        <MethodologySection />
      </div>
      <Footer />
    </div>
  );
}
