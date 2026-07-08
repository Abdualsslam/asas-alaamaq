"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Target, Layers, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";

// Custom SVG Icons
const SoilLayersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 5h20" /><path d="M2 12h20" strokeDasharray="3 3" /><path d="M2 19h20" />
    <circle cx="5" cy="8.5" r="0.6" fill="currentColor" stroke="none" /><circle cx="12" cy="8.5" r="0.6" fill="currentColor" stroke="none" /><circle cx="19" cy="8.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="8" cy="15.5" r="0.6" fill="currentColor" stroke="none" /><circle cx="16" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const UrbanBuildingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="10" width="8" height="11" rx="1" /><rect x="13" y="3" width="8" height="18" rx="1" /><path d="M6 14h2M6 18h2M16 7h2M16 11h2M16 15h2" />
  </svg>
);
const PlusCrossIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M5 12h14" /><rect x="3" y="3" width="18" height="18" rx="5" />
  </svg>
);
const SpeedResponseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 3M12 3V1M10 3h4" />
  </svg>
);
const FieldDecisionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 13a10 10 0 0 1 20 0H2z" /><path d="M12 3v10M8 5a6 6 0 0 1 8 0" />
    <rect x="6" y="16" width="12" height="6" rx="1" /><path d="M9 19h6M9 21h4" />
  </svg>
);

const capIcons = [SoilLayersIcon, UrbanBuildingsIcon, PlusCrossIcon, SpeedResponseIcon, FieldDecisionsIcon];
const colSpans = [
  "col-span-6 md:col-span-3 lg:col-span-2",
  "col-span-6 md:col-span-3 lg:col-span-2",
  "col-span-6 md:col-span-3 lg:col-span-2",
  "col-span-6 md:col-span-3 lg:col-span-3",
  "col-span-6 md:col-span-6 lg:col-span-3",
];

const SpotlightCard = ({ cap, index, number }: { cap: { title: string; description: string }; index: number; number: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const Icon = capIcons[index];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.3 }}
      className={cn("relative group rounded-3xl p-[1px] overflow-hidden bg-gradient-to-br from-earth-brown/10 to-transparent hover:from-earth-brown/25 transition-all duration-500", colSpans[index])}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139,90,43,0.25), transparent 40%)` }} />
      <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-6 md:p-8 overflow-hidden transition-all duration-500 group-hover:bg-[#FFFDFB]/95 group-hover:shadow-[0_12px_40px_rgb(139,90,43,0.06)] flex flex-col items-center text-center">
        <span className="absolute top-4 left-6 text-6xl md:text-7xl font-black text-earth-brown/[0.04] group-hover:text-earth-brown/[0.06] select-none pointer-events-none transition-colors duration-500 font-serif leading-none">{number}</span>
        <div className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none" style={{ opacity: opacity * 0.8, background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(139,90,43,0.02), transparent 50%)` }} />
        <div className="relative z-10 flex flex-col items-center h-full w-full">
          <div className="w-14 h-14 flex items-center justify-center text-earth-brown/85 group-hover:text-earth-brown group-hover:scale-110 transition-all duration-500 mb-4">
            <Icon className="w-9.5 h-9.5" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-charcoal mb-3 group-hover:text-earth-brown transition-colors duration-300">{cap.title}</h3>
          <p className="text-concrete-gray leading-relaxed text-sm md:text-base text-center font-medium max-w-sm">{cap.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function CapabilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useTranslation();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const titleParts = t.capabilities.title.split("\n");

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-[#FAF8F5] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: y1 }} className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-earth-brown/5 rounded-full blur-[120px]" />
          <motion.div style={{ y: y2 }} className="absolute bottom-[10%] -left-[10%] w-[700px] h-[700px] bg-sand-dark/40 rounded-full blur-[150px]" />
        </motion.div>
        <svg className="absolute w-full h-full text-earth-brown/[0.04]" xmlns="http://www.w3.org/2000/svg">
          <path d="M1000,-50 C1200,100 1400,200 1600,150 C1800,100 1900,300 2100,200" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,100 C100,150 250,80 400,180 C550,280 700,120 900,220" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#8B5A2B 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          <div className={cn("w-full lg:w-[58%] flex flex-col", isRTL ? "text-right items-start" : "text-left items-start")}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full flex flex-col items-start">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-earth-brown/5 border border-earth-brown/20 text-earth-brown font-semibold text-sm mb-6 shadow-sm">
                <span className="text-earth-brown font-black text-[10px]">♦</span>
                {t.capabilities.badge}
              </div>
              <h2 className={cn("text-3xl md:text-5xl lg:text-[3rem] lg:leading-[1.2] font-black text-charcoal mb-6 leading-tight w-full", isRTL ? "text-right" : "text-left")}>
                {titleParts[0]}<br />{titleParts[1]}
              </h2>
              <p className={cn("text-[#5C554D] text-base md:text-lg lg:text-xl leading-relaxed font-medium mb-8 w-full", isRTL ? "text-right" : "text-left")}>
                {t.capabilities.subtitle}
              </p>
              <div className="inline-flex flex-wrap md:flex-nowrap items-center justify-start gap-4 md:gap-8 px-6 py-4 rounded-2xl border border-earth-brown/15 bg-earth-brown/[0.02] backdrop-blur-sm w-fit shadow-inner">
                {[Target, Layers, ShieldCheck].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-charcoal font-bold text-sm md:text-base">
                    {i > 0 && <div className="h-5 w-[1px] bg-earth-brown/15 hidden md:block" />}
                    <Icon className="w-5 h-5 text-earth-brown" strokeWidth={2} />
                    <span>{t.capabilities.processSteps[i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-[42%] flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative w-full aspect-[4/3] max-w-[480px] lg:max-w-none">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image src="/images/capabilities.webp" alt="" fill className="object-cover object-center opacity-90 select-none" style={{ WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 100%)", maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 100%)" }} />
              </div>
              <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF8F5] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FAF8F5] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FAF8F5] to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 w-full">
          {t.capabilities.items.map((cap, index) => (
            <SpotlightCard key={cap.title} cap={cap} index={index} number={String(index + 1).padStart(2, "0")} />
          ))}
        </div>
      </Container>
    </section>
  );
}
