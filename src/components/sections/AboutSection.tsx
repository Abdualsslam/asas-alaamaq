"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ShieldCheck, SlidersHorizontal, Search, ShieldHalf } from "lucide-react";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { t, isRTL } = useTranslation();

  const titleParts = t.about.title.split("\n");

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
          
          {/* Text Content */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 flex flex-col pt-4">
            
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-earth-brown/30 bg-white/50 backdrop-blur-sm mb-6 w-fit">
                <span className="text-sm font-bold text-charcoal">{t.about.badge}</span>
                <ShieldHalf className="w-4 h-4 text-earth-brown" />
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="text-3xl lg:text-[2.75rem] font-black text-charcoal mb-6 leading-[1.2]">
                {titleParts[0]}<br />
                {titleParts[1]}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="text-concrete-gray leading-relaxed mb-8 text-lg font-medium">
                {t.about.description}
              </p>
            </MotionReveal>

            {/* Positioning quote */}
            <MotionReveal delay={0.25}>
              <div className={cn(
                "relative py-6 bg-sand-secondary/30 rounded-xl mb-6",
                isRTL ? "border-r-4 border-earth-brown pr-6 rounded-l-xl" : "border-l-4 border-earth-brown pl-6 rounded-r-xl"
              )}>
                <p className="text-charcoal font-bold text-xl leading-relaxed">
                  {t.about.quote1}
                  <br />
                  <span className="text-earth-brown">
                    {t.about.quote2}
                  </span>
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* Visual Side */}
          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full flex items-center justify-center">
            <MotionReveal direction={isRTL ? "left" : "right"} delay={0.2} className="w-full">
              <div className="relative w-full rounded-[2rem] shadow-xl border border-earth-brown/10 bg-white/40 p-2 lg:p-4 backdrop-blur-sm">
                <div className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden bg-sand-light">
                  <Image
                    src="/images/asas_about_left_visual.png"
                    alt={t.about.imageAlt}
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

          {/* Feature Cards */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <MotionReveal delay={0.35}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {t.about.cards.map((card, idx) => {
                  const icons = [Search, SlidersHorizontal, ShieldCheck];
                  const Icon = icons[idx];
                  return (
                    <div key={idx} className={cn(
                      "bg-white/30 border border-border/80 rounded-2xl p-5 flex flex-col justify-start hover:border-earth-brown/30 hover:bg-white/60 transition-all duration-300 group shadow-sm",
                      isRTL ? "text-center sm:text-right items-center sm:items-start" : "text-center sm:text-left items-center sm:items-start"
                    )}>
                      <div className="w-12 h-12 rounded-full border border-border/80 flex items-center justify-center mb-4 bg-white/70 group-hover:bg-white transition-colors">
                        <Icon className="w-5 h-5 text-earth-brown" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-charcoal mb-2">{card.title}</h3>
                      <p className="text-concrete-gray text-[13px] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
