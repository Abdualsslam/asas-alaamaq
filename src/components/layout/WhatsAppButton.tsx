"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo } from "@/data/contact";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after hero animation (approx 3.2s) or if scrolled
    const timer = setTimeout(() => setIsVisible(true), 3200);
    const handleScroll = () => {
      if (window.scrollY > 100) setIsVisible(true);
    };
    
    // Check initial scroll position
    if (window.scrollY > 100) setIsVisible(true);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          href={contactInfo.whatsapp.getLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 group"
          aria-label="تواصل عبر واتساب"
        >
          <MessageCircle
            size={26}
            className="group-hover:rotate-12 transition-transform duration-300"
          />

          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
