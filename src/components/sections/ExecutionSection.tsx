"use client";

import { Search, Settings, Layers, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "فهم الموقع",
    description:
      "ندرس خواص التربة، منسوب المياه الجوفية، عمق الحفر، والمنشآت المحيطة قبل اختيار الحل.",
    icon: Search,
  },
  {
    number: "02",
    title: "اختيار النظام",
    description:
      "نحدد نظام السند، التصريف، أو التقوية المناسب حسب متطلبات الموقع وظروفه الفعلية.",
    icon: Settings,
  },
  {
    number: "03",
    title: "تنفيذ على مراحل",
    description:
      "ننفذ كل مرحلة وفق خطة واضحة وإجراءات مدروسة لضمان الاستقرار في كل مستوى.",
    icon: Layers,
  },
  {
    number: "04",
    title: "مراقبة وتحكم",
    description:
      "نراقب سلوك التربة والمياه أثناء التنفيذ ونتدخل مبكرًا قبل أن يتحول الخطر إلى مشكلة.",
    icon: Eye,
  },
];

export function ExecutionSection() {
  return (
    <section
      id="execution"
      className="relative scroll-mt-28 pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden"
      style={{ backgroundColor: "#0F1114" }}
    >
      {/* ─── Background Image ─── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/execution/execution-process-bg.webp"
          alt="منهجية التنفيذ خلفية"
          fill
          className="object-cover object-bottom"
          style={{ opacity: 0.6 }}
          sizes="100vw"
          priority
        />
        {/* Transition gradient from previous section */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, #0F1114, transparent)",
          }}
        />
      </div>

      <Container className="relative z-20">
        {/* ─── Section Header ─── */}
        <MotionReveal>
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            {/* Subtitle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="w-8 lg:w-12 h-[1px]"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(201,134,69,0.6))",
                }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "#C98645",
                  boxShadow: "0 0 8px rgba(201,134,69,0.8)",
                }}
              />
              <span
                className="text-sm font-bold tracking-wide"
                style={{ color: "#C98645" }}
              >
                منهجية التنفيذ
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "#C98645",
                  boxShadow: "0 0 8px rgba(201,134,69,0.8)",
                }}
              />
              <div
                className="w-8 lg:w-12 h-[1px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(201,134,69,0.6))",
                }}
              />
            </div>

            {/* Main Title */}
            <h2
              className="font-black mb-6 leading-[1.2] tracking-tight text-white"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              }}
            >
              لا نبدأ بالتنفيذ… نبدأ بالفهم
            </h2>

            {/* Description */}
            <p
              className="text-lg lg:text-[1.15rem] leading-relaxed font-medium max-w-2xl mx-auto"
              style={{ color: "#B8B0A6" }}
            >
              كل مشروع حفر له ظروفه الخاصة. منهجيتنا تضمن أن كل قرار مبني على فهم
              حقيقي للموقع، وليس على تنفيذ تقليدي.
            </p>
          </div>
        </MotionReveal>

        {/* ─── Timeline Cards ─── */}
        <div className="relative mb-6 lg:mb-8">
          {/* Desktop Timeline Line */}
          <div
            className="hidden lg:flex absolute top-[60px] left-0 right-0 h-[1px] z-0 justify-between px-[12.5%] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,134,69,0.4) 15%, rgba(201,134,69,0.4) 85%, transparent)",
            }}
          >
            {/* Dots placed perfectly between cards */}
            <div className="absolute inset-0 flex justify-evenly items-center">
              <div className="w-3 h-3 rounded-full bg-[#1F1F1F] border-2 border-[#C98645] shadow-[0_0_12px_rgba(201,134,69,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-[#1F1F1F] border-2 border-[#C98645] shadow-[0_0_12px_rgba(201,134,69,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-[#1F1F1F] border-2 border-[#C98645] shadow-[0_0_12px_rgba(201,134,69,0.8)]" />
            </div>
          </div>

          {/* Mobile Timeline Line */}
          <div
            className="lg:hidden absolute top-8 bottom-8 right-[11px] w-[2px] z-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(201,134,69,0.3) 10%, rgba(201,134,69,0.3) 90%, transparent)",
            }}
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <MotionReveal key={step.number} delay={0.1 + index * 0.1}>
                <div className="relative group/card flex lg:block items-start gap-5 lg:gap-0">
                  {/* Mobile Dot */}
                  <div className="lg:hidden flex-shrink-0 mt-8 relative z-10 w-[24px] flex justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#1F1F1F] border-2 border-[#C98645] shadow-[0_0_12px_rgba(201,134,69,0.6)]" />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 lg:h-full rounded-2xl p-7 lg:p-8 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(216,193,168,0.16)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor =
                        "rgba(201,134,69,0.45)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 40px rgba(201,134,69,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor =
                        "rgba(216,193,168,0.16)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at top right, rgba(201,134,69,0.1), transparent 70%)",
                      }}
                    />

                    {/* Top Row: Number & Icon */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      {/* Number */}
                      <span
                        className="text-6xl lg:text-[4.5rem] font-light font-sans tracking-tighter select-none pointer-events-none transition-colors duration-500 group-hover/card:text-[rgba(201,134,69,0.15)]"
                        style={{ color: "rgba(255,255,255,0.06)" }}
                        dir="ltr"
                      >
                        {step.number}
                      </span>

                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/card:scale-110"
                        style={{
                          border: "1px solid rgba(201,134,69,0.25)",
                          backgroundColor: "rgba(201,134,69,0.08)",
                        }}
                      >
                        <step.icon
                          size={26}
                          style={{ color: "#C98645" }}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 font-bold text-xl lg:text-[1.35rem] mb-4 text-white leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-[15px] lg:text-base leading-[1.8] text-[#B8B0A6]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </Container>

      {/* ─── Bottom Depth Markers & Closing Statement ─── */}
      <div className="relative w-full mt-0 overflow-hidden z-10">
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-[400px]">

          {/* Depth markers overlay */}
          <div
            className="absolute left-0 top-[20%] bottom-[20%] w-full flex flex-col justify-between pointer-events-none z-10"
            dir="ltr"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] lg:text-xs font-bold tracking-wider w-8 lg:w-10 text-right"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                0m
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(216,193,168,0.25), transparent)",
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] lg:text-xs font-bold tracking-wider w-8 lg:w-10 text-right"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                -5m
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(216,193,168,0.15), transparent)",
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] lg:text-xs font-bold tracking-wider w-8 lg:w-10 text-right"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                -10m
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(216,193,168,0.08), transparent)",
                }}
              />
            </div>
          </div>

          {/* Closing Statement */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
            <MotionReveal delay={0.2}>
              <div
                className="flex items-center gap-3 lg:gap-5 px-6 lg:px-8 py-3.5 lg:py-4 rounded-3xl backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(31,31,31,0.7)",
                  border: "1px solid rgba(216,193,168,0.12)",
                }}
              >
                <div
                  className="w-8 lg:w-12 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(201,134,69,0.8))",
                  }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#C98645" }}
                />
                <p
                  className="text-[15px] sm:text-lg lg:text-[1.3rem] font-bold tracking-wide"
                  style={{ color: "#C98645" }}
                >
                  الاستقرار لا يحدث بالصدفة…{" "}
                  <span style={{ color: "#FFFFFF" }}>
                    بل يتم تحقيقه هندسيًا.
                  </span>
                </p>
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#C98645" }}
                />
                <div
                  className="w-8 lg:w-12 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(201,134,69,0.8))",
                  }}
                />
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
