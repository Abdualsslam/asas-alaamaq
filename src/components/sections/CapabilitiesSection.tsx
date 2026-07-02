"use client";

import { Pickaxe, Building, Combine, Zap, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";

const capabilities = [
  {
    title: "العمل في ظروف تربة معقدة",
    description: "نتعامل مع أنواع التربة الأكثر تحديًا — صخرية، طينية، رملية مشبعة — بحلول مصممة خصيصًا.",
    icon: Pickaxe,
  },
  {
    title: "مواقع حضرية ضيقة",
    description: "خبرة في تنفيذ أعمال الحفر والدعم في مواقع محدودة المساحة ومحاطة بمنشآت قائمة.",
    icon: Building,
  },
  {
    title: "دمج أنظمة دعم متعددة",
    description: "نجمع بين تقنيات مختلفة في مشروع واحد لتحقيق أفضل نتائج الاستقرار والأمان.",
    icon: Combine,
  },
  {
    title: "سرعة الاستجابة",
    description: "فريق جاهز للتدخل السريع في المواقف الطارئة وتقديم حلول فورية لمشاكل الموقع.",
    icon: Zap,
  },
  {
    title: "قرارات ميدانية",
    description: "مهندسون ذوو خبرة يتخذون قرارات دقيقة في الموقع بناءً على الملاحظات الميدانية الفعلية.",
    icon: Compass,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="section-padding bg-sand-light">
      <Container>
        <MotionReveal>
          <SectionHeader
            title="قدرات تميزنا في الميدان"
            subtitle="ما يجعلنا الخيار الأول للمشاريع التي تتطلب دقة وخبرة في الهندسة الأرضية."
          />
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, index) => (
            <MotionReveal key={cap.title} delay={index * 0.08} direction={index % 2 === 0 ? "right" : "left"}>
              <div className="flex gap-5 items-start group p-5 rounded-xl hover:bg-surface border border-transparent hover:border-border transition-all duration-300">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-earth-brown/10 rounded-xl group-hover:bg-earth-brown group-hover:text-white transition-all duration-300">
                  <cap.icon
                    size={22}
                    className="text-earth-brown group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-charcoal font-bold text-base mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-concrete-gray text-sm leading-relaxed">
                    {cap.description}
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
