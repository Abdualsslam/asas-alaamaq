import { seoConfig } from "@/config/seo";

export function JsonLd({ locale }: { locale: string }) {
  const isArabic = locale === "ar";
  
  const companyName = isArabic ? seoConfig.siteName.ar : seoConfig.siteName.en;
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${seoConfig.domain}/#organization`,
        name: companyName,
        url: seoConfig.domain,
        logo: {
          "@type": "ImageObject",
          url: `${seoConfig.domain}${seoConfig.logo}`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: seoConfig.phone,
          email: seoConfig.email,
          contactType: "customer service",
          areaServed: ["SA", "Riyadh"],
          availableLanguage: ["Arabic", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${seoConfig.domain}/#website`,
        url: seoConfig.domain,
        name: companyName,
        publisher: {
          "@id": `${seoConfig.domain}/#organization`,
        },
        inLanguage: ["ar", "en"],
      },
      {
        "@type": "WebPage",
        "@id": `${seoConfig.domain}/${locale}/#webpage`,
        url: `${seoConfig.domain}/${locale}`,
        name: isArabic ? "أساس الأعماق للمقاولات | الرئيسية" : "ASAS AL-AAMAQ | Home",
        isPartOf: {
          "@id": `${seoConfig.domain}/#website`,
        },
        about: {
          "@id": `${seoConfig.domain}/#organization`,
        },
      },
      {
        "@type": "Service",
        "@id": `${seoConfig.domain}/#services`,
        name: isArabic ? "خدمات المقاولات وهندسة الأرض" : "Contracting and Ground Engineering Services",
        provider: {
          "@id": `${seoConfig.domain}/#organization`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isArabic ? "خدمات أساس الأعماق" : "ASAS AL-AAMAQ Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isArabic ? "سند الحفريات" : "Excavation Shoring"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isArabic ? "الشوتكريت (الخرسانة المقذوفة)" : "Shotcrete"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isArabic ? "الميكروبايل (الخوازيق الدقيقة)" : "Micropile"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isArabic ? "نزح المياه" : "Dewatering"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: isArabic ? "التصريف تحت السطحي" : "Subsurface Drainage"
              }
            }
          ]
        }
      }
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
