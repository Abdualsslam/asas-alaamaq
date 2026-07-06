"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { motion, AnimatePresence } from "framer-motion";

const servicesData = [
  {
    id: "shoring",
    titleAr: "سند الحفريات",
    titleEn: "Shoring Systems",
    description:
      "أنظمة دعم مصممة لمنع انهيار جوانب الحفر والتحكم بحركة التربة أثناء مراحل التنفيذ، لضمان استقرار الموقع بأعلى درجات الأمان.",
    includes: [
      { text: "Soldier Pile & Lagging", iconPath: "/images/servises/علامة خازوق.webp" },
      { text: "أنظمة التثبيت بالأنكور (Anchors)", iconPath: "/images/servises/علامة مرساة.webp" },
      { text: "الدعامات والجسور الداخلية (Struts)", iconPath: "/images/servises/علامة دعامة.webp" },
    ],
    imagePath: "/images/servises/سند الحفريات.webp",
    stat: "100+",
    statLabel: "مشروع منفذ",
    gradient: "from-[#D96B2B] to-[#B85520]",
    accentHex: "#D96B2B",
  },
  {
    id: "shotcrete",
    titleAr: "الخرسانة المقذوفة",
    titleEn: "Shotcrete",
    description:
      "تثبيت فوري لواجهات الحفر والتربة المكشوفة لتقليل مخاطر الانهيار أثناء التنفيذ، مع توفير طبقة حماية قوية ومستدامة.",
    includes: [
      { text: "دعم واجهات الحفر المفتوحة", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "تثبيت الأسطح الصخرية والتربة", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "تقليل المخاطر الميدانية بشكل فوري", iconPath: "/images/servises/علامة تحقق فني.webp" },
    ],
    imagePath: "/images/servises/الخرسانة المقذوفة.webp",
    stat: "50K+",
    statLabel: "متر مربع",
    gradient: "from-[#934E34] to-[#7A3F2A]",
    accentHex: "#934E34",
  },
  {
    id: "micropile",
    titleAr: "الخوازيق الدقيقة",
    titleEn: "Micropile",
    description:
      "حلول تقوية عميقة للأساسات في المواقع المعقدة أو المساحات المحدودة حيث لا تكفي الحلول التقليدية، لضمان قدرة تحمل عالية.",
    includes: [
      { text: "الحفر والتركيب في المساحات الضيقة", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "التسليح والحقن تحت الضغط", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "تعزيز أساسات المباني القائمة", iconPath: "/images/servises/علامة تحقق فني.webp" },
    ],
    imagePath: "/images/servises/الخوازيق الدقيقة.webp",
    stat: "30m",
    statLabel: "أقصى عمق",
    gradient: "from-[#2B6CB0] to-[#1E4D7B]",
    accentHex: "#2B6CB0",
  },
  {
    id: "dewatering",
    titleAr: "نزح المياه الجوفية",
    titleEn: "Dewatering",
    description:
      "إدارة فعالة للمياه الجوفية والتحكم بمنسوبها لتقليل الضغط الهيدروستاتيكي على جوانب الحفر وحماية استقرار الموقع بالكامل.",
    includes: [
      { text: "حفر الآبار العميقة (Deep Wells)", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "تركيب وتشغيل أنظمة الضخ", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "تصريف المياه والتحكم بالمناسيب", iconPath: "/images/servises/علامة تحقق فني.webp" },
    ],
    imagePath: "/images/servises/نزح المياة الجوفية.webp",
    stat: "24/7",
    statLabel: "مراقبة مستمرة",
    gradient: "from-[#2D8B75] to-[#1E6B5A]",
    accentHex: "#2D8B75",
  },
  {
    id: "perforated-pipe",
    titleAr: "الأنابيب المثقبة",
    titleEn: "Perforated Pipe",
    description:
      "أنظمة تصريف تحت سطحية استراتيجية تساعد على تخفيف ضغط المياه الجوفية وتوجيه مسارها بعيداً عن مناطق الحفر.",
    includes: [
      { text: "تصميم شبكات التصريف الفعالة", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "تخفيف ضغط المياه المستمر", iconPath: "/images/servises/علامة تحقق فني.webp" },
      { text: "حماية استقرار الحفر والأساسات", iconPath: "/images/servises/علامة تحقق فني.webp" },
    ],
    imagePath: "/images/servises/الانابيب المثقبة.webp",
    stat: "∞",
    statLabel: "حلول مخصصة",
    gradient: "from-[#6B5B3E] to-[#534832]",
    accentHex: "#6B5B3E",
  },
];

export function ServicesSection() {
  const [activeId, setActiveId] = useState("shoring");
  const activeService = servicesData.find((s) => s.id === activeId)!;
  const otherServices = servicesData.filter((s) => s.id !== activeId);

  return (
    <section
      id="services"
      className="relative py-28 lg:py-36 scroll-mt-28 bg-[#0F1114] overflow-hidden"
    >
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow matching active service */}
        <motion.div
          key={activeId + "-glow"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px]"
          style={{ background: `radial-gradient(circle, ${activeService.accentHex}18, transparent 70%)` }}
        />
        {/* Subtle grid */}
        <svg width="100%" height="100%" className="opacity-[0.03]">
          <defs>
            <pattern id="servicesGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#servicesGrid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* ─── Section Header ─── */}
        <MotionReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/60 mb-7 backdrop-blur-sm">
              <Zap size={15} className="text-equipment-orange" />
              <span className="text-sm font-bold tracking-wide">خدماتنا الهندسية</span>
            </div>
            <h2 className="text-4xl md:text-[3.2rem] font-black text-white mb-6 leading-[1.2] tracking-tight">
              أنظمة متكاملة{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-equipment-orange via-[#E8955A] to-earth-brown">
                لاستقرار الحفريات
              </span>
            </h2>
            <p className="text-lg text-white/45 leading-relaxed font-medium max-w-2xl mx-auto">
              ننفذ حلولاً هندسية مترابطة للتحكم بحركة التربة، تخفيف ضغط المياه الجوفية، ودعم واجهات الحفر بأعلى معايير الجودة والسلامة.
            </p>
          </div>
        </MotionReveal>

        {/* ─── Navigation Rail (Horizontal Tabs) ─── */}
        <MotionReveal delay={0.1}>
          <div className="flex justify-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              {servicesData.map((service) => {
                const isActive = activeId === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveId(service.id)}
                    className={`relative flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-400 cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeServiceTab"
                        className={`absolute inset-0 rounded-xl bg-gradient-to-l ${service.gradient} shadow-lg`}
                        style={{ boxShadow: `0 8px 32px ${service.accentHex}30` }}
                        transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                      />
                    )}
                    <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                      <Image
                        src={service.imagePath}
                        alt={service.titleAr}
                        width={20}
                        height={20}
                        className={`object-contain transition-all duration-300 ${
                          isActive ? "opacity-100 filter-none" : "opacity-50 grayscale hover:opacity-85 hover:grayscale-0"
                        }`}
                      />
                    </div>
                    <span className="relative z-10 hidden md:inline">{service.titleAr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </MotionReveal>

        {/* ─── Active Service Showcase ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12 lg:mb-16"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
              {/* Card inner glow */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, ${activeService.accentHex}, transparent 60%)`,
                }}
              />

              <div className="relative p-8 sm:p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  {/* Right Column: Content */}
                  <div className="lg:col-span-7 order-2 lg:order-1">
                    {/* Service Number + English Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="text-7xl sm:text-8xl font-black leading-none"
                        style={{ color: `${activeService.accentHex}12` }}
                      >
                        0{servicesData.findIndex((s) => s.id === activeId) + 1}
                      </span>
                      <div>
                        <p
                          className="text-xs font-bold tracking-[0.25em] uppercase"
                          style={{ color: activeService.accentHex }}
                          dir="ltr"
                        >
                          {activeService.titleEn}
                        </p>
                      </div>
                    </div>

                    {/* Arabic Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white mb-5 leading-[1.25]">
                      {activeService.titleAr}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-white/50 leading-[1.9] font-medium mb-10 max-w-xl">
                      {activeService.description}
                    </p>

                    {/* Includes */}
                    <div>
                      <h4 className="text-sm font-bold text-white/30 mb-5 tracking-wider">
                        تشمل هذه الخدمة
                      </h4>
                      <div className="space-y-3">
                        {activeService.includes.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
                            className="flex items-center gap-4 group"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 transition-transform duration-300 group-hover:scale-110"
                              style={{ backgroundColor: `${activeService.accentHex}18` }}
                            >
                              <Image
                                src={item.iconPath}
                                alt={item.text}
                                width={20}
                                height={20}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <span className="text-white/75 font-medium text-[15px] leading-snug">
                              {item.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Left Column: Visual Block */}
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <div className="relative">
                      {/* Main visual card */}
                      <div
                        className="relative rounded-[1.5rem] overflow-hidden aspect-square max-w-[420px] mx-auto"
                        style={{
                          background: `linear-gradient(145deg, ${activeService.accentHex}10, ${activeService.accentHex}04)`,
                          border: `1px solid ${activeService.accentHex}15`,
                        }}
                      >
                        {/* Decorative circles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                            className="absolute w-[85%] h-[85%] rounded-full border border-dashed"
                            style={{ borderColor: `${activeService.accentHex}15` }}
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                            className="absolute w-[65%] h-[65%] rounded-full border"
                            style={{ borderColor: `${activeService.accentHex}10` }}
                          />
                          {/* Center icon */}
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
                            className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden p-4"
                            style={{
                              background: `linear-gradient(135deg, ${activeService.accentHex}20, ${activeService.accentHex}40)`,
                              border: `1px solid ${activeService.accentHex}40`,
                              boxShadow: `0 20px 60px ${activeService.accentHex}20`,
                            }}
                          >
                            <Image
                              src={activeService.imagePath}
                              alt={activeService.titleAr}
                              width={80}
                              height={80}
                              className="object-contain w-full h-full"
                            />
                          </motion.div>
                        </div>

                        {/* Stat badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="absolute bottom-6 left-6 right-6 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-white/40 text-xs font-bold tracking-wider mb-1">
                              {activeService.statLabel}
                            </p>
                          </div>
                          <span
                            className="text-3xl font-black"
                            style={{ color: activeService.accentHex }}
                            dir="ltr"
                          >
                            {activeService.stat}
                          </span>
                        </motion.div>
                      </div>

                      {/* Floating particle dots */}
                      <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -top-3 -right-3 w-5 h-5 rounded-full"
                        style={{ backgroundColor: `${activeService.accentHex}40` }}
                      />
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: `${activeService.accentHex}30` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── Other Services Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherServices.map((service, index) => (
            <MotionReveal key={service.id} delay={0.05 * index}>
              <button
                onClick={() => setActiveId(service.id)}
                className="w-full text-right group relative rounded-2xl p-6 transition-all duration-400 cursor-pointer bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden p-2 transition-all duration-400 group-hover:scale-110"
                    style={{
                      backgroundColor: `${service.accentHex}12`,
                    }}
                  >
                    <Image
                      src={service.imagePath}
                      alt={service.titleAr}
                      width={32}
                      height={32}
                      className="object-contain w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-400"
                    />
                  </div>
                  <ArrowLeft
                    size={16}
                    className="text-white/15 group-hover:text-white/40 transition-all duration-400 group-hover:-translate-x-1"
                  />
                </div>

                {/* Title */}
                <h4 className="text-white font-bold text-lg mb-1.5 group-hover:text-white transition-colors">
                  {service.titleAr}
                </h4>
                <p
                  className="text-xs font-bold tracking-widest uppercase text-white/20"
                  dir="ltr"
                >
                  {service.titleEn}
                </p>

                {/* Bottom accent line */}
                <div className="mt-5 h-[2px] rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full w-0 group-hover:w-full transition-all duration-700 rounded-full"
                    style={{ backgroundColor: service.accentHex }}
                  />
                </div>
              </button>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
