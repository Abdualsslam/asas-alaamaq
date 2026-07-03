"use client";

import { ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionReveal } from "@/components/ui/MotionReveal";

// TODO: استبدل هذه البيانات بصور المشاريع الفعلية لاحقًا
const projectPlaceholders = [
  { id: 1, label: "مشروع سند حفريات — الرياض" },
  { id: 2, label: "أعمال شوتكريت — مشروع تجاري" },
  { id: 3, label: "ميكروبايل — موقع حضري" },
  { id: 4, label: "نزح مياه — حفر عميق" },
  { id: 5, label: "سند حفريات مع أنابيب مثقبة" },
  { id: 6, label: "مشروع متكامل — استقرار تربة" },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding scroll-mt-28 bg-surface">
      <Container>
        <MotionReveal>
          <SectionHeader
            title="من أعمالنا"
            subtitle="مشاريع نُفذت بمعايير هندسية عالية في ظروف مواقع مختلفة."
            align="center"
          />
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectPlaceholders.map((project, index) => (
            <MotionReveal key={project.id} delay={index * 0.08}>
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-sand-secondary/40 via-earth-brown/10 to-concrete-gray/20 border border-border hover:border-earth-brown/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                  <ImageIcon
                    size={40}
                    className="text-earth-brown/20"
                    strokeWidth={1}
                  />
                  <span className="text-concrete-gray/40 text-sm text-center font-medium">
                    {/* TODO: أضف صور المشاريع في public/images/projects/ */}
                    صورة المشروع
                  </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Project label */}
                <div className="absolute bottom-0 right-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">
                    {project.label}
                  </p>
                </div>

                {/* Project number badge */}
                <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-earth-brown/80 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
                  {String(project.id).padStart(2, "0")}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
