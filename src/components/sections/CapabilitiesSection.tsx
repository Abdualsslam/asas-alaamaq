"use client";

import { useRef, useState } from "react";
import { Pickaxe, Building, Combine, Zap, Compass, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const capabilities = [
  {
    title: "العمل في ظروف تربة معقدة",
    description: "نتعامل مع أنواع التربة الأكثر تحديًا — صخرية، طينية، رملية مشبعة — بحلول هندسية مصممة خصيصًا لضمان أعلى مستويات الاستقرار والأمان.",
    icon: Pickaxe,
    color: "from-[#8B5A2B] to-[#6b421c]",
    colSpan: "md:col-span-2", // Full width on medium+ screens
  },
  {
    title: "مواقع حضرية ضيقة",
    description: "خبرة في تنفيذ أعمال الحفر والدعم في مواقع محدودة المساحة ومحاطة بمنشآت قائمة دون التأثير على الجوار.",
    icon: Building,
    color: "from-stone-600 to-stone-800",
    colSpan: "md:col-span-1",
  },
  {
    title: "أنظمة دعم متكاملة",
    description: "نجمع بين تقنيات وتكنولوجيا مختلفة في مشروع واحد لتحقيق أفضل نتائج الاستقرار والأمان للمشاريع الكبرى.",
    icon: Combine,
    color: "from-amber-600 to-orange-700",
    colSpan: "md:col-span-1",
  },
  {
    title: "سرعة الاستجابة الطارئة",
    description: "فريق جاهز للتدخل السريع في المواقف الطارئة وتقديم حلول فورية لمشاكل الموقع بدقة واحترافية.",
    icon: Zap,
    color: "from-emerald-600 to-teal-800",
    colSpan: "md:col-span-1",
  },
  {
    title: "قرارات ميدانية حاسمة",
    description: "مهندسون ذوو خبرة يتخذون قرارات دقيقة في الموقع بناءً على الملاحظات الفعلية لضمان استمرارية وجودة العمل.",
    icon: Compass,
    color: "from-blue-600 to-indigo-800",
    colSpan: "md:col-span-1",
  },
];

const SpotlightCard = ({ cap, index }: { cap: any; index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

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
      className={cn(
        "relative group rounded-[2rem] p-[1px] overflow-hidden",
        cap.colSpan
      )}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* Outer Glow (Border) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139,90,43,0.5), transparent 40%)`,
        }}
      />
      
      {/* Inner Card */}
      <div className="relative h-full bg-white/60 backdrop-blur-xl rounded-[calc(2rem-1px)] p-8 overflow-hidden transition-all duration-500 group-hover:bg-white/90 group-hover:shadow-[0_8px_40px_rgb(139,90,43,0.08)]">
        
        {/* Inner Spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none"
          style={{
            opacity: opacity * 0.8,
            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(139,90,43,0.03), transparent 50%)`,
          }}
        />

        {/* Decorative corner blur */}
        <div className={cn(
          "absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none",
          cap.color
        )} />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                `bg-gradient-to-br ${cap.color}`
              )}
            >
              <cap.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>
            
            <div className="w-10 h-10 rounded-full bg-white/50 border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 rtl:-translate-x-4 rtl:group-hover:translate-x-0 shadow-sm">
              <ArrowLeft className="w-5 h-5 text-earth-brown" strokeWidth={2} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-earth-brown transition-colors duration-300">
            {cap.title}
          </h3>
          
          <p className="text-concrete-gray leading-relaxed text-lg mt-auto">
            {cap.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function CapabilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#F9F8F6] overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-earth-brown/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[10%] -left-[10%] w-[700px] h-[700px] bg-sand-dark/40 rounded-full blur-[150px]" 
        />
      </motion.div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Sticky Header Side */}
          <div className="lg:w-[40%] lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-earth-brown/10 border border-earth-brown/20 text-earth-brown font-semibold text-sm mb-8 backdrop-blur-sm shadow-inner">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-earth-brown opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-earth-brown"></span>
                </span>
                قدراتنا الأساسية
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-charcoal mb-8 leading-[1.3]">
                نحن لا نحفر فقط،<br />
                نحن نبتكر{" "}
                <span className="relative inline-block text-earth-brown">
                  الحلول
                  <svg className="absolute w-full h-4 -bottom-1 left-0 text-earth-brown/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-concrete-gray text-xl mb-12 leading-relaxed font-medium">
                في أساس الأعماق، ندمج بين أحدث التقنيات والخبرة الميدانية العميقة لتقديم حلول هندسية تتجاوز التوقعات، مهما بلغت تعقيدات الموقع.
              </p>

              <div className="flex gap-12 border-t border-earth-brown/15 pt-10">
                <div className="relative">
                  <div className="absolute -inset-4 bg-earth-brown/5 rounded-2xl blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="text-4xl font-black text-earth-brown mb-2">+15</div>
                    <div className="text-base text-concrete-gray font-bold">عاماً من الخبرة</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-earth-brown/5 rounded-2xl blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="text-4xl font-black text-earth-brown mb-2">%100</div>
                    <div className="text-base text-concrete-gray font-bold">دقة وموثوقية</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cards Grid Side */}
          <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
             {capabilities.map((cap, index) => (
               <SpotlightCard key={cap.title} cap={cap} index={index} />
             ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
