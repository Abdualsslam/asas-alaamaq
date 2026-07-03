"use client";

import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function ServicesSection() {
  return (
    <section id="services" className="section-padding scroll-mt-28 bg-surface">
      <Container>
        <MotionReveal>
          <SectionHeader
            title="حلول هندسية لاستقرار الحفريات"
            subtitle="نقدم مجموعة متكاملة من الحلول الهندسية المتخصصة للتحكم بالتربة والمياه الجوفية وضمان استقرار الحفريات."
            align="center"
          />
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <MotionReveal key={service.id} delay={index * 0.1}>
              <div className="group relative bg-sand-light rounded-xl border border-border overflow-hidden hover:border-earth-brown/30 hover:shadow-xl hover:shadow-earth-brown/5 hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-l from-earth-brown via-equipment-orange to-earth-brown/40 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center bg-earth-brown/10 rounded-xl mb-5 group-hover:bg-earth-brown group-hover:text-white transition-all duration-300">
                    <service.icon
                      size={28}
                      className="text-earth-brown group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-charcoal font-bold text-lg mb-1">
                    {service.titleAr}
                  </h3>
                  <p className="text-earth-brown/60 text-xs font-medium mb-3" dir="ltr">
                    {service.titleEn}
                  </p>

                  {/* Description */}
                  <p className="text-concrete-gray text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
