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
import { Preloader } from "@/components/layout/Preloader";
import { JsonLd } from "@/components/seo/JsonLd";
import { adaptProjectsToGallery } from "@/lib/adapters/project-gallery";
import { getPublicProjects } from "@/lib/api/public-api";
import type { Locale } from "@/i18n";
import { getPublicSettings } from "@/lib/api/public-api";
import {
  adaptSiteSettings,
  fallbackSiteSettings,
} from "@/lib/adapters/site-settings";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [projectRecords, settingsRecord] = await Promise.all([
    getPublicProjects().catch(() => undefined),
    getPublicSettings().catch(() => undefined),
  ]);
  const projects = projectRecords
    ? adaptProjectsToGallery(projectRecords, locale as Locale)
    : undefined;
  const settings = settingsRecord
    ? adaptSiteSettings(settingsRecord)
    : fallbackSiteSettings;

  return (
    <SiteSettingsProvider settings={settings}>
      <Preloader>
        <SmoothScroll>
          <Header />
          <main>
            <JsonLd locale={locale} />
            <HeroSection />
            <RiskSection />
            <AboutSection />
            <ServicesSection />
            <ExecutionSection />
            <CapabilitiesSection />
            <SafetySection />
            <ProjectsSection initialProjects={projects} />
            <FinalCTASection />
          </main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </Preloader>
    </SiteSettingsProvider>
  );
}
