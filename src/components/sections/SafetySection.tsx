"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, HardHat, Building2, Target, CheckCircle2, Activity, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function SafetySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gray-50 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-earth-brown/5 blur-[120px]" />
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-charcoal/5 blur-[100px]" />
        
        {/* Subtle engineering grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <Container className="relative z-10">
        <MotionReveal>
          <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-brown/10 text-earth-brown text-sm font-bold mb-6 border border-earth-brown/20">
                <Target size={18} />
                <span>الهدف الاستراتيجي</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-[1.2]">
                السلامة ليست مجرد إجراءات<br/>
                <span className="text-earth-brown relative">
                  بل نظام هندسي متكامل
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-earth-brown/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </span>
              </h2>
            </div>
            <p className="text-concrete-gray text-lg max-w-md md:mb-4">
              في أساس الأعماق، ندمج معايير السلامة في صميم التصميم الهندسي لضمان بيئة عمل خالية من المخاطر وتحقيق أقصى درجات الاستقرار.
            </p>
          </div>
        </MotionReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 max-w-7xl mx-auto">
          
          {/* Main Card (Worker Safety) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl bg-charcoal p-8 md:p-12 group flex flex-col justify-between min-h-[450px] shadow-2xl shadow-charcoal/20"
          >
            {/* Animated Background inside Main Card */}
            <motion.div 
              className="absolute inset-0 opacity-10 transition-opacity duration-1000 group-hover:opacity-20"
              style={{ y: bgY }}
            >
              <svg className="w-full h-[150%]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern-dark" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern-dark)" />
              </svg>
            </motion.div>

            {/* Glowing Orb */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-earth-brown/40 blur-[100px] rounded-full group-hover:bg-earth-brown/60 group-hover:scale-110 transition-all duration-1000" />
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />

            {/* Top Header of Main Card */}
            <div className="relative z-10 flex flex-wrap justify-between items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(147,78,52,0.5)] transition-all duration-500">
                <HardHat className="text-white" size={40} strokeWidth={1.5} />
              </div>
              
              <div className="flex flex-col items-end gap-3">
                {/* Live Status Indicator */}
                <div className="flex items-center gap-2 bg-charcoal/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">نظام المراقبة نشط</span>
                </div>
                
                {/* Zero Accidents Badge */}
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 px-5 py-2.5 rounded-full border border-green-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span className="font-bold text-sm tracking-wide">صفر حوادث</span>
                </div>
              </div>
            </div>

            {/* Bottom Content of Main Card */}
            <div className="relative z-10 mt-16 md:mt-24 max-w-xl">
              <div className="inline-flex items-center gap-2 text-earth-brown/80 mb-3">
                <Activity size={18} />
                <span className="text-sm font-semibold tracking-wider">الأولوية القصوى</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">سلامة العاملين في صميم أعمالنا</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                بيئة العمل الآمنة ليست خياراً بل التزام راسخ. نطبق أعلى معايير السلامة المهنية العالمية، ونوفر حماية متكاملة لجميع العاملين في الموقع، مدعومة بتدريب مستمر ومعدات وقاية متطورة وبروتوكولات طوارئ صارمة.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Excavation Stability */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 group hover:border-earth-brown/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-center"
          >
            {/* Hover Reveal Pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-earth-brown/5 rounded-full blur-3xl" />
              <svg className="absolute bottom-0 left-0 w-full h-1/2 text-earth-brown/5" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L100,100 L100,50 L0,100 Z" fill="currentColor" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-earth-brown group-hover:text-white transition-colors duration-500 text-earth-brown shadow-sm border border-gray-100">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-charcoal mb-4">استقرار الحفريات</h3>
              <p className="text-concrete-gray leading-relaxed">
                نضمن ثبات جدران الحفر في جميع المراحل من خلال أنظمة دعم مصممة هندسيًا ومراقبة جيوتقنية مستمرة لمنع أي انهيارات وضمان استقرار التربة.
              </p>
            </div>
            
            {/* Interactive Arrow */}
            <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-earth-brown">
              <ArrowLeft size={24} />
            </div>
          </motion.div>

          {/* Card 3: Adjacent Structures */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-1 lg:row-span-1 relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 group hover:border-earth-brown/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-center"
          >
             {/* Hover Reveal Pattern */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-charcoal/5 rounded-full blur-3xl" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_rgba(147,78,52,0.1),_transparent_70%)]" />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-charcoal group-hover:text-white transition-colors duration-500 text-charcoal shadow-sm border border-gray-100">
                <Building2 size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-charcoal mb-4">حماية المنشآت</h3>
              <p className="text-concrete-gray leading-relaxed">
                نراقب تأثير أعمال الحفر على المباني والبنية التحتية المحيطة بأدق الأجهزة الحساسة للاهتزازات، ونتخذ إجراءات وقائية استباقية لحمايتها.
              </p>
            </div>

            {/* Interactive Arrow */}
            <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-charcoal">
              <ArrowLeft size={24} />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
