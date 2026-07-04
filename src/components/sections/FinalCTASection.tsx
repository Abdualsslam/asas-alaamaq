"use client";

import { useRef } from "react";
import { Mail, Phone, MapPin, HardHat, Building2, ChevronLeft } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityShapes = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 scroll-mt-28 overflow-hidden bg-[#0a0a0a] border-t border-white/5"
    >
      {/* Dynamic Background */}
      <motion.div
        style={{ y: yBackground, opacity: opacityShapes }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-equipment-orange/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-earth-brown/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        
        {/* Animated Grid lines */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
               backgroundSize: "4rem 4rem",
               maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
               WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
             }}
        />
      </motion.div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content Side */}
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 bg-equipment-orange/10 px-4 py-2 rounded-full border border-equipment-orange/20 mb-8 backdrop-blur-sm">
                <HardHat className="w-5 h-5 text-equipment-orange" />
                <span className="text-equipment-orange font-bold text-sm tracking-wide">خطوتك القادمة تبدأ هنا</span>
              </div>
              
              <h2 className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-6">
                لديك مشروع يتطلب حفرًا
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-equipment-orange to-sand-secondary">
                  آمنًا ومستقرًا؟
                </span>
              </h2>

              <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                دعنا نناقش ظروف الموقع، عمق الحفر، تحديات التربة، ومتطلبات التنفيذ. 
                فريقنا الهندسي جاهز لتقديم حلول مبتكرة تتناسب مع واقع مشروعك بدقة متناهية.
              </p>

              {/* Stats/Highlights */}
              <div className="grid grid-cols-2 gap-6 mb-8 lg:mb-0">
                {[
                  { icon: Building2, label: "خبرة هندسية", value: "حلول موثوقة" },
                  { icon: MapPin, label: "تغطية شاملة", value: "تنفيذ دقيق" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-equipment-orange/10 flex items-center justify-center shrink-0 border border-equipment-orange/20">
                      <stat.icon className="w-6 h-6 text-equipment-orange" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{stat.value}</div>
                      <div className="text-white/50 text-xs">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interactive Cards Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Main Contact Card */}
            <div className="relative bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-equipment-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-white mb-3">تواصل مع الخبراء</h3>
                  <p className="text-white/50 text-sm">نحن متاحون للرد على استفساراتكم ومناقشة تفاصيل مشروعكم</p>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={contactInfo.whatsapp.getLink()}
                  target="_blank"
                  className="flex items-center justify-between bg-gradient-to-r from-[#25D366] to-[#20BD5A] p-5 rounded-2xl transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <WhatsAppIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">واتساب</div>
                      <div className="text-white/90 text-sm">رد سريع وفوري</div>
                    </div>
                  </div>
                  <ChevronLeft className="w-6 h-6 text-white/70 relative z-10" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={contactInfo.getMailtoLink()}
                  className="flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 p-5 rounded-2xl transition-all group/mail"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover/mail:bg-white/10 transition-colors">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">البريد الإلكتروني</div>
                      <div className="text-white/50 text-sm" dir="ltr">{contactInfo.email}</div>
                    </div>
                  </div>
                  <ChevronLeft className="w-6 h-6 text-white/30 group-hover/mail:text-white/70 transition-colors" />
                </motion.a>

                <div className="pt-8 mt-8 border-t border-white/5">
                  <div className="text-center text-white/40 text-sm mb-5 font-medium">أو اتصل بنا مباشرة</div>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    {contactInfo.phones.map((phone, idx) => (
                      <a
                        key={phone.raw}
                        href={`tel:${phone.raw}`}
                        className="flex items-center justify-center gap-3 hover:text-equipment-orange transition-colors text-white/80 bg-white/5 hover:bg-white/10 py-3 px-6 rounded-xl border border-white/5"
                        dir="ltr"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="font-bold tracking-wider">{phone.display}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative animated elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-equipment-orange to-earth-brown rounded-full blur-3xl opacity-20 animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-sand-secondary to-equipment-orange rounded-full blur-3xl opacity-20 animate-[pulse_5s_ease-in-out_infinite]" style={{ animationDelay: "2s" }} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
