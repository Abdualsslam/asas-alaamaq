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
  { label: "تواصل معنا", href: "#contact" },
];
