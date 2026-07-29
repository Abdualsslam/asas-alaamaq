import { sendGTMEvent } from '@next/third-parties/google';

export const trackEvent = (
  eventName: string,
  data?: Record<string, string | number | boolean | undefined>,
) => {
  if (typeof window !== 'undefined') {
    sendGTMEvent({ event: eventName, ...data });
  }
};

export const trackWhatsAppClick = (location: string, locale: string) => {
  trackEvent('whatsapp_click', { location, locale });
};

export const trackPhoneClick = (location: string, locale: string) => {
  trackEvent('phone_click', { location, locale });
};

export const trackEmailClick = (location: string, locale: string) => {
  trackEvent('email_click', { location, locale });
};

export const trackContactCtaClick = (location: string, locale: string) => {
  trackEvent('contact_cta_click', { location, locale });
};

export const trackServiceView = (serviceName: string, locale: string) => {
  trackEvent('service_view', { service: serviceName, locale });
};

export const trackProjectView = (projectName: string, locale: string) => {
  trackEvent('project_view', { project: projectName, locale });
};

export const trackLanguageSwitch = (targetLocale: string, currentLocation: string) => {
  trackEvent('language_switch', { target_locale: targetLocale, location: currentLocation });
};
