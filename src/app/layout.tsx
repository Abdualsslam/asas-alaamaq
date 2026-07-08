import type { Metadata } from "next";
import "./globals.css";
import "slot-text/style.css";
import { LanguageProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "أساس الأعماق للمقاولات | ASAS AL-AAMAQ",
  description:
    "شركة متخصصة في هندسة الأرض واستقرار الحفريات — سند الحفريات، الشوتكريت، الميكروبايل، نزح المياه، والتصريف الهندسي. الرياض، المملكة العربية السعودية.",
  keywords: [
    "سند حفريات",
    "شوتكريت",
    "ميكروبايل",
    "نزح مياه",
    "مقاولات",
    "هندسة أرضية",
    "استقرار تربة",
    "حفريات عميقة",
    "الرياض",
    "shoring",
    "shotcrete",
    "micropile",
    "dewatering",
    "geotechnical engineering",
    "excavation stability",
  ],
  authors: [{ name: "أساس الأعماق للمقاولات" }],
  openGraph: {
    title: "أساس الأعماق للمقاولات | ASAS AL-AAMAQ",
    description:
      "هندسة متخصصة في التحكم بالتربة والمياه الجوفية واستقرار الحفريات العميقة.",
    locale: "ar_SA",
    alternateLocale: "en_US",
    type: "website",
    siteName: "أساس الأعماق للمقاولات",
  },
  icons: {
    icon: "/brand/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen font-brand">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
