import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredentialBar from "@/components/CredentialBar";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TreatmentSection from "@/components/TreatmentSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CredentialBar />
        <BlogSection />
        <AboutSection />
        <ProcessSection />
        <TreatmentSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
