"use client";

import Image from "next/image";
import { risks } from "@/data/risks";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { useTranslation } from "@/i18n";

export function RiskSection() {
  const { t } = useTranslation();

  const riskIcons = risks.map((r) => r.icon);
  const Icon1 = riskIcons[0];
  const Icon2 = riskIcons[1];
  const Icon3 = riskIcons[2];
  const Icon4 = riskIcons[3];
  const Icon5 = riskIcons[4];

  const ri = t.risks.items;

  return (
    <section id="risks" className="section-padding scroll-mt-28 bg-surface-elevated">
      <Container>
        {/* Centered Section Header Block at the Top */}
        <MotionReveal delay={0.1}>
          <div className="text-center mb-12 md:mb-16">
            <div className="engineering-line mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
              {t.risks.sectionTitle}
            </h2>
            <p className="text-concrete-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.risks.sectionSubtitle}
            </p>
          </div>
        </MotionReveal>

        {/* Two-Column Grid Layout Below Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Cards Grid */}
          <div className="w-full flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 01 */}
              <MotionReveal delay={0.2} className="order-1 md:order-1">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon1 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">01</span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">{ri[0].title}</h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">{ri[0].description}</p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ms-1 me-1">{t.risks.controlMethodLabel}</span>
                    <span className="text-charcoal">{ri[0].controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 02 */}
              <MotionReveal delay={0.3} className="order-2 md:order-2">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon2 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">02</span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">{ri[1].title}</h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">{ri[1].description}</p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ms-1 me-1">{t.risks.controlMethodLabel}</span>
                    <span className="text-charcoal">{ri[1].controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 04 */}
              <MotionReveal delay={0.4} className="order-4 md:order-3">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon4 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">04</span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">{ri[3].title}</h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">{ri[3].description}</p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ms-1 me-1">{t.risks.controlMethodLabel}</span>
                    <span className="text-charcoal">{ri[3].controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 03 */}
              <MotionReveal delay={0.5} className="order-3 md:order-4">
                <div className="h-full relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown">
                        <Icon3 size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl font-black text-earth-brown/10 select-none leading-none">03</span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2">{ri[2].title}</h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-4">{ri[2].description}</p>
                  </div>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <span className="font-bold text-earth-brown-light ms-1 me-1">{t.risks.controlMethodLabel}</span>
                    <span className="text-charcoal">{ri[2].controlMethod}</span>
                  </div>
                </div>
              </MotionReveal>

              {/* Card 05 - Full-width */}
              <MotionReveal delay={0.6} className="col-span-1 md:col-span-2 order-5 md:order-5">
                <div className="relative bg-surface border border-border rounded-2xl p-6 hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-earth-brown/5 rounded-xl text-earth-brown shrink-0">
                    <Icon5 size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal text-lg mb-1">{ri[4].title}</h3>
                    <p className="text-concrete-gray text-sm leading-relaxed mb-3">{ri[4].description}</p>
                    <div className="text-sm pt-2 border-t border-border/50">
                      <span className="font-bold text-earth-brown-light ms-1 me-1">{t.risks.controlMethodLabel}</span>
                      <span className="text-charcoal">{ri[4].controlMethod}</span>
                    </div>
                  </div>
                  <span className="text-5xl font-black text-earth-brown/10 select-none leading-none">05</span>
                </div>
              </MotionReveal>
            </div>
          </div>

          {/* Geological Diagram */}
          <div className="w-full">
            <MotionReveal delay={0.7}>
              <div className="w-full relative rounded-[2rem] overflow-hidden">
                <Image
                  src="/images/risk-diagram.png"
                  alt={t.risks.sectionTitle}
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
