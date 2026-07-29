"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { ar, type Translations } from "./translations/ar";
import { en } from "./translations/en";

export type Locale = "ar" | "en";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const translations: Record<Locale, Translations> = { ar, en };

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    const segments = pathname.split("/");
    if (segments[1] === "ar" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    router.push(segments.join("/") || "/");
  };

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  const value: LanguageContextType = {
    locale,
    t: translations[locale] || translations["ar"],
    toggleLocale,
    setLocale,
    isRTL: locale === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
