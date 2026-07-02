import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { navItems } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Image
              src="/brand/logo.svg"
              alt="أساس الأعماق للمقاولات"
              width={180}
              height={55}
              className="h-12 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/60 leading-relaxed max-w-md text-sm">
              شركة متخصصة في هندسة الأرض واستقرار الحفريات. نقدم حلول سند
              الحفريات، الشوتكريت، الميكروبايل، نزح المياه، والتصريف الهندسي
              وفق أعلى المعايير.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">روابط سريعة</h3>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/50 hover:text-earth-brown-light text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-6">تواصل معنا</h3>
            <ul className="flex flex-col gap-4">
              {contactInfo.phones.map((phone) => (
                <li key={phone.raw}>
                  <a
                    href={`tel:${phone.raw}`}
                    className="flex items-center gap-3 text-white/50 hover:text-earth-brown-light text-sm transition-colors group"
                    dir="ltr"
                  >
                    <Phone
                      size={16}
                      className="flex-shrink-0 text-earth-brown group-hover:text-earth-brown-light"
                    />
                    <span>{phone.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-white/50 hover:text-earth-brown-light text-sm transition-colors group"
                >
                  <Mail
                    size={16}
                    className="flex-shrink-0 text-earth-brown group-hover:text-earth-brown-light"
                  />
                  <span dir="ltr">{contactInfo.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin
                  size={16}
                  className="flex-shrink-0 text-earth-brown"
                />
                <span>
                  {contactInfo.location.city} — {contactInfo.location.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} أساس الأعماق للمقاولات. جميع الحقوق
              محفوظة.
            </p>
            <p className="text-white/20 text-xs" dir="ltr">
              ASAS AL-AAMAQ Contracting
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
