import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredentialBar from "@/components/CredentialBar";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TreatmentSection from "@/components/TreatmentSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CredentialBar />
        <AboutSection />
        <ProcessSection />
        <TreatmentSection />
        <PricingSection />
        <TestimonialsSection />
        <BlogSection />
        <FaqSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
