"use client";

import { Search, Settings, Layers, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "نفهم الموقع",
    description:
      "ندرس ظروف التربة، منسوب المياه الجوفية، عمق الحفر المطلوب، والمنشآت المحيطة قبل اتخاذ أي قرار تنفيذي.",
    icon: Search,
  },
  {
    number: "02",
    title: "نختار النظام",
    description:
      "نحدد نظام الدعم الأنسب — سند حفريات، شوتكريت، ميكروبايل، أو مزيج منها — وفق متطلبات الموقع الفعلية.",
    icon: Settings,
  },
  {
    number: "03",
    title: "ننفذ على مراحل",
    description:
      "التنفيذ يتم على مراحل مدروسة، كل مرحلة مرتبطة بعمق معين ومستوى دعم محدد، لضمان الاستقرار في كل خطوة.",
    icon: Layers,
  },
  {
    number: "04",
    title: "نراقب ونسيطر",
    description:
      "نتابع سلوك التربة والهيكل الداعم بشكل مستمر، ونتدخل فورًا عند أي تغيّر غير متوقع في الموقع.",
    icon: Eye,
  },
];

export function ExecutionSection() {
  return (
    <section id="execution" className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <line x1="0" y1="100" x2="1440" y2="120" stroke="white" strokeWidth="1" />
          <line x1="0" y1="250" x2="1440" y2="240" stroke="white" strokeWidth="1" />
          <line x1="0" y1="400" x2="1440" y2="420" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <Container className="relative z-10">
        <MotionReveal>
          <SectionHeader
            title="لا نبدأ بالتنفيذ… نبدأ بالفهم"
            subtitle="كل مشروع حفر له ظروفه الخاصة. منهجيتنا تضمن أن كل قرار مبني على فهم حقيقي للموقع."
            align="center"
            light
          />
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <MotionReveal key={step.number} delay={index * 0.12}>
              <div className="relative group">
                {/* Connector line (hidden on mobile, visible on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -left-2 w-4 h-px bg-white/20" />
                )}

                <div
                  className={cn(
                    "relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full",
                    "hover:bg-white/10 hover:border-earth-brown/40 transition-all duration-300"
                  )}
                >
                  {/* Step number */}
                  <span className="text-5xl font-black text-earth-brown/20 absolute top-3 left-4 select-none">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-earth-brown/20 rounded-lg mb-5 group-hover:bg-earth-brown/30 transition-colors">
                    <step.icon size={22} className="text-earth-brown-light" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-white font-bold text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-white/50 text-sm leading-relaxed">
                    {step.description}
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
