"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { navItems } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t, locale, isRTL } = useTranslation();

  const navLabels = [
    t.nav.home,
    t.nav.about,
    t.nav.services,
    t.nav.methodology,
    t.nav.projects,
    t.nav.contact,
  ];

  const Chevron = isRTL ? ChevronLeft : ChevronRight;
  const location = contactInfo.location[locale];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-equipment-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-earth-brown/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap select-none">
          {t.projects.brandWatermark}
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & About */}
          <div className="lg:col-span-5">
            <Image
              src="/brand/logo.svg"
              alt={t.header.brandSub}
              width={180}
              height={55}
              className="h-14 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/60 leading-relaxed max-w-sm text-sm mb-8">
              {t.footer.aboutText}
            </p>
            <div className="flex gap-4">
              <a
                href={contactInfo.whatsapp.getLink(locale)}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-equipment-orange hover:border-equipment-orange hover:text-white transition-all text-white/50"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href={contactInfo.getMailtoLink(locale)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-equipment-orange hover:border-equipment-orange hover:text-white transition-all text-white/50"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-equipment-orange rounded-full" />
              {t.footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-3">
              {navItems.map((item, idx) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-white/50 hover:text-white group transition-colors duration-300 w-fit"
                  >
                    <Chevron size={14} className={cn(
                      "text-equipment-orange/0 group-hover:text-equipment-orange transition-all",
                      isRTL ? "-translate-x-2 group-hover:translate-x-0" : "translate-x-2 group-hover:translate-x-0"
                    )} />
                    <span className={cn(
                      "transform transition-transform",
                      isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                    )}>{navLabels[idx]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-equipment-orange rounded-full" />
              {t.footer.contactUs}
            </h3>
            <ul className="flex flex-col gap-6">
              {contactInfo.phones.map((phone) => (
                <li key={phone.raw}>
                  <a
                    href={`tel:${phone.raw}`}
                    className="flex items-start gap-4 text-white/60 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-equipment-orange group-hover:text-white transition-colors border border-white/5 group-hover:border-equipment-orange text-white/50">
                      <Phone size={18} />
                    </div>
                    <div className={cn("flex flex-col", isRTL ? "text-right" : "text-left")}>
                      <span className="text-xs text-white/40 mb-1">{t.footer.callUs}</span>
                      <span className="font-medium tracking-wider text-sm" dir="ltr">{phone.display}</span>
                    </div>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-4 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-equipment-orange group-hover:text-white transition-colors border border-white/5 group-hover:border-equipment-orange text-white/50">
                    <Mail size={18} />
                  </div>
                  <div className={cn("flex flex-col", isRTL ? "text-right" : "text-left")}>
                      <span className="text-xs text-white/40 mb-1">{t.footer.emailLabel}</span>
                      <span className="font-medium tracking-wider text-sm" dir="ltr">{contactInfo.email}</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4 text-white/60">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5 text-white/50">
                  <MapPin size={18} />
                </div>
                <div className={cn("flex flex-col mt-1", isRTL ? "text-right" : "text-left")}>
                    <span className="text-xs text-white/40 mb-1">{t.footer.locationLabel}</span>
                    <span className="font-medium text-sm leading-relaxed">
                      {location.city} — {location.country}
                    </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 relative flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-white/40 text-sm">
            {t.footer.madeWith} <span className="text-equipment-orange font-bold">{t.footer.depth}</span> {t.footer.from} <a href="https://smartagency-ye.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-equipment-orange transition-colors font-medium underline underline-offset-4 decoration-white/10 hover:decoration-equipment-orange/50">{t.footer.agencyName}</a>
          </p>
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase" dir="ltr">
            ASAS AL-AAMAQ Contracting
          </p>

          <button
            onClick={scrollToTop}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-equipment-orange border border-transparent rounded-full flex items-center justify-center text-white hover:bg-[#c25f24] transition-all hover:-translate-y-1.5 z-20 shadow-lg shadow-equipment-orange/25"
            aria-label={t.footer.scrollToTop}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </Container>
    </footer>
  );
}
