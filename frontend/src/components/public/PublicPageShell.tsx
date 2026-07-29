import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import type { SiteSettingsData } from "@/lib/adapters/site-settings";

export function PublicPageShell({
  settings,
  children,
}: {
  settings: SiteSettingsData;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsProvider settings={settings}>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </SiteSettingsProvider>
  );
}
