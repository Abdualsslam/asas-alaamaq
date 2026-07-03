"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { navItems } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-sand-light/85 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        {/* Top scrim for legibility over the video */}
        {!isScrolled && (
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/15 to-transparent" />
        )}

        <Container>
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#hero" className="flex-shrink-0" aria-label="أساس الأعماق للمقاولات">
              <Image
                src="/brand/logo.svg"
                alt="أساس الأعماق للمقاولات"
                width={160}
                height={50}
                className={cn(
                  "h-10 md:h-12 w-auto transition-[filter] duration-300",
                  !isScrolled && "[filter:brightness(0)_invert(1)]"
                )}
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative px-4 py-2 text-sm font-medium"
                  >
                    <span
                      className={cn(
                        "transition-colors duration-200",
                        isScrolled
                          ? "text-charcoal/80 group-hover:text-earth-brown"
                          : "text-white/85 group-hover:text-white"
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-0.5 origin-right scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100",
                        isScrolled ? "bg-earth-brown" : "bg-equipment-orange"
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className={cn(
                "hidden lg:inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300",
                isScrolled
                  ? "bg-earth-brown text-white hover:bg-earth-brown-dark hover:shadow-lg hover:shadow-earth-brown/20 hover:-translate-y-0.5"
                  : "border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-charcoal"
              )}
            >
              تواصل معنا
              <ArrowLeft size={16} />
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
              <Menu size={26} />
            </button>
          </nav>
        </Container>
      </header>

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
              <div className="flex items-center justify-between border-b border-border p-6">
                <Image
                  src="/brand/logo.svg"
                  alt="أساس الأعماق"
                  width={130}
                  height={40}
                  className="h-9 w-auto"
                />
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
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-earth-brown px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-earth-brown-dark"
                >
                  <MessageCircle size={18} />
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
