import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const dinNext = localFont({
  src: [
    { path: "../../../public/fonts/DINNextLTArabic-Light.ttf", weight: "300" },
    { path: "../../../public/fonts/DINNextLTArabic-Regular.ttf", weight: "400" },
    { path: "../../../public/fonts/DINNextLTArabic-Medium.ttf", weight: "500" },
    { path: "../../../public/fonts/DINNextLTArabic-Bold.ttf", weight: "700" },
    { path: "../../../public/fonts/DINNextLTArabic-Black.ttf", weight: "900" },
  ],
  variable: "--font-din-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: "إدارة المحتوى | أساس الأعماق",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={dinNext.variable}>
      <body className="min-h-screen bg-[#f5f2ed] font-brand text-charcoal">
        {children}
      </body>
    </html>
  );
}
