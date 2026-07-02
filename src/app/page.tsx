import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { HeroSection } from "@/components/sections/HeroSection";
import { RiskSection } from "@/components/sections/RiskSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ExecutionSection } from "@/components/sections/ExecutionSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { SafetySection } from "@/components/sections/SafetySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <HeroSection />
        <RiskSection />
        <AboutSection />
        <ServicesSection />
        <ExecutionSection />
        <CapabilitiesSection />
        <SafetySection />
        <ProjectsSection />
        <FinalCTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  );
}
