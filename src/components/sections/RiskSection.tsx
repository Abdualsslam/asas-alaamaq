"use client";

import { risks } from "@/data/risks";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function RiskSection() {
  return (
    <section id="risks" className="section-padding scroll-mt-28 bg-surface">
      <Container>
        <MotionReveal>
          <SectionHeader
            title="عندما يصبح الحفر مصدر خطر، نبدأ نحن"
            subtitle="التربة تتحرك، المياه تضغط، والموقع يتغير مع كل مرحلة حفر. لذلك يحتاج المشروع إلى جهة تفهم هذه العوامل وتتحكم بها قبل أن تتحول إلى خطر."
            align="center"
          />
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {risks.map((risk, index) => (
            <MotionReveal key={risk.id} delay={index * 0.1}>
              <div className="group relative bg-sand-light border border-border rounded-xl p-6 hover:border-earth-brown/30 hover:shadow-lg hover:shadow-earth-brown/5 hover:-translate-y-1 transition-all duration-300">
                {/* Risk number */}
                <span className="absolute top-4 left-4 text-6xl font-black text-earth-brown/5 leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-earth-brown/10 rounded-lg mb-4 group-hover:bg-earth-brown/15 transition-colors">
                  <risk.icon
                    size={24}
                    className="text-earth-brown"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-charcoal font-bold text-lg mb-2">
                  {risk.title}
                </h3>
                <p className="relative z-10 text-concrete-gray text-sm leading-relaxed">
                  {risk.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-l from-earth-brown to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
