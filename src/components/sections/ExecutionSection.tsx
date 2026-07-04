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
      className="relative scroll-mt-28 overflow-hidden"
      style={{ backgroundColor: "#1F1F1F" }}
    >
      {/* ─── Transition gradient from previous section ─── */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #0F1114 0%, #1F1F1F 100%)",
        }}
      />

      {/* ─── Topographic / Grid background pattern ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid lines */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ opacity: 0.025 }}
        >
          <defs>
            <pattern
              id="execGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#D8C1A8"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#execGrid)" />
        </svg>

        {/* Topographic curves - top left */}
        <svg
          className="absolute top-0 left-0 w-[500px] h-[400px]"
          viewBox="0 0 500 400"
          fill="none"
          style={{ opacity: 0.04 }}
        >
          <path
            d="M0,80 Q80,60 160,90 T320,70 T500,100"
            stroke="#C98645"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,120 Q100,100 200,130 T400,110 T500,140"
            stroke="#C98645"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M0,160 Q120,140 240,170 T480,150"
            stroke="#C98645"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M0,200 Q90,180 180,210 T360,190 T500,220"
            stroke="#C98645"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        {/* Topographic curves - top right */}
        <svg
          className="absolute top-0 right-0 w-[500px] h-[400px]"
          viewBox="0 0 500 400"
          fill="none"
          style={{ opacity: 0.04 }}
        >
          <path
            d="M500,60 Q400,40 300,70 T100,50 T0,80"
            stroke="#C98645"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M500,100 Q380,80 260,110 T60,90 T0,120"
            stroke="#C98645"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M500,140 Q420,120 340,150 T160,130 T0,160"
            stroke="#C98645"
            strokeWidth="0.6"
            fill="none"
          />
        </svg>

        {/* Subtle radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,134,69,0.06), transparent 70%)",
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-20 pt-40 pb-0">
        <Container>
          {/* Section Header */}
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
              {/* Badge */}
              <div
                className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full mb-7 backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(216,193,168,0.12)",
                }}
              >
                <span
                  className="text-sm font-bold tracking-wide"
                  style={{ color: "#C98645" }}
                >
                  منهجية التنفيذ
                </span>
              </div>

              {/* Main Title */}
              <h2
                className="font-black mb-6 leading-[1.2] tracking-tight"
                style={{
                  color: "#FFFFFF",
                  fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
                }}
              >
                لا نبدأ بالتنفيذ…{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, #D96B2B, #C98645)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  نبدأ بالفهم
                </span>
              </h2>

              {/* Subtitle */}
              <p
                className="text-lg leading-relaxed font-medium max-w-2xl mx-auto"
                style={{ color: "#B8B0A6" }}
              >
                كل مشروع حفر له ظروفه الخاصة. منهجيتنا تضمن أن كل قرار مبني
                على فهم حقيقي للموقع، وليس على تنفيذ تقليدي.
              </p>
            </div>
          </MotionReveal>

          {/* ─── Timeline Cards ─── */}
          <MotionReveal delay={0.15}>
            <div className="relative">
              {/* ── Desktop Horizontal Connector Line ── */}
              <div className="hidden lg:block absolute top-[72px] right-[12.5%] left-[12.5%] h-[2px] z-0">
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(to left, #C98645, rgba(201,134,69,0.3) 50%, #C98645)",
                  }}
                />
              </div>

              {/* ── Desktop Connector Glowing Dots ── */}
              <div className="hidden lg:flex absolute top-[66px] right-[12.5%] left-[12.5%] z-10 justify-between pointer-events-none">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className="relative"
                    style={{
                      marginRight: idx === 0 ? "0" : "0",
                    }}
                  >
                    <div
                      className="w-[14px] h-[14px] rounded-full"
                      style={{
                        backgroundColor: "#C98645",
                        boxShadow:
                          "0 0 12px rgba(201,134,69,0.6), 0 0 30px rgba(201,134,69,0.3)",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* ── Mobile Vertical Connector Line ── */}
              <div
                className="lg:hidden absolute right-[28px] top-0 bottom-0 w-[2px] z-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(201,134,69,0.4) 10%, rgba(201,134,69,0.4) 90%, transparent)",
                }}
              />

              {/* ── Cards Grid ── */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-5">
                {steps.map((step, index) => (
                  <MotionReveal
                    key={step.number}
                    delay={0.1 + index * 0.12}
                    direction={index % 2 === 0 ? "up" : "up"}
                  >
                    {/* Mobile layout with timeline dot */}
                    <div className="flex lg:block items-start gap-5">
                      {/* Mobile timeline dot */}
                      <div className="lg:hidden flex-shrink-0 mt-8 relative z-10">
                        <div
                          className="w-[14px] h-[14px] rounded-full"
                          style={{
                            backgroundColor: "#C98645",
                            boxShadow:
                              "0 0 10px rgba(201,134,69,0.5), 0 0 24px rgba(201,134,69,0.2)",
                          }}
                        />
                      </div>

                      {/* Card */}
                      <div
                        className="relative group cursor-default flex-1 rounded-2xl p-7 lg:p-8 transition-all duration-500 hover:-translate-y-2"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(216,193,168,0.16)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.07)";
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
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Step Number - large faint background */}
                        <span
                          className="absolute top-4 left-5 text-7xl lg:text-8xl font-black select-none pointer-events-none"
                          style={{ color: "rgba(201,134,69,0.07)" }}
                        >
                          {step.number}
                        </span>

                        {/* Icon */}
                        <div
                          className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl mb-6 transition-all duration-500 group-hover:scale-105"
                          style={{
                            backgroundColor: "rgba(201,134,69,0.12)",
                            border: "1px solid rgba(201,134,69,0.15)",
                          }}
                        >
                          <step.icon
                            size={26}
                            className="transition-colors duration-500"
                            style={{ color: "#C98645" }}
                            strokeWidth={1.5}
                          />
                        </div>

                        {/* Title */}
                        <h3
                          className="relative z-10 font-bold text-xl lg:text-[1.35rem] mb-4 leading-tight"
                          style={{ color: "#FFFFFF" }}
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="relative z-10 text-[15px] lg:text-base leading-[1.9]"
                          style={{ color: "#B8B0A6" }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </MotionReveal>

          {/* ─── Depth Markers (like the design) ─── */}
          <MotionReveal delay={0.3}>
            <div className="relative mt-10 lg:mt-14 mr-4 lg:mr-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                  dir="ltr"
                >
                  0m
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(216,193,168,0.08))",
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: "rgba(255,255,255,0.12)" }}
                  dir="ltr"
                >
                  -5m
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(216,193,168,0.05))",
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: "rgba(255,255,255,0.09)" }}
                  dir="ltr"
                >
                  -10m
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(216,193,168,0.03))",
                  }}
                />
              </div>
            </div>
          </MotionReveal>
        </Container>

        {/* ─── Background Image (excavation cross-section) ─── */}
        <div className="relative w-full mt-4 lg:mt-6">
          <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[340px]">
            <Image
              src="/images/execution/execution-process-bg.png"
              alt="مقطع هندسي لعملية الحفر والسند"
              fill
              className="object-cover object-top"
              style={{ opacity: 0.85 }}
              sizes="100vw"
            />
            {/* Top fade into dark background */}
            <div
              className="absolute inset-x-0 top-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, #1F1F1F, transparent)",
              }}
            />
          </div>
        </div>

        {/* ─── Closing Statement ─── */}
        <div
          className="relative w-full py-10 lg:py-14"
          style={{
            background:
              "linear-gradient(to bottom, rgba(31,31,31,0.95), #1F1F1F)",
          }}
        >
          <MotionReveal delay={0.2}>
            <div className="text-center">
              <p
                className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold leading-relaxed"
                style={{ color: "#C98645" }}
              >
                الاستقرار لا يحدث بالصدفة…{" "}
                <span style={{ color: "#FFFFFF" }}>
                  بل يتم تحقيقه هندسيًا.
                </span>
              </p>
              {/* Decorative line under closing */}
              <div
                className="mx-auto mt-5 w-16 h-[2px]"
                style={{
                  background:
                    "linear-gradient(to left, transparent, #C98645, transparent)",
                }}
              />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
