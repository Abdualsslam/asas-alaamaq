export const contactInfo = {
  phones: [
    { display: "+966 50 185 0513", raw: "+966501850513" },
    { display: "+966 55 460 1539", raw: "+966554601539" },
  ],
  email: "info@asasalaamaq.com",
  website: "asasalaamaq.com",
  location: {
    city: "الرياض",
    country: "المملكة العربية السعودية",
    en: "Riyadh - Saudi Arabia",
  },
  whatsapp: {
    number: "+966501850513",
    message: "مرحبًا، أرغب في مناقشة متطلبات مشروعي مع فريق أساس الأعماق.",
    getLink: () => {
      const encoded = encodeURIComponent(contactInfo.whatsapp.message);
      return `https://wa.me/${contactInfo.whatsapp.number.replace(/\+/g, "")}?text=${encoded}`;
    },
  },
  getMailtoLink: () => {
    const subject = encodeURIComponent("استفسار عن خدمات أساس الأعماق");
    return `mailto:${contactInfo.email}?subject=${subject}`;
  },
};
