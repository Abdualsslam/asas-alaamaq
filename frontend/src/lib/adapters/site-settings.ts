import { contactInfo } from "@/data/contact";
import type { Locale } from "@/i18n";
import type { SettingsRecord, StatSetting } from "@/lib/api/types";

export interface SiteSettingsData {
  phones: Array<{ display: string; raw: string }>;
  whatsappNumber: string;
  email: string;
  website: string;
  location: {
    ar: { city: string; country: string };
    en: { city: string; country: string };
  };
  social: SettingsRecord["social"];
  companyProfileUrl?: string;
  stats: StatSetting[];
}

export const fallbackSiteSettings: SiteSettingsData = {
  phones: contactInfo.phones.map((phone) => ({ ...phone })),
  whatsappNumber: contactInfo.whatsapp.number,
  email: contactInfo.email,
  website: contactInfo.website,
  location: {
    ar: { ...contactInfo.location.ar },
    en: { ...contactInfo.location.en },
  },
  social: {},
  stats: [],
};

export function adaptSiteSettings(
  settings: SettingsRecord | null | undefined,
): SiteSettingsData {
  if (!settings) return fallbackSiteSettings;
  const profile =
    settings.companyProfileMediaId &&
    typeof settings.companyProfileMediaId !== "string"
      ? settings.companyProfileMediaId.publicUrl
      : undefined;
  return {
    phones: settings.phones.length ? settings.phones : fallbackSiteSettings.phones,
    whatsappNumber:
      settings.whatsappNumber || fallbackSiteSettings.whatsappNumber,
    email: settings.email || fallbackSiteSettings.email,
    website: settings.website || fallbackSiteSettings.website,
    location: settings.location || fallbackSiteSettings.location,
    social: settings.social ?? {},
    companyProfileUrl: profile,
    stats: [...(settings.stats ?? [])].sort(
      (left, right) => left.sortOrder - right.sortOrder,
    ),
  };
}

const whatsappMessages: Record<Locale, string> = {
  ar: "مرحبًا، أرغب في مناقشة متطلبات مشروعي مع فريق أساس الأعماق.",
  en: "Hello, I would like to discuss my project requirements with the ASAS AL-AAMAQ team.",
};

const mailSubjects: Record<Locale, string> = {
  ar: "استفسار عن خدمات أساس الأعماق",
  en: "Inquiry about ASAS AL-AAMAQ services",
};

export function createContactInfo(settings: SiteSettingsData) {
  return {
    phones: settings.phones,
    email: settings.email,
    website: settings.website,
    location: settings.location,
    whatsapp: {
      number: settings.whatsappNumber,
      getLink(locale: Locale = "ar") {
        const number = settings.whatsappNumber.replace(/\+/g, "");
        return `https://wa.me/${number}?text=${encodeURIComponent(
          whatsappMessages[locale],
        )}`;
      },
    },
    getMailtoLink(locale: Locale = "ar") {
      return `mailto:${settings.email}?subject=${encodeURIComponent(
        mailSubjects[locale],
      )}`;
    },
  };
}

export function findSettingStat(
  settings: SiteSettingsData,
  key: string,
): StatSetting | undefined {
  return settings.stats.find((stat) => stat.key === key);
}
