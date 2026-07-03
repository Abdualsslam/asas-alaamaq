"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function AboutSection() {
  return (
    <section id="about" className="section-padding scroll-mt-28 bg-sand-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <MotionReveal>
              <SectionHeader
                title="متخصصون في هندسة الأرض واستقرار الحفريات"
              />
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="text-concrete-gray leading-relaxed mb-8 text-base">
                أساس الأعماق للمقاولات جهة متخصصة في حلول الهندسة الأرضية،
                نركز على استقرار الحفريات والتحكم بحركة التربة وإدارة المياه
                الجوفية أثناء مراحل الحفر الحرجة.
              </p>
            </MotionReveal>

            {/* Positioning quote */}
            <MotionReveal delay={0.25}>
              <blockquote className="relative border-r-4 border-earth-brown pr-6 py-4 bg-earth-brown/5 rounded-l-lg">
                <p className="text-charcoal font-bold text-lg leading-relaxed">
                  لسنا مقاول حفر تقليدي.
                  <br />
                  <span className="text-earth-brown">
                    نحن شريك هندسي للمواقع التي لا تقبل الفشل.
                  </span>
                </p>
              </blockquote>
            </MotionReveal>

            {/* Stats */}
            <MotionReveal delay={0.35}>
              <div className="flex gap-8 mt-10">
                <div className="text-center">
                  <span className="block text-3xl font-black text-earth-brown">٥+</span>
                  <span className="text-concrete-gray text-sm mt-1 block">خدمات متخصصة</span>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <span className="block text-3xl font-black text-earth-brown">٢٤/٧</span>
                  <span className="text-concrete-gray text-sm mt-1 block">جاهزية ميدانية</span>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <span className="block text-3xl font-black text-earth-brown">١٠٠٪</span>
                  <span className="text-concrete-gray text-sm mt-1 block">التزام هندسي</span>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Visual Side */}
          <MotionReveal direction="left" delay={0.2}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-earth-brown/8 via-sand-secondary/20 to-concrete-gray/10 border border-border">
              {/* Abstract engineering diagram */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
              >
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#934E34" strokeWidth="0.5" opacity="0.08" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />

                {/* Cross-section illustration */}
                <rect x="80" y="60" width="240" height="280" fill="none" stroke="#934E34" strokeWidth="1.5" opacity="0.2" strokeDasharray="6,3" />

                {/* Ground level */}
                <line x1="40" y1="120" x2="360" y2="120" stroke="#D8C1A8" strokeWidth="2" opacity="0.4" />

                {/* Excavation outline */}
                <path d="M 140 120 L 140 300 L 260 300 L 260 120" fill="#F4F0EA" fillOpacity="0.5" stroke="#934E34" strokeWidth="1.5" opacity="0.4" />

                {/* Support walls */}
                <rect x="130" y="120" width="8" height="180" fill="#934E34" opacity="0.25" rx="2" />
                <rect x="262" y="120" width="8" height="180" fill="#934E34" opacity="0.25" rx="2" />

                {/* Struts */}
                <line x1="138" y1="180" x2="262" y2="180" stroke="#D96B2B" strokeWidth="2" opacity="0.35" />
                <line x1="138" y1="240" x2="262" y2="240" stroke="#D96B2B" strokeWidth="2" opacity="0.35" />

                {/* Depth annotations */}
                <text x="310" y="150" fontSize="10" fill="#6E6A64" opacity="0.5" fontFamily="sans-serif">-3m</text>
                <text x="310" y="210" fontSize="10" fill="#6E6A64" opacity="0.5" fontFamily="sans-serif">-6m</text>
                <text x="310" y="270" fontSize="10" fill="#6E6A64" opacity="0.5" fontFamily="sans-serif">-9m</text>
              </svg>

              {/* TODO: استبدل هذا بصورة فعلية للشركة لاحقًا */}
              <div className="absolute bottom-6 right-6 bg-earth-brown/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                مقطع هندسي — سند حفريات
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
