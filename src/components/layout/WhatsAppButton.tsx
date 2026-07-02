"use client";

import { MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/contact";

export function WhatsAppButton() {
  return (
    <a
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
    </a>
  );
}
