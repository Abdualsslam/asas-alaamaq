"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Menu, X, Phone, ArrowLeft } from "lucide-react";
import { navItems } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: "0%",
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const reduceMotion = useReducedMotion();
  const headerRevealDelay = reduceMotion ? 0 : 3;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section crossing the viewport's
  // middle band, so the active link keeps its orange underline.
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
          {/* Logo — Right side */}
          <a
            href="#hero"
            className="flex items-center gap-3 md:gap-3.5 flex-shrink-0"
            aria-label="أساس الأعماق للمقاولات"
          >
            <div
              className={cn(
                "h-8 md:h-9 w-auto transition-[filter] duration-300 flex items-center justify-center",
                !isScrolled && "[filter:brightness(0)_invert(1)]"
              )}
            >
              <Image
                src="/brand/icon.svg"
                alt="أساس الأعماق للمقاولات"
                width={30}
                height={30}
                className="h-full w-auto"
                priority
              />
            </div>
            <div className="flex flex-col text-right">
              <span
                className={cn(
                  "text-[14px] md:text-[16px] font-bold tracking-wider leading-tight transition-colors duration-300",
                  isScrolled ? "text-charcoal" : "text-white"
                )}
              >
                ASAS AL-AAMAQ
              </span>
              <span
                className={cn(
                  "text-[9px] md:text-[10px] font-medium leading-none mt-0.5 transition-colors duration-300",
                  isScrolled ? "text-charcoal/70" : "text-white/70"
                )}
              >
                أساس الأعماق للمقاولات
              </span>
            </div>
          </a>

          {/* Desktop Navigation — Center */}
          <ul className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navItems.map((item) => {
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
                      {item.label}
                    </span>

                    {/* Hover Line */}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-[2px] h-[2px] origin-center rounded-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                        isScrolled ? "bg-earth-brown/30" : "bg-white/20"
                      )}
                    />

                    {/* Active Indicator (Accent Line + Dot below) */}
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

          {/* Desktop CTA — Left side */}
          <a
            href="#contact"
            className="group hidden lg:inline-flex items-center gap-3 rounded-full bg-equipment-orange py-1.5 pr-6 pl-2 text-sm font-semibold text-white! shadow-lg shadow-equipment-orange/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c25f24] hover:shadow-xl hover:shadow-equipment-orange/40"
          >
            تواصل معنا
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-12">
              <Phone size={14} />
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              isScrolled ? "text-charcoal" : "text-white"
            )}
            aria-label="فتح القائمة"
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
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col bg-sand-light shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-border p-5">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/brand/icon.svg"
                    alt="أساس الأعماق للمقاولات"
                    width={26}
                    height={26}
                    className="h-[26px] w-auto"
                  />
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold tracking-wider leading-tight text-charcoal">
                      ASAS AL-AAMAQ
                    </span>
                    <span className="text-[9px] font-medium leading-none mt-0.5 text-charcoal/70">
                      أساس الأعماق للمقاولات
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-charcoal transition-colors hover:text-earth-brown"
                  aria-label="إغلاق القائمة"
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
                  {navItems.map((item) => (
                    <motion.li key={item.href} variants={itemVariants}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-charcoal transition-colors hover:bg-earth-brown/5 hover:text-earth-brown"
                      >
                        {item.label}
                        <ArrowLeft size={16} className="text-earth-brown/40" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
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
                  href={contactInfo.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A] shadow-md shadow-[#25D366]/10"
                >
                  <WhatsAppIcon size={18} />
                  تواصل معنا عبر واتساب
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
