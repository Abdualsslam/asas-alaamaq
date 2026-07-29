import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "slot-text/style.css";
import { LanguageProvider, type Locale } from "@/i18n";
import { GoogleTagManager } from '@next/third-parties/google';

const dinNext = localFont({
  src: [
    { path: "../../../public/fonts/DINNextLTArabic-Light.ttf", weight: "300", style: "normal" },
    { path: "../../../public/fonts/DINNextLTArabic-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/DINNextLTArabic-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../../public/fonts/DINNextLTArabic-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../../public/fonts/DINNextLTArabic-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-din-next",
  display: "swap",
});

import { seoConfig } from "@/config/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const isArabic = locale === "ar";

  const title = isArabic
    ? "أساس الأعماق للمقاولات | حلول سند الحفريات والهندسة الأرضية"
    : "ASAS AL-AAMAQ Contracting | Shoring & Geotechnical Solutions";

  const description = isArabic
    ? "شركة متخصصة في هندسة الأرض واستقرار الحفريات — سند الحفريات، الشوتكريت، الميكروبايل، نزح المياه، والتصريف الهندسي. الرياض، المملكة العربية السعودية."
    : "Specialized company in ground engineering and excavation stability — Shoring, Shotcrete, Micropile, Dewatering, and Engineering Drainage. Riyadh, Saudi Arabia.";

  const siteName = isArabic ? seoConfig.siteName.ar : seoConfig.siteName.en;
  const currentUrl = `${seoConfig.domain}/${locale}`;

  return {
    metadataBase: new URL(seoConfig.domain),
    title: title,
    description: description,
    keywords: [
      "سند حفريات", "شوتكريت", "ميكروبايل", "نزح مياه", "مقاولات",
      "هندسة أرضية", "استقرار تربة", "حفريات عميقة", "الرياض",
      "shoring", "shotcrete", "micropile", "dewatering",
      "geotechnical engineering", "excavation stability",
    ],
    authors: [{ name: seoConfig.companyName }],
    alternates: {
      canonical: currentUrl,
      languages: {
        'ar': `${seoConfig.domain}/ar`,
        'en': `${seoConfig.domain}/en`,
        'x-default': `${seoConfig.domain}/${seoConfig.defaultLocale}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: currentUrl,
      siteName: siteName,
      locale: isArabic ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: seoConfig.socialImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [seoConfig.socialImage],
    },
    icons: {
      icon: seoConfig.logo,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`antialiased ${dinNext.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
      </head>
      <body className="min-h-screen font-brand">
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <LanguageProvider locale={locale as Locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
