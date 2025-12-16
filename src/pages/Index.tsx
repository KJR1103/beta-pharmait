import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PrescriptionSection from "@/components/PrescriptionSection";
import AdviceSection from "@/components/AdviceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <PrescriptionSection />
        <AdviceSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
