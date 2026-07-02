"use client";

import { ShieldCheck, HardHat, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";

const safetyPillars = [
  {
    title: "استقرار الحفريات",
    description:
      "نضمن ثبات جدران الحفر في كل مرحلة من مراحل التنفيذ، من خلال أنظمة دعم مصممة هندسيًا ومراقبة مستمرة لسلوك التربة.",
    icon: ShieldCheck,
  },
  {
    title: "سلامة العاملين",
    description:
      "بيئة عمل آمنة هي الأولوية. نطبق أعلى معايير السلامة المهنية ونوفر بيئة محمية لجميع العاملين في الموقع.",
    icon: HardHat,
  },
  {
    title: "حماية المنشآت المجاورة",
    description:
      "نراقب تأثير أعمال الحفر على المباني والبنية التحتية المحيطة، ونتخذ إجراءات وقائية لمنع أي تأثير سلبي.",
    icon: Building2,
  },
];

export function SafetySection() {
  return (
    <section className="section-padding bg-earth-brown/5 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <pattern id="safetyGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#934E34" strokeWidth="1" />
          </pattern>
          <rect width="1440" height="600" fill="url(#safetyGrid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <MotionReveal>
          <SectionHeader
            title="السلامة ليست قائمة إجراءات… بل نظام متكامل"
            subtitle="في أساس الأعماق، السلامة جزء من التصميم الهندسي وليست مجرد متطلب إداري."
            align="center"
          />
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safetyPillars.map((pillar, index) => (
            <MotionReveal key={pillar.title} delay={index * 0.12}>
              <div className="group bg-surface border border-border rounded-xl p-8 text-center hover:border-earth-brown/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Icon circle */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-earth-brown/10 rounded-full mb-6 group-hover:bg-earth-brown group-hover:scale-110 transition-all duration-300">
                  <pillar.icon
                    size={30}
                    className="text-earth-brown group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-charcoal font-bold text-lg mb-3">
                  {pillar.title}
                </h3>
                <p className="text-concrete-gray text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
