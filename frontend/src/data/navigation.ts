export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "الرئيسية", href: "#hero" },
  { label: "من نحن", href: "#about" },
  { label: "خدماتنا", href: "#services" },
  { label: "منهجيتنا", href: "#execution" },
  { label: "أعمالنا", href: "#projects" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل معنا", href: "#contact" },
];

export function resolveNavHref(
  href: string,
  locale: string,
  pathname: string,
): string {
  if (!href.startsWith("#")) return `/${locale}${href}`;
  const isLanding = pathname === `/${locale}` || pathname === `/${locale}/`;
  return isLanding ? href : `/${locale}${href}`;
}
