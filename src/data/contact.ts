import type { Locale } from "@/i18n";

const whatsappMessages: Record<Locale, string> = {
  ar: "مرحبًا، أرغب في مناقشة متطلبات مشروعي مع فريق أساس الأعماق.",
  en: "Hello, I would like to discuss my project requirements with the ASAS AL-AAMAQ team.",
};

export const contactInfo = {
  phones: [
    { display: "+966 50 185 0513", raw: "+966501850513" },
    { display: "+966 55 460 1539", raw: "+966554601539" },
  ],
  email: "info@asasalaamaq.com",
  website: "asasalaamaq.com",
  location: {
    ar: { city: "الرياض", country: "المملكة العربية السعودية" },
    en: { city: "Riyadh", country: "Saudi Arabia" },
  },
  whatsapp: {
    number: "+966501850513",
    getLink: (locale: Locale = "ar") => {
      const encoded = encodeURIComponent(whatsappMessages[locale]);
      return `https://wa.me/${contactInfo.whatsapp.number.replace(/\+/g, "")}?text=${encoded}`;
    },
  },
  getMailtoLink: (locale: Locale = "ar") => {
    const subjects: Record<Locale, string> = {
      ar: "استفسار عن خدمات أساس الأعماق",
      en: "Inquiry about ASAS AL-AAMAQ services",
    };
    const subject = encodeURIComponent(subjects[locale]);
    return `mailto:${contactInfo.email}?subject=${subject}`;
  },
};
