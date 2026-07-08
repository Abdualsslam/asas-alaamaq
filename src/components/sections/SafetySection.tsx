"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, HardHat, Building2, Target, CheckCircle2, Activity, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

export function SafetySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useTranslation();
  const InteractiveArrow = isRTL ? ArrowLeft : ArrowRight;
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-earth-brown/5 blur-[120px]" />
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-charcoal/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <Container className="relative z-10">
        <MotionReveal>
          <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-brown/10 text-earth-brown text-sm font-bold mb-6 border border-earth-brown/20">
                <Target size={18} />
                <span>{t.safety.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-[1.2]">
                {t.safety.title}<br/>
                <span className="text-earth-brown relative">
                  {t.safety.titleHighlight}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-earth-brown/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </span>
              </h2>
            </div>
            <p className="text-concrete-gray text-lg max-w-md md:mb-4">{t.safety.subtitle}</p>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 max-w-7xl mx-auto">
          {/* Main Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl bg-charcoal p-8 md:p-12 group flex flex-col justify-between min-h-[450px] shadow-2xl shadow-charcoal/20">
            <motion.div className="absolute inset-0 opacity-10 transition-opacity duration-1000 group-hover:opacity-20" style={{ y: bgY }}>
              <svg className="w-full h-[150%]" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="grid-pattern-dark" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern-dark)" />
              </svg>
            </motion.div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-earth-brown/40 blur-[100px] rounded-full group-hover:bg-earth-brown/60 group-hover:scale-110 transition-all duration-1000" />
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />

            <div className={cn("absolute bottom-0 w-full lg:w-[45%] h-[75%] lg:h-[90%] pointer-events-none select-none overflow-hidden", isRTL ? "left-0 rounded-bl-3xl" : "right-0 rounded-br-3xl")}>
              <Image src="/images/safety_worker.webp" alt="" fill className="object-cover object-bottom opacity-20 lg:opacity-30 group-hover:opacity-45 transition-opacity duration-700"
                style={{ WebkitMaskImage: `linear-gradient(to ${isRTL ? 'right' : 'left'}, black 30%, transparent 90%), linear-gradient(to top, black 85%, transparent 100%)`, maskImage: `linear-gradient(to ${isRTL ? 'right' : 'left'}, black 30%, transparent 90%), linear-gradient(to top, black 85%, transparent 100%)`, maskComposite: "intersect", WebkitMaskComposite: "source-in" }} />
            </div>

            <div className="relative z-10 flex flex-wrap justify-between items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(147,78,52,0.5)] transition-all duration-500">
                <HardHat className="text-white" size={40} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2 bg-charcoal/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
                  <div className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></div>
                  <span className="text-xs text-gray-300 font-medium">{t.safety.monitoringActive}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 px-5 py-2.5 rounded-full border border-green-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span className="font-bold text-sm tracking-wide">{t.safety.zeroAccidents}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 md:mt-24 max-w-xl">
              <div className="inline-flex items-center gap-2 text-earth-brown/80 mb-3">
                <Activity size={18} />
                <span className="text-sm font-semibold tracking-wider">{t.safety.topPriority}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.safety.mainCardTitle}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{t.safety.mainCardDescription}</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 group hover:border-earth-brown/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-center">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-earth-brown/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-earth-brown group-hover:text-white transition-colors duration-500 text-earth-brown shadow-sm border border-gray-100">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t.safety.card2Title}</h3>
              <p className="text-concrete-gray leading-relaxed">{t.safety.card2Description}</p>
            </div>
            <div className={cn("absolute bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-500 text-earth-brown", isRTL ? "left-8 translate-x-4 group-hover:translate-x-0" : "right-8 -translate-x-4 group-hover:translate-x-0")}>
              <InteractiveArrow size={24} />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 group hover:border-earth-brown/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-center">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-charcoal/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-charcoal group-hover:text-white transition-colors duration-500 text-charcoal shadow-sm border border-gray-100">
                <Building2 size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t.safety.card3Title}</h3>
              <p className="text-concrete-gray leading-relaxed">{t.safety.card3Description}</p>
            </div>
            <div className={cn("absolute bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-500 text-charcoal", isRTL ? "left-8 translate-x-4 group-hover:translate-x-0" : "right-8 -translate-x-4 group-hover:translate-x-0")}>
              <InteractiveArrow size={24} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
