"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Menu, X, Phone, ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { navItems } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useTranslation } from "@/i18n";

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: "0%",
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const panelVariantsLTR: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: "0%",
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: { x: "-100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

const itemVariantsLTR: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const reduceMotion = useReducedMotion();
  const headerRevealDelay = reduceMotion ? 0 : 3;
  const { t, locale, toggleLocale, isRTL } = useTranslation();

  const navLabels = [
    t.nav.home,
    t.nav.about,
    t.nav.services,
    t.nav.methodology,
    t.nav.projects,
    t.nav.contact,
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: headerRevealDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed top-5 md:top-6 right-0 left-0 z-50 px-4 md:px-6 lg:px-8"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1280px] items-center justify-between rounded-full px-6 md:px-8 py-3 transition-all duration-500 border",
            isScrolled
              ? "border-border/60 bg-sand-light/95 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border-white/15 bg-charcoal/25 shadow-lg shadow-white/5 backdrop-blur-xl"
          )}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 md:gap-3.5 flex-shrink-0"
            aria-label={t.header.brandSub}
          >
            <div
              className={cn(
                "h-8 md:h-9 w-auto transition-[filter] duration-300 flex items-center justify-center",
                !isScrolled && "[filter:brightness(0)_invert(1)]"
              )}
            >
              <Image
                src="/brand/icon.svg"
                alt={t.header.brandSub}
                width={30}
                height={30}
                className="h-full w-auto"
                priority
              />
            </div>
            <div className={cn("flex flex-col", isRTL ? "text-right" : "text-left")}>
              <span
                className={cn(
                  "text-[14px] md:text-[16px] font-bold tracking-wider leading-tight transition-colors duration-300",
                  isScrolled ? "text-charcoal" : "text-white"
                )}
              >
                {t.header.brandName}
              </span>
              <span
                className={cn(
                  "text-[9px] md:text-[10px] font-medium leading-none mt-0.5 transition-colors duration-300",
                  isScrolled ? "text-charcoal/70" : "text-white/70"
                )}
              >
                {t.header.brandSub}
              </span>
            </div>
          </a>

          {/* Desktop Navigation — Center */}
          <ul className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navItems.map((item, idx) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative px-4 py-2.5 text-[14px] block transition-colors"
                  >
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        isScrolled
                          ? isActive
                            ? "font-semibold text-earth-brown"
                            : "font-medium text-charcoal/70 group-hover:text-earth-brown"
                          : isActive
                            ? "font-semibold text-white"
                            : "font-medium text-white/75 group-hover:text-white"
                      )}
                    >
                      {navLabels[idx]}
                    </span>

                    {/* Hover Line */}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-[2px] h-[2px] origin-center rounded-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                        isScrolled ? "bg-earth-brown/30" : "bg-white/20"
                      )}
                    />

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      >
                        <div
                          className={cn(
                            "h-[2px] w-6 rounded-full transition-colors duration-300",
                            isScrolled ? "bg-earth-brown" : "bg-equipment-orange"
                          )}
                        />
                        <div
                          className={cn(
                            "h-1.5 w-1.5 rounded-full mt-0.5 transition-colors duration-300",
                            isScrolled ? "bg-earth-brown" : "bg-equipment-orange"
                          )}
                        />
                      </motion.div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop: Language Switch + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold transition-all duration-300 border cursor-pointer",
                isScrolled
                  ? "border-earth-brown/20 text-earth-brown hover:bg-earth-brown/10"
                  : "border-white/20 text-white/80 hover:bg-white/10"
              )}
              aria-label={locale === "ar" ? "Switch to English" : "التبديل للعربية"}
            >
              <Globe size={14} />
              <span>{t.header.langSwitch}</span>
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-equipment-orange py-1.5 text-sm font-semibold text-white! shadow-lg shadow-equipment-orange/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c25f24] hover:shadow-xl hover:shadow-equipment-orange/40"
              style={{ paddingInlineStart: "1.5rem", paddingInlineEnd: "0.5rem" }}
            >
              {t.header.contactCta}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-12">
                <Phone size={14} />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              isScrolled ? "text-charcoal" : "text-white"
            )}
            aria-label={t.header.openMenu}
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              variants={isRTL ? panelVariants : panelVariantsLTR}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute top-0 flex h-full w-[85%] max-w-sm flex-col bg-sand-light shadow-2xl",
                isRTL ? "right-0" : "left-0"
              )}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-border p-5">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/brand/icon.svg"
                    alt={t.header.brandSub}
                    width={26}
                    height={26}
                    className="h-[26px] w-auto"
                  />
                  <div className={cn("flex flex-col", isRTL ? "text-right" : "text-left")}>
                    <span className="text-sm font-bold tracking-wider leading-tight text-charcoal">
                      {t.header.brandName}
                    </span>
                    <span className="text-[9px] font-medium leading-none mt-0.5 text-charcoal/70">
                      {t.header.brandSub}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-charcoal transition-colors hover:text-earth-brown"
                  aria-label={t.header.closeMenu}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav items */}
              <motion.nav
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto px-4 py-6"
              >
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, idx) => (
                    <motion.li key={item.href} variants={isRTL ? itemVariants : itemVariantsLTR}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-charcoal transition-colors hover:bg-earth-brown/5 hover:text-earth-brown"
                      >
                        {navLabels[idx]}
                        <ArrowIcon size={16} className="text-earth-brown/40" />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile Language Toggle */}
                <div className="mt-4 px-4">
                  <button
                    onClick={() => {
                      toggleLocale();
                      closeMenu();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-earth-brown/20 bg-earth-brown/5 px-4 py-3 text-sm font-bold text-earth-brown transition-colors hover:bg-earth-brown/10 cursor-pointer"
                  >
                    <Globe size={16} />
                    <span>{locale === "ar" ? "Switch to English" : "التبديل للعربية"}</span>
                  </button>
                </div>
              </motion.nav>

              {/* Contact + CTA */}
              <div className="space-y-4 border-t border-border p-6">
                <a
                  href={`tel:${contactInfo.phones[0].raw}`}
                  className="flex items-center gap-3 text-sm text-concrete-gray transition-colors hover:text-earth-brown"
                >
                  <Phone size={16} className="text-earth-brown" />
                  <span dir="ltr">{contactInfo.phones[0].display}</span>
                </a>
                <a
                  href={contactInfo.whatsapp.getLink(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A] shadow-md shadow-[#25D366]/10"
                >
                  <WhatsAppIcon size={18} />
                  {t.header.whatsappCta}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
