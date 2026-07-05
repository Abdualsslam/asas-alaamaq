"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ShieldCheck, SlidersHorizontal, Search, ShieldHalf } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section-padding scroll-mt-28 bg-sand-light relative overflow-hidden">
      
      {/* Background Subtle Engineering Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none text-earth-brown">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="engineering-grid-about" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#engineering-grid-about)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-12 lg:gap-x-16 items-start">
          
          {/* Text Content (Right column, Row 1) */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 flex flex-col pt-4">
            
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-earth-brown/30 bg-white/50 backdrop-blur-sm mb-6 w-fit">
                <span className="text-sm font-bold text-charcoal">من نحن</span>
                <ShieldHalf className="w-4 h-4 text-earth-brown" />
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="text-3xl lg:text-[2.75rem] font-black text-charcoal mb-6 leading-[1.2]">
                متخصصون في هندسة الأرض<br />
                واستقرار الحفريات
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="text-concrete-gray leading-relaxed mb-8 text-lg font-medium">
                أساس الأعماق للمقاولات جهة متخصصة في حلول الهندسة الأرضية،
                نركز على استقرار الحفريات، التحكم بحركة التربة، وإدارة المياه
                الجوفية أثناء مراحل الحفر الحرجة.
              </p>
            </MotionReveal>

            {/* Positioning quote */}
            <MotionReveal delay={0.25}>
              <div className="relative border-r-4 border-earth-brown pr-6 py-6 bg-sand-secondary/30 rounded-l-xl mb-6">
                <p className="text-charcoal font-bold text-xl leading-relaxed">
                  لسنا مقاول حفر تقليدي.
                  <br />
                  <span className="text-earth-brown">
                    نحن شريك هندسي للمواقع التي لا تقبل الفشل.
                  </span>
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* Visual Side (Left column, spans Row 1 & 2) */}
          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full flex items-center justify-center">
            <MotionReveal direction="left" delay={0.2} className="w-full">
              {/* Luxurious Card Wrapper */}
              <div className="relative w-full rounded-[2rem] shadow-xl border border-earth-brown/10 bg-white/40 p-2 lg:p-4 backdrop-blur-sm">
                <div className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden bg-sand-light">
                  <Image
                    src="/images/asas_about_left_visual.webp"
                    alt="مقطع هندسي لاستقرار الحفريات"
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Feature Cards (Right column, Row 2) */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <MotionReveal delay={0.35}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Card 1 (Right in RTL) */}
                <div className="bg-white/30 border border-border/80 rounded-2xl p-5 text-center sm:text-right flex flex-col items-center sm:items-start justify-start hover:border-earth-brown/30 hover:bg-white/60 transition-all duration-300 group shadow-sm">
                  <div className="w-12 h-12 rounded-full border border-border/80 flex items-center justify-center mb-4 bg-white/70 group-hover:bg-white transition-colors">
                    <Search className="w-5 h-5 text-earth-brown" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">فهم الموقع</h3>
                  <p className="text-concrete-gray text-[13px] leading-relaxed">
                    نبدأ بدراسة سلوك التربة، منسوب المياه، عمق الحفر، والمنشآت المحيطة.
                  </p>
                </div>

                {/* Card 2 (Middle) */}
                <div className="bg-white/30 border border-border/80 rounded-2xl p-5 text-center sm:text-right flex flex-col items-center sm:items-start justify-start hover:border-earth-brown/30 hover:bg-white/60 transition-all duration-300 group shadow-sm">
                  <div className="w-12 h-12 rounded-full border border-border/80 flex items-center justify-center mb-4 bg-white/70 group-hover:bg-white transition-colors">
                    <SlidersHorizontal className="w-5 h-5 text-earth-brown" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">اختيار النظام</h3>
                  <p className="text-concrete-gray text-[13px] leading-relaxed">
                    نحدد نظام السند أو التصريف أو التقوية الأنسب حسب ظروف الموقع.
                  </p>
                </div>

                {/* Card 3 (Left in RTL) */}
                <div className="bg-white/30 border border-border/80 rounded-2xl p-5 text-center sm:text-right flex flex-col items-center sm:items-start justify-start hover:border-earth-brown/30 hover:bg-white/60 transition-all duration-300 group shadow-sm">
                  <div className="w-12 h-12 rounded-full border border-border/80 flex items-center justify-center mb-4 bg-white/70 group-hover:bg-white transition-colors">
                    <ShieldCheck className="w-5 h-5 text-earth-brown" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">تحكم أثناء التنفيذ</h3>
                  <p className="text-concrete-gray text-[13px] leading-relaxed">
                    ننفذ على مراحل مدروسة مع مراقبة مستمرة لضمان الاستقرار والسلامة.
                  </p>
                </div>

              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
