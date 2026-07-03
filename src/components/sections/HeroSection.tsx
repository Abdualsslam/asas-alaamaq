"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { SlotText } from "slot-text/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Depth ruler levels (metres). 0 = ground surface. */
const depthLevels = [0, 3, 6, 9, 12, 15] as const;

/** Rolls a metre value in via slot-text; static text for reduced-motion. */
function DepthValue({
  value,
  ready,
  reduce,
}: {
  value: number;
  ready: boolean;
  reduce: boolean | null;
}) {
  if (reduce) return <>{value}</>;
  return (
    <SlotText
      text={String(ready ? value : 0)}
      options={{ direction: "down", stagger: 40, duration: 380, bounce: 0.28 }}
    />
  );
}

/**
 * Deterministic dust particles — generated at module load. Rendered client-only
 * (see useSyncExternalStore below) to avoid SSR/CSR float mismatches.
 */
const PARTICLES = Array.from({ length: 26 }, (_, i) => {
  const seed = (n: number) => {
    const x = Math.sin((i + 1) * n) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: (seed(12.9898) * 100).toFixed(3),
    top: (40 + seed(78.233) * 60).toFixed(3),
    size: (1.5 + seed(37.719) * 3).toFixed(2),
    duration: (9 + seed(3.14) * 11).toFixed(2),
    delay: (seed(9.71) * 9).toFixed(2),
    opacity: (0.15 + seed(5.55) * 0.4).toFixed(3),
  };
});

/** Services displayed in the strip below the hero */
const heroServices = [
  "سند الحفريات",
  "الشوتكريت",
  "الميكروبايل",
  "نزح المياه",
  "التصريف تحت السطحي",
];

const headlineParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const headlineLine: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  // Client-only gate for decorative particles (hydration-safe).
  const isClient = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
  // Content stays hidden until the intro video reaches its final frame.
  const [revealed, setRevealed] = useState(false);
  // Ambient: depth-ruler numbers roll from 0 to their values shortly after mount.
  const [rulerReady, setRulerReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Pause the video for reduced-motion users (it stays on the poster frame).
  useEffect(() => {
    const video = videoRef.current;
    if (video && reduceMotion) video.pause();
  }, [reduceMotion]);

  // Reveal the content after the video ends. Reduced-motion reveals instantly;
  // a fallback timer guarantees the content appears even if `ended` never fires.
  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), reduceMotion ? 0 : 3200);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setTimeout(() => setRulerReady(true), 650);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  const anim = revealed ? "visible" : "hidden";

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-white"
      >
        {/* ---------- Video background (plays once, rests on last frame) ---------- */}
        <motion.div
          style={reduceMotion ? undefined : { y: videoY, scale: videoScale }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover brightness-[0.78] contrast-[1.05] saturate-[1.1]"
            poster="/hero-poster.jpg"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={() => setRevealed(true)}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ---------- Cinematic scrims (lighter, focused on text side) ---------- */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-charcoal/88 via-charcoal/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
        <div className="film-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />

        {/* ---------- Dust particles (ambient, during & after video) ---------- */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {isClient &&
            PARTICLES.map((p, idx) => (
              <span
                key={idx}
                className="hero-particle"
                style={
                  {
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                    "--p-opacity": p.opacity,
                  } as CSSProperties
                }
              />
            ))}
        </div>

        {/* ---------- Depth ruler (desktop, ambient) ---------- */}
        <div className="pointer-events-none absolute inset-y-0 left-6 z-10 hidden items-center lg:flex xl:left-10">
          <div className="relative flex h-[56vh] flex-col justify-between">
            <span className="absolute right-[5px] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
            <span className="depth-scan absolute right-[3px] h-1 w-1 -translate-y-1/2 rounded-full bg-equipment-orange shadow-[0_0_8px_2px_rgba(217,107,43,0.7)]" />
            {depthLevels.map((level, idx) => (
              <div key={level} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-px",
                    idx === 0 ? "w-4 bg-white/70" : "w-3 bg-white/40"
                  )}
                />
                <div className="flex flex-col leading-none">
                  <span
                    dir="ltr"
                    className={cn(
                      "flex items-center font-mono tracking-wider",
                      idx === 0
                        ? "text-[12px] text-white/80"
                        : "text-[11px] text-white/55"
                    )}
                  >
                    {idx !== 0 && "-"}
                    <DepthValue value={level} ready={rulerReady} reduce={reduceMotion} />m
                  </span>
                  {idx === 0 && (
                    <span className="mt-1 text-[9px] tracking-wide text-white/45">
                      سطح الأرض
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Content (revealed after video) ---------- */}
        <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-32 md:pb-36">
          <motion.div
            style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
            className="max-w-3xl"
          >
            {/* Editorial eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={anim}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 flex items-center gap-3"
            > <span dir="ltr" className="flex items-center gap-2">
                <span className="h-px w-14 bg-gradient-to-l from-equipment-orange to-equipment-orange/10" />
                <span className="h-1.5 w-1.5 rotate-45 bg-equipment-orange shadow-[0_0_8px_rgba(217,107,43,0.55)]" />

              </span>
              <span className="text-sm font-semibold tracking-wide text-equipment-orange">
                هندسة أرضية متخصصة
              </span>

            </motion.div>

            {/* Headline — masked line reveal */}
            <motion.h1
              variants={headlineParent}
              initial="hidden"
              animate={anim}
              className="hero-text-shadow mb-7 font-black leading-[1.18] text-[clamp(2.4rem,5.6vw,4.8rem)]"
            >
              <span className="block overflow-hidden pt-2 pb-1">
                <motion.span variants={headlineLine} className="block text-white">
                  نُسيطر على التربة
                </motion.span>
              </span>
              <span className="block overflow-hidden pt-2 pb-1">
                <motion.span
                  variants={headlineLine}
                  className="block bg-gradient-to-l from-[#E8D0B0] via-[#C9A06C] to-[#A67B4B] bg-clip-text text-transparent"
                >
                  قبل أن تسيطر على المشروع
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={anim}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hero-text-shadow mb-10 max-w-[600px] border-r-2 border-equipment-orange/40 pr-5 text-base leading-relaxed text-white/75 md:text-lg"
            >
              حلول هندسية متخصصة في سند الحفريات، الشوتكريت، الميكروبايل، نزح
              المياه، والتصريف تحت السطحي — لضمان استقرار الموقع وسلامة التنفيذ.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={anim}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://wa.me/966501850513"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-equipment-orange py-2 pr-7 pl-2 text-base font-semibold text-white shadow-lg shadow-equipment-orange/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c25f24] hover:shadow-xl hover:shadow-equipment-orange/40"
              >
                ناقش مشروعك معنا
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:-translate-x-1">
                  <ArrowLeft size={16} />
                </span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-4 text-base font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/10"
              >
                استعرض خدماتنا
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.a
            href="#risks"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pointer-events-auto absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
            aria-label="اكتشف المزيد"
          >
            <span className="text-xs tracking-wider text-white/50">اكتشف المزيد</span>
            <ArrowDown
              size={18}
              className="animate-bounce text-equipment-orange motion-reduce:animate-none"
            />
          </motion.a>
        </Container>
      </section>

      {/* ---------- Services strip (below hero, in normal flow) ---------- */}
      <div className="relative z-10 border-t border-white/10 bg-charcoal">
        <Container>
          <div className="flex items-center justify-center py-5 overflow-x-auto">
            {heroServices.map((service, idx) => (
              <div key={service} className="flex items-center shrink-0">
                <span className="px-4 md:px-6 py-1 text-sm font-medium tracking-wide text-white/65 md:text-[0.9rem]">
                  {service}
                </span>
                {idx < heroServices.length - 1 && (
                  <span className="h-4 w-px bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ---------- Transition spacer: charcoal → sand-light ---------- */}
      <div
        className="h-20 md:h-24"
        style={{
          background: "linear-gradient(to bottom, var(--color-charcoal), var(--color-sand-light))",
        }}
      />
    </>
  );
}
