"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-sand-light"
    >
      {/* Soil Layers Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal geological lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <line x1="0" y1="150" x2="1440" y2="180" stroke="#934E34" strokeWidth="1" />
          <line x1="0" y1="250" x2="1440" y2="270" stroke="#D8C1A8" strokeWidth="1.5" />
          <line x1="0" y1="380" x2="1440" y2="400" stroke="#6E6A64" strokeWidth="1" />
          <line x1="0" y1="500" x2="1440" y2="510" stroke="#934E34" strokeWidth="2" />
          <line x1="0" y1="620" x2="1440" y2="640" stroke="#D8C1A8" strokeWidth="1" />
          <line x1="0" y1="750" x2="1440" y2="740" stroke="#6E6A64" strokeWidth="1.5" />
        </svg>

        {/* Gradient overlay from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sand-light to-transparent" />

        {/* Subtle diagonal engineering lines */}
        <div className="absolute top-20 left-0 w-full h-full opacity-[0.03]">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
            <line x1="0" y1="0" x2="600" y2="900" stroke="#934E34" strokeWidth="1" />
            <line x1="400" y1="0" x2="1000" y2="900" stroke="#934E34" strokeWidth="1" />
            <line x1="800" y1="0" x2="1440" y2="900" stroke="#934E34" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            {/* Engineering badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-earth-brown/10 border border-earth-brown/20 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-earth-brown rounded-full animate-pulse" />
              <span className="text-earth-brown text-sm font-medium">
                هندسة أرضية متخصصة
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-charcoal font-black leading-[1.2] mb-6"
            >
              الحفر ليس مجرد
              <br />
              <span className="text-earth-brown">أعمال حفر</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg md:text-xl text-charcoal/80 font-medium mb-4 leading-relaxed"
            >
              بل هندسة للتحكم بالتربة، المياه الجوفية، والمخاطر قبل أن تؤثر
              على المشروع.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-concrete-gray leading-relaxed mb-10 max-w-lg"
            >
              في أساس الأعماق، ننفذ حلول سند الحفريات، الشوتكريت، الميكروبايل،
              نزح المياه، والتصريف الهندسي وفق منهجية دقيقة تضمن الاستقرار
              والسلامة في ظروف الموقع الحقيقية.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <Button href="#contact" size="lg" icon={ArrowLeft} iconPosition="end">
                ناقش مشروعك معنا
              </Button>
              <Button href="#services" variant="secondary" size="lg">
                استعرض خدماتنا
              </Button>
            </motion.div>
          </div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-earth-brown/10 via-sand-secondary/30 to-earth-brown/5 border border-border">
              {/* Abstract soil layers illustration */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
              >
                {/* Topsoil */}
                <path
                  d="M0 100 Q100 80 200 110 Q300 90 400 100 L400 180 Q300 170 200 190 Q100 175 0 185 Z"
                  fill="#D8C1A8"
                  opacity="0.3"
                />
                {/* Clay layer */}
                <path
                  d="M0 185 Q100 175 200 190 Q300 170 400 180 L400 260 Q300 250 200 275 Q100 255 0 265 Z"
                  fill="#934E34"
                  opacity="0.2"
                />
                {/* Rock layer */}
                <path
                  d="M0 265 Q100 255 200 275 Q300 250 400 260 L400 350 Q300 340 200 360 Q100 345 0 355 Z"
                  fill="#6E6A64"
                  opacity="0.15"
                />
                {/* Deep soil */}
                <path
                  d="M0 355 Q100 345 200 360 Q300 340 400 350 L400 500 L0 500 Z"
                  fill="#1F1F1F"
                  opacity="0.1"
                />

                {/* Shoring support lines */}
                <line x1="120" y1="60" x2="120" y2="420" stroke="#934E34" strokeWidth="3" opacity="0.3" strokeDasharray="8,4" />
                <line x1="280" y1="60" x2="280" y2="420" stroke="#934E34" strokeWidth="3" opacity="0.3" strokeDasharray="8,4" />

                {/* Horizontal struts */}
                <line x1="120" y1="160" x2="280" y2="160" stroke="#D96B2B" strokeWidth="2" opacity="0.4" />
                <line x1="120" y1="250" x2="280" y2="250" stroke="#D96B2B" strokeWidth="2" opacity="0.4" />
                <line x1="120" y1="340" x2="280" y2="340" stroke="#D96B2B" strokeWidth="2" opacity="0.4" />

                {/* Water droplets */}
                <circle cx="180" cy="300" r="3" fill="#4A90D9" opacity="0.3" />
                <circle cx="220" cy="320" r="2" fill="#4A90D9" opacity="0.25" />
                <circle cx="200" cy="380" r="3" fill="#4A90D9" opacity="0.2" />
              </svg>

              {/* Depth markers */}
              <div className="absolute right-4 top-1/4 flex flex-col items-center gap-8 text-concrete-gray/40 text-xs font-medium">
                <span>-3م</span>
                <span>-6م</span>
                <span>-9م</span>
                <span>-12م</span>
              </div>

              {/* Brand icon watermark */}
              <div className="absolute bottom-6 left-6 opacity-10">
                <svg width="60" height="60" viewBox="0 0 148.55 228.89">
                  <polygon fill="#934E34" points="148.55 0 148.55 24.34 134.38 32.7 134.38 7.99 148.55 0" />
                  <polygon fill="#934E34" points="14.16 141.33 14.16 214.72 35.23 214.72 35.23 204.54 49.4 196.55 49.4 214.72 70.82 214.72 70.82 184.2 84.99 175.84 84.99 214.72 106.06 214.72 106.06 163.85 120.22 155.5 120.22 228.89 0 228.89 0 85.74 14.16 77.39 14.16 127.16 35.23 127.16 35.23 65.4 49.4 57.04 49.4 127.16 70.82 127.16 70.82 45.05 84.99 36.7 84.99 127.16 106.06 127.16 106.06 24.34 120.22 16.35 120.22 141.33 14.16 141.33" />
                  <polygon fill="#934E34" points="148.55 40.69 148.55 228.89 134.38 228.89 134.38 49.05 148.55 40.69" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-concrete-gray/50 text-xs">اكتشف المزيد</span>
          <ArrowDown size={18} className="text-earth-brown animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
}
