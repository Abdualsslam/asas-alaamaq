"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ChevronLeft, ArrowUp } from "lucide-react";
import { navItems } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-equipment-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-earth-brown/5 rounded-full blur-[120px]" />
        {/* Large watermark text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap select-none">
          أساس الأعماق
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & About */}
          <div className="lg:col-span-5">
            <Image
              src="/brand/logo.svg"
              alt="أساس الأعماق للمقاولات"
              width={180}
              height={55}
              className="h-14 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/60 leading-relaxed max-w-sm text-sm mb-8">
              شركة متخصصة في هندسة الأرض واستقرار الحفريات. نقدم حلول سند
              الحفريات، الشوتكريت، الميكروبايل، نزح المياه، والتصريف الهندسي
              وفق أعلى المعايير لضمان أمان واستقرار المشاريع.
            </p>
            {/* Minimal Contact Cards */}
            <div className="flex gap-4">
              <a
                href={contactInfo.whatsapp.getLink()}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-equipment-orange hover:border-equipment-orange hover:text-white transition-all text-white/50"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href={contactInfo.getMailtoLink()}
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
              روابط سريعة
            </h3>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-white/50 hover:text-white group transition-colors duration-300 w-fit"
                  >
                    <ChevronLeft size={14} className="text-equipment-orange/0 group-hover:text-equipment-orange transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="transform group-hover:-translate-x-1 transition-transform">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-equipment-orange rounded-full" />
              تواصل معنا
            </h3>
            <ul className="flex flex-col gap-6">
              {contactInfo.phones.map((phone) => (
                <li key={phone.raw}>
                  <a
                    href={`tel:${phone.raw}`}
                    className="flex items-start gap-4 text-white/60 hover:text-white transition-colors group"
                    dir="ltr"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-equipment-orange group-hover:text-white transition-colors border border-white/5 group-hover:border-equipment-orange text-white/50">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-white/40 mb-1">اتصل بنا</span>
                      <span className="font-medium tracking-wider text-sm">{phone.display}</span>
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
                  <div className="flex flex-col text-right">
                      <span className="text-xs text-white/40 mb-1">البريد الإلكتروني</span>
                      <span className="font-medium tracking-wider text-sm" dir="ltr">{contactInfo.email}</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4 text-white/60">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5 text-white/50">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col text-right mt-1">
                    <span className="text-xs text-white/40 mb-1">الموقع</span>
                    <span className="font-medium text-sm leading-relaxed">
                      {contactInfo.location.city} — {contactInfo.location.country}
                    </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 relative flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} أساس الأعماق للمقاولات. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/40 text-sm">
            صنع بـ <span className="text-equipment-orange font-bold">عُمق</span> من <a href="https://smartagency-ye.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-equipment-orange transition-colors font-medium underline underline-offset-4 decoration-white/10 hover:decoration-equipment-orange/50">وكالة سمارت</a>
          </p>
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase" dir="ltr">
            ASAS AL-AAMAQ Contracting
          </p>

          <button
            onClick={scrollToTop}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-equipment-orange hover:border-equipment-orange transition-all hover:-translate-y-1 z-20 shadow-lg shadow-black/50"
            aria-label="العودة للأعلى"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </Container>
    </footer>
  );
}
