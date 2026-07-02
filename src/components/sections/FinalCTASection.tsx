"use client";

import { MessageCircle, Mail, ArrowLeft } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function FinalCTASection() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-earth-brown via-earth-brown-dark to-charcoal"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <line x1="0" y1="80" x2="1440" y2="100" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="200" x2="1440" y2="190" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="320" x2="1440" y2="340" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="460" x2="1440" y2="450" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <MotionReveal>
            {/* Engineering line */}
            <div className="w-16 h-1 bg-white/30 mx-auto mb-8 relative">
              <div className="absolute right-0 top-[-2px] w-2 h-[6px] bg-equipment-orange" />
            </div>

            <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-6">
              لديك مشروع يتطلب حفرًا
              <br />
              <span className="text-sand-secondary">آمنًا ومستقرًا؟</span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              دعنا نناقش ظروف الموقع، عمق الحفر، تحديات التربة، ومتطلبات
              التنفيذ. فريق أساس الأعماق جاهز لتقديم الحل المناسب حسب واقع
              المشروع.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={contactInfo.whatsapp.getLink()}
                target="_blank"
                size="lg"
                icon={MessageCircle}
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-none shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 w-full sm:w-auto"
              >
                تواصل عبر واتساب
              </Button>
              <Button
                href={contactInfo.getMailtoLink()}
                size="lg"
                icon={Mail}
                variant="secondary"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
              >
                أرسل بريدًا إلكترونيًا
              </Button>
            </div>
          </MotionReveal>

          {/* Phone numbers */}
          <MotionReveal delay={0.35}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40 text-sm">
              <span>أو اتصل مباشرة:</span>
              {contactInfo.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                  dir="ltr"
                >
                  <ArrowLeft size={14} />
                  {phone.display}
                </a>
              ))}
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
