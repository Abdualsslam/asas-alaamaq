"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

const servicesMetadata = [
  {
    id: "shoring",
    imagePath: "/images/servises/سند_الحفريات_v2.webp",
    stat: "40+",
    gradient: "from-[#D96B2B] to-[#B85520]",
    accentHex: "#D96B2B",
    iconPaths: [
      "/images/servises/علامة خازوق.webp",
      "/images/servises/علامة مرساة.webp",
      "/images/servises/علامة دعامة.webp",
    ],
  },
  {
    id: "shotcrete",
    imagePath: "/images/servises/الخرسانة_المقذوفة_v2.webp",
    gradient: "from-[#934E34] to-[#7A3F2A]",
    accentHex: "#934E34",
    iconPaths: [
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
    ],
  },
  {
    id: "micropile",
    imagePath: "/images/servises/ميكروبايل_v2.webp",
    stat: "20m",
    gradient: "from-[#2B6CB0] to-[#1E4D7B]",
    accentHex: "#2B6CB0",
    iconPaths: [
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
    ],
  },
  {
    id: "dewatering",
    imagePath: "/images/servises/نزح_المياة_v2.webp",
    stat: "24/7",
    gradient: "from-[#2D8B75] to-[#1E6B5A]",
    accentHex: "#2D8B75",
    iconPaths: [
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
    ],
  },
  {
    id: "perforated-pipe",
    imagePath: "/images/servises/الانابيب_المثقبة_v2.webp",
    stat: "∞",
    gradient: "from-[#6B5B3E] to-[#534832]",
    accentHex: "#6B5B3E",
    iconPaths: [
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
      "/images/servises/علامة تحقق فني.webp",
    ],
  },
];

export function ServicesSection() {
  const [activeId, setActiveId] = useState("shoring");
  const { t, isRTL, locale } = useTranslation();

  const activeIndex = servicesMetadata.findIndex((s) => s.id === activeId);
  const activeMeta = servicesMetadata[activeIndex >= 0 ? activeIndex : 0];
  const activeContent = t.services.items[activeIndex >= 0 ? activeIndex : 0] as {
    titleAr: string;
    titleEn: string;
    description: string;
    includes: readonly string[];
    statLabel?: string;
  };

  const ViewArrow = isRTL ? ArrowLeft : ArrowRight;
  const NavChevronPrev = isRTL ? ChevronRight : ChevronLeft;
  const NavChevronNext = isRTL ? ChevronLeft : ChevronRight;

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % servicesMetadata.length;
    setActiveId(servicesMetadata[nextIndex].id);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + servicesMetadata.length) % servicesMetadata.length;
    setActiveId(servicesMetadata[prevIndex].id);
  }, [activeIndex]);

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 scroll-mt-28 overflow-hidden bg-[#FAF8F5]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(147, 78, 52, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(147, 78, 52, 0.03) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06] filter blur-[80px]"
          animate={{ backgroundColor: activeMeta.accentHex }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04] filter blur-[60px]"
          animate={{ backgroundColor: activeMeta.accentHex }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <div className="absolute top-10 right-10 text-charcoal/10 font-mono text-[10px] tracking-wider hidden lg:block select-none">+ LAT: 24.7136° N</div>
        <div className="absolute top-10 left-10 text-charcoal/10 font-mono text-[10px] tracking-wider hidden lg:block select-none">+ LNG: 46.6753° E</div>
        <div className="absolute bottom-10 right-10 text-charcoal/10 font-mono text-[10px] tracking-wider hidden lg:block select-none">+ AZIMUTH: 184.2°</div>
        <div className="absolute bottom-10 left-10 text-charcoal/10 font-mono text-[10px] tracking-wider hidden lg:block select-none">+ GRID_REF: {activeMeta.id.toUpperCase()}-0{activeIndex + 1}</div>
      </div>

      {/* Blueprint Ruler */}
      <div className="absolute top-0 left-0 right-0 h-5 border-b border-charcoal/[0.04] hidden md:flex items-center justify-between px-10 text-[9px] font-mono text-charcoal/20 select-none">
        <span>[ STATUS: SYSTEM_ONLINE ]</span>
        <span className="tracking-[0.5em] opacity-40">| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |</span>
        <span>[ SECTION: SERVICES_05 ]</span>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <MotionReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-earth-brown/[0.05] border border-earth-brown/[0.1] text-earth-brown mb-6">
              <Zap size={14} className="text-equipment-orange animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase">{t.services.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-6 leading-tight tracking-tight">
              {t.services.title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-equipment-orange via-earth-brown-light to-earth-brown">
                {t.services.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-concrete-gray leading-relaxed font-medium max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* Interactive Layout */}
        <div className="w-full">
          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
            {/* Tab Selection */}
            <div className="col-span-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-charcoal/[0.06] overflow-hidden flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
              <div className="p-5 border-b border-charcoal/[0.06] bg-charcoal/[0.01] flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-charcoal/40 uppercase tracking-wider">[ {t.services.systemsList} ]</span>
                <span className="text-[10px] font-mono text-charcoal/40">SELECT_SERVICE</span>
              </div>
              <div className="flex flex-col divide-y divide-charcoal/[0.04]">
                {servicesMetadata.map((service, index) => {
                  const isActive = activeId === service.id;
                  const content = t.services.items[index];
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveId(service.id)}
                      className={cn("relative w-full cursor-pointer focus:outline-none transition-all duration-300", isRTL ? "text-right" : "text-left")}
                    >
                      <div className={`px-7 py-6 transition-all duration-300 flex flex-col gap-1.5 ${isActive ? "bg-white shadow-[inset_-3px_0_0_0_rgba(0,0,0,0.1),0_4px_24px_rgba(0,0,0,0.02)]" : "hover:bg-charcoal/[0.01]"}`}>
                        {/* Side Highlight Bar */}
                        <motion.div
                          className={cn("absolute top-0 bottom-0 w-[4px]", isRTL ? "right-0" : "left-0")}
                          style={{ backgroundColor: service.accentHex }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="flex items-center justify-between">
                          <div className={cn("flex flex-col", isRTL ? "items-start text-right" : "items-start text-left")}>
                            <h4 className={`text-[17px] font-black transition-colors duration-300 ${isActive ? "text-charcoal" : "text-charcoal/60"}`}>
                              {locale === "ar" ? content.titleAr : content.titleEn}
                            </h4>
                          </div>
                          <span
                            className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? "font-bold" : "text-charcoal/30"}`}
                            style={{ color: isActive ? service.accentHex : undefined }}
                          >
                            [ 0{index + 1} ]
                          </span>
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-[13px] text-concrete-gray-light leading-relaxed mt-2">{content.description}</p>
                              <div className={cn("mt-3 flex items-center gap-1.5 text-[10px] font-black", isRTL ? "justify-end" : "justify-start")} style={{ color: service.accentHex }}>
                                <span>{t.services.viewFullSpecs}</span>
                                <ViewArrow size={10} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Viewport */}
            <div className="col-span-7 bg-white rounded-2xl border border-charcoal/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between">
              {/* Status Header */}
              <div className="px-6 py-4 bg-charcoal/[0.01] border-b border-charcoal/[0.05] flex items-center justify-between text-[11px] font-mono text-charcoal/40">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeMeta.accentHex }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeMeta.accentHex }} />
                    </span>
                    <span className="font-bold tracking-wider text-[10px] uppercase text-charcoal/60">SYSTEM_LIVE</span>
                  </div>
                  <span className="opacity-30">|</span>
                  <span>VIEW: {activeMeta.id.toUpperCase()}-0{activeIndex + 1}</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-charcoal/5 font-bold">W-X64</span>
              </div>

              {/* Content Panel */}
              <div className="p-6 md:p-8 flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[16/9.5] w-full rounded-xl overflow-hidden border border-charcoal/[0.08] bg-sand-light/10 shadow-inner group">
                        <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)] bg-[size:28px_28px]" />
                        <Image src={activeMeta.imagePath} alt="" fill className="object-cover blur-md opacity-25 scale-110 pointer-events-none" sizes="10vw" />
                        <Image src={activeMeta.imagePath} alt={activeContent.titleAr} fill className="object-contain z-10 transition-transform duration-700 ease-out group-hover:scale-102" sizes="(max-width: 1280px) 60vw, 800px" priority />
                        <div className="absolute inset-0 mix-blend-multiply opacity-[0.06] transition-all duration-700 pointer-events-none" style={{ backgroundColor: activeMeta.accentHex }} />
                        <div className="absolute top-3 right-3 z-10 w-4 h-4 border-t border-r border-white/40 pointer-events-none" />
                        <div className="absolute top-3 left-3 z-10 w-4 h-4 border-t border-l border-white/40 pointer-events-none" />
                        <div className="absolute bottom-3 right-3 z-10 w-4 h-4 border-b border-r border-white/40 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 z-10 w-4 h-4 border-b border-l border-white/40 pointer-events-none" />
                        <div className="absolute left-0 right-0 h-[1.5px] bg-white/25 depth-scan z-15 pointer-events-none" />

                        {activeMeta.stat && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className={cn("absolute bottom-4 z-20 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3.5 shadow-lg", isRTL ? "right-4 text-right" : "left-4 text-left")}
                            style={{ background: "linear-gradient(135deg, rgba(31,31,31,0.9) 0%, rgba(31,31,31,0.8) 100%)" }}
                          >
                            <span className="text-3xl font-black block text-white font-mono leading-none tracking-tight" dir="ltr">{activeMeta.stat}</span>
                            {activeContent.statLabel && (
                              <span className="text-[9px] text-white/50 font-bold block mt-1 tracking-wider uppercase">{activeContent.statLabel}</span>
                            )}
                          </motion.div>
                        )}
                      </div>

                      {/* Scope of Work */}
                      <div className="mt-8">
                        <div className="flex items-center justify-between border-b border-charcoal/[0.06] pb-3 mb-5">
                          <h5 className="text-[11px] font-mono font-bold text-charcoal/40 uppercase tracking-widest">
                            [ {t.services.scopeOfWork} ]
                          </h5>
                          <span className="text-[10px] font-mono font-bold" style={{ color: activeMeta.accentHex }}>
                            {(locale === "ar" ? activeContent.titleAr : activeContent.titleEn).toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {activeContent.includes.map((text, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col gap-3 p-4 rounded-xl bg-sand-light/20 border border-charcoal/[0.04] hover:bg-white hover:border-charcoal/[0.1] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 group"
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                                style={{ backgroundColor: `${activeMeta.accentHex}08`, borderColor: `${activeMeta.accentHex}18` }}
                              >
                                <div className="relative w-4.5 h-4.5">
                                  <Image src={activeMeta.iconPaths[idx]} alt={text} fill className="object-contain" />
                                </div>
                              </div>
                              <span className="text-charcoal/80 font-bold text-[13px] leading-snug group-hover:text-charcoal transition-colors duration-300">
                                {text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-8 pt-6 border-t border-charcoal/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {servicesMetadata.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setActiveId(service.id)}
                            className="group p-1 cursor-pointer focus:outline-none"
                            aria-label={t.services.items[servicesMetadata.indexOf(service)].titleAr}
                          >
                            <div
                              className="h-1 rounded-full transition-all duration-300"
                              style={{
                                width: activeId === service.id ? "24px" : "6px",
                                backgroundColor: activeId === service.id ? activeMeta.accentHex : "rgba(0,0,0,0.08)"
                              }}
                            />
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={handlePrev} className="w-8 h-8 rounded-lg bg-charcoal/[0.02] hover:bg-charcoal/[0.05] border border-charcoal/[0.06] flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-all cursor-pointer focus:outline-none" aria-label="Previous">
                          <NavChevronPrev size={14} />
                        </button>
                        <span className="text-[11px] font-mono text-charcoal/40 font-bold">0{activeIndex + 1} / 0{servicesMetadata.length}</span>
                        <button onClick={handleNext} className="w-8 h-8 rounded-lg bg-charcoal/[0.02] hover:bg-charcoal/[0.05] border border-charcoal/[0.06] flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-all cursor-pointer focus:outline-none" aria-label="Next">
                          <NavChevronNext size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="lg:hidden flex flex-col gap-4">
            {servicesMetadata.map((service, index) => {
              const isActive = activeId === service.id;
              const content = t.services.items[index] as {
                titleAr: string;
                titleEn: string;
                description: string;
                includes: readonly string[];
                statLabel?: string;
              };
              return (
                <div
                  key={service.id}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden bg-white",
                    isRTL ? "text-right" : "text-left",
                    isActive ? "border-charcoal/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : "border-charcoal/[0.05] shadow-sm"
                  )}
                >
                  <button
                    className={cn("w-full flex items-center justify-between p-5 cursor-pointer select-none focus:outline-none", isRTL ? "text-right" : "text-left")}
                    onClick={() => setActiveId(service.id)}
                  >
                    <div className={cn("flex flex-col", isRTL ? "items-start text-right" : "items-start text-left")}>
                      <h4 className={`text-base font-black transition-colors ${isActive ? "text-charcoal" : "text-charcoal/70"}`}>
                        {locale === "ar" ? content.titleAr : content.titleEn}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ChevronLeft size={15} className={`transition-transform duration-300 text-charcoal/40 ${isActive ? "-rotate-90" : isRTL ? "rotate-180" : ""}`} />
                      <span className="text-[10px] font-mono font-bold" style={{ color: isActive ? service.accentHex : "rgba(0,0,0,0.3)" }}>
                        [ 0{index + 1} ]
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 border-t border-charcoal/[0.04] pt-5 flex flex-col gap-5">
                          {/* Image Box */}
                          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-charcoal/[0.06] bg-sand-light/10">
                            <div className="absolute inset-0 z-10 pointer-events-none opacity-15 bg-[linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)] bg-[size:24px_24px]" />
                            <Image src={service.imagePath} alt="" fill className="object-cover blur-md opacity-25 scale-110 pointer-events-none" sizes="10vw" />
                            <Image src={service.imagePath} alt={locale === "ar" ? content.titleAr : content.titleEn} fill className="object-contain z-10" sizes="100vw" />
                            <div className="absolute inset-0 mix-blend-multiply opacity-[0.06]" style={{ backgroundColor: service.accentHex }} />
                            {service.stat && (
                              <div className={cn("absolute bottom-3 z-20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2", isRTL ? "right-3 text-right" : "left-3 text-left")} style={{ background: "linear-gradient(135deg, rgba(31,31,31,0.9) 0%, rgba(31,31,31,0.8) 100%)" }}>
                                <span className="text-2xl font-black block text-white font-mono leading-none" dir="ltr">{service.stat}</span>
                                {content.statLabel && <span className="text-[8px] text-white/50 font-bold block mt-0.5 tracking-wider uppercase">{content.statLabel}</span>}
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-concrete-gray leading-relaxed">{content.description}</p>

                          <div className="flex flex-col gap-2.5">
                            <h5 className="text-[10px] font-mono font-bold text-charcoal/40 tracking-wider">[ {t.services.serviceIncludes} ]</h5>
                            <div className="flex flex-col gap-2">
                              {content.includes.map((text, idx) => (
                                <div key={idx} className="flex items-center gap-3.5 p-3 rounded-xl bg-sand-light/10 border border-charcoal/[0.04]">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0" style={{ backgroundColor: `${service.accentHex}08`, borderColor: `${service.accentHex}18` }}>
                                    <div className="relative w-4 h-4">
                                      <Image src={service.iconPaths[idx]} alt={text} fill className="object-contain" />
                                    </div>
                                  </div>
                                  <span className="text-charcoal/80 font-bold text-xs">{text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
