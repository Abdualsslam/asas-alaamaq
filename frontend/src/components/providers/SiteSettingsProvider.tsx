"use client";

import { createContext, useContext, useMemo } from "react";
import {
  createContactInfo,
  fallbackSiteSettings,
  type SiteSettingsData,
} from "@/lib/adapters/site-settings";

interface SiteSettingsContextValue {
  settings: SiteSettingsData;
  contactInfo: ReturnType<typeof createContactInfo>;
}

const fallbackValue: SiteSettingsContextValue = {
  settings: fallbackSiteSettings,
  contactInfo: createContactInfo(fallbackSiteSettings),
};

const SiteSettingsContext =
  createContext<SiteSettingsContextValue>(fallbackValue);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettingsData;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ settings, contactInfo: createContactInfo(settings) }),
    [settings],
  );
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
