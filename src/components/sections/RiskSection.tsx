"use client";

import Image from "next/image";
import { risks } from "@/data/risks";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function RiskSection() {
  const risk1 = risks.find((r) => r.id === "unstable-soil") || risks[0];
  const risk2 = risks.find((r) => r.id === "groundwater") || risks[1];
  const risk3 = risks.find((r) => r.id === "lateral-pressure") || risks[2];
  const risk4 = risks.find((r) => r.id === "deep-excavation") || risks[3];
  const risk5 = risks.find((r) => r.id === "adjacent-structures") || risks[4];

  const Icon1 = risk1.icon;
  const Icon2 = risk2.icon;
  const Icon3 = risk3.icon;
  const Icon4 = risk4.icon;
  const Icon5 = risk5.icon;

  return (
    <section id="risks" className="section-padding scroll-mt-28 bg-surface-elevated">
      <Container>
        {/* Centered Section Header Block at the Top */}
        <MotionReveal delay={0.1}>
          <div className="text-center mb-12 md:mb-16">
            <div className="engineering-line mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
              عندما يصبح الحفر مصدر خطر، نبدأ نحن
            </h2>
            <p className="text-concrete-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              التربة تتحرك، المياه تضغط، والموقع يتغير مع كل مرحلة حفر. لذلك نبدأ بتشخيص مصادر الخطر قبل أن تتحول إلى فشل في الموقع.
            </p>
          </div>
        </MotionReveal>

        {/* Two-Column Grid Layout Below Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Right Column - Cards Grid (First in HTML -> Right in RTL desktop, Top in mobile) */}
          <div className="w-full flex flex-col">
            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 01 - Top Right in Desktop, 1st in Mobile */}
              <MotionReveal delay={0.2} className="order-1 md:order-1">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon1 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">
                        01
                      </span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">
                      {risk1.title}
                    </h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">
                      {risk1.description}
                    </p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ml-1">طريقة التحكم:</span>
                    <span className="text-charcoal">{risk1.controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 02 - Top Left in Desktop, 2nd in Mobile */}
              <MotionReveal delay={0.3} className="order-2 md:order-2">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon2 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">
                        02
                      </span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">
                      {risk2.title}
                    </h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">
                      {risk2.description}
                    </p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ml-1">طريقة التحكم:</span>
                    <span className="text-charcoal">{risk2.controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 04 - Bottom Right in Desktop, 4th in Mobile */}
              <MotionReveal delay={0.4} className="order-4 md:order-3">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon4 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">
                        04
                      </span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">
                      {risk4.title}
                    </h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">
                      {risk4.description}
                    </p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ml-1">طريقة التحكم:</span>
                    <span className="text-charcoal">{risk4.controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 03 - Bottom Left in Desktop, 3rd in Mobile */}
              <MotionReveal delay={0.5} className="order-3 md:order-4">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon3 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">
                        03
                      </span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">
                      {risk3.title}
                    </h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">
                      {risk3.description}
                    </p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ml-1">طريقة التحكم:</span>
                    <span className="text-charcoal">{risk3.controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 05 - Bottom Full-width */}
              <MotionReveal delay={0.6} className="col-span-1 md:col-span-2 order-5 md:order-5">
                <div className="relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon (Rightmost in RTL) */}
                  <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown shrink-0">
                    <Icon5 size={24} strokeWidth={1.5} />
                  </div>
                  
                  {/* Content (Middle) */}
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal text-lg mb-1">
                      {risk5.title}
                    </h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-3">
                      {risk5.description}
                    </p>
                    <div className="text-sm pt-2 border-t border-border/50">
                      <span className="font-bold text-earth-brown-light ml-1">طريقة التحكم:</span>
                      <span className="text-charcoal">{risk5.controlMethod}</span>
                    </div>
                  </div>
                  
                  {/* Number (Leftmost in RTL) */}
                  <span className="text-5xl font-black text-earth-brown/10 select-none leading-none">
                    05
                  </span>
                </div>
              </MotionReveal>
            </div>
          </div>

          {/* Left Column - Geological Diagram Card (Second in HTML -> Left in RTL desktop, Bottom in mobile) */}
          <div className="w-full">
            <MotionReveal delay={0.7}>
              <div className="w-full relative rounded-[2rem] overflow-hidden">
                <Image
                  src="/images/risk-diagram.webp"
                  alt="مخطط طبقات التربة وحلول سند الحفريات"
                  width={1086}
                  height={1448}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
