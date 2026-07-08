"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Layers, ZoomIn } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";

const gallerySources = [
  { id: 1, src: "/images/gallary/img (1).webp" },
  { id: 2, src: "/images/gallary/img (2).webp" },
  { id: 3, src: "/images/gallary/img (3).webp" },
  { id: 4, src: "/images/gallary/img (4).webp" },
  { id: 5, src: "/images/gallary/img (5).webp" },
  { id: 6, src: "/images/gallary/img (6).webp" },
  { id: 7, src: "/images/gallary/img (7).webp" },
  { id: 8, src: "/images/gallary/img (8).webp" },
  { id: 9, src: "/images/gallary/img (9).webp" },
  { id: 10, src: "/images/gallary/img (10).webp" },
  { id: 11, src: "/images/gallary/img (11).webp" },
  { id: 12, src: "/images/gallary/img (12).webp" },
  { id: 13, src: "/images/gallary/img (13).webp" },
  { id: 14, src: "/images/gallary/img (14).webp" },
  { id: 15, src: "/images/gallary/img (15).webp" },
];

function getCardLayout(index: number): string {
  const pos = index % 5;
  switch (pos) {
    case 0: return "sm:col-span-2 h-[320px] md:h-[380px]";
    case 1: return "h-[320px] md:h-[380px]";
    case 2: return "h-[280px] md:h-[320px]";
    case 3: return "sm:col-span-2 h-[280px] md:h-[320px]";
    case 4: return "h-[280px] md:h-[320px]";
    default: return "h-[280px] md:h-[320px]";
  }
}

function GalleryCard({
  image,
  index,
  onOpen,
  layoutClass,
  label,
  category,
  brandWatermark,
}: {
  image: { id: number; src: string };
  index: number;
  onOpen: () => void;
  layoutClass: string;
  label: string;
  category: string;
  brandWatermark: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, type: "spring", bounce: 0.25 }}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${layoutClass}`}
      style={{ perspective: "1000px" }}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
    >
      <motion.div className="absolute inset-0 w-full h-full" animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: isHovered ? 1.05 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
        <Image src={image.src} alt={label} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
      </div>
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-wide">{category}</div>
      </div>
      <motion.div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-earth-brown/80 backdrop-blur-md flex items-center justify-center text-white" initial={{ opacity: 0, scale: 0.5 }} animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }}>
        <ZoomIn size={18} strokeWidth={2} />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        <motion.div initial={false} animate={isHovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
          <p className="text-white font-bold text-base leading-relaxed">{label}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-[2px] bg-earth-brown rounded-full" />
            <span className="text-white/60 text-xs font-medium">{brandWatermark}</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white/30 text-4xl font-black tabular-nums">{String(image.id).padStart(2, "0")}</span>
      </div>
    </motion.div>
  );
}

function Lightbox({ images, labels, categories, currentIndex, onClose, onNext, onPrev, onGoTo }: { images: typeof gallerySources; labels: string[]; categories: string[]; currentIndex: number; onClose: () => void; onNext: () => void; onPrev: () => void; onGoTo: (i: number) => void }) {
  const current = images[currentIndex];
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowLeft") onNext(); if (e.key === "ArrowRight") onPrev(); };
    window.addEventListener("keydown", handleKeyDown); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [onClose, onNext, onPrev]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[999] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-2xl" />
      <button onClick={onClose} className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"><X size={22} /></button>
      <div className="absolute top-6 right-6 z-50 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-bold tabular-nums"><span className="text-earth-brown">{String(currentIndex + 1).padStart(2, "0")}</span><span className="text-white/30 mx-2">/</span><span>{String(images.length).padStart(2, "0")}</span></div>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"><ChevronRight size={28} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"><ChevronLeft size={28} /></button>
      <motion.div key={current.id} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.4, type: "spring", bounce: 0.2 }} className="relative w-[90vw] h-[80vh] max-w-6xl z-10" onClick={(e) => e.stopPropagation()}>
        <Image src={current.src} alt={labels[currentIndex]} fill className="object-contain" sizes="90vw" priority />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent">
          <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-earth-brown/80 flex items-center justify-center"><Camera size={20} className="text-white" /></div><div><p className="text-white font-bold text-lg">{labels[currentIndex]}</p><p className="text-white/50 text-sm">{categories[currentIndex]}</p></div></div>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-[90vw] overflow-x-auto">
        {images.map((img, i) => (
          <button key={img.id} onClick={(e) => { e.stopPropagation(); onGoTo(i); }} className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 cursor-pointer ${i === currentIndex ? "ring-2 ring-earth-brown scale-110 opacity-100" : "opacity-40 hover:opacity-70"}`}>
            <Image src={img.src} alt={labels[i]} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilterIdx, setActiveFilterIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useTranslation();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const categories = t.projects.categories;
  const imagesMeta = t.projects.images;

  // Build gallery images with translations
  const galleryImages = gallerySources.map((src, idx) => ({
    ...src,
    label: imagesMeta[idx]?.label ?? "",
    category: imagesMeta[idx]?.category ?? "",
  }));

  const activeFilter = categories[activeFilterIdx];

  // Map Arabic filter to English filter for matching
  const arCatToIndex: Record<string, number> = {};
  categories.forEach((cat, idx) => { arCatToIndex[cat] = idx; });

  const filteredImages = activeFilterIdx === 0
    ? [
        ...galleryImages.filter((img) => img.category !== categories[1]),
        ...galleryImages.filter((img) => img.category === categories[1]),
      ]
    : galleryImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => prev !== null ? (prev + 1) % filteredImages.length : null);
  const prevImage = () => setLightboxIndex((prev) => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null);

  return (
    <>
      <section ref={sectionRef} id="projects" className="relative py-24 md:py-32 overflow-hidden bg-[#0F0F0F]">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: bgY1 }} className="absolute top-[5%] -right-[15%] w-[600px] h-[600px] bg-earth-brown/8 rounded-full blur-[150px]" />
          <motion.div style={{ y: bgY2 }} className="absolute bottom-[5%] -left-[15%] w-[500px] h-[500px] bg-amber-900/6 rounded-full blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-earth-brown/15 border border-earth-brown/25 text-earth-brown text-sm font-bold mb-6 backdrop-blur-sm">
                <Camera size={16} /><span>{t.projects.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.2]">
                {t.projects.title}{" "}
                <span className="relative inline-block text-earth-brown">
                  {t.projects.titleHighlight}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-earth-brown/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" /></svg>
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{t.projects.subtitle}</p>
            </div>
            <div className="flex gap-10 lg:gap-14 lg:mb-4">
              <div className={cn("lg:text-left", isRTL ? "text-center" : "text-center")}>
                <div className="flex items-center gap-2 mb-1"><Layers size={18} className="text-earth-brown" /><span className="text-3xl font-black text-white tabular-nums">+40</span></div>
                <span className="text-gray-500 text-sm font-medium">{t.projects.completedProjects}</span>
              </div>
              <div className="w-px bg-white/10 hidden lg:block" />
              <div className={cn("lg:text-left", isRTL ? "text-center" : "text-center")}>
                <div className="flex items-center gap-2 mb-1"><Camera size={18} className="text-earth-brown" /><span className="text-3xl font-black text-white tabular-nums">+10</span></div>
                <span className="text-gray-500 text-sm font-medium">{t.projects.yearsExperience}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat, idx) => (
              <button key={cat} onClick={() => setActiveFilterIdx(idx)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-400 border cursor-pointer ${activeFilterIdx === idx ? "bg-earth-brown text-white border-earth-brown shadow-[0_4px_20px_rgba(139,90,43,0.3)]" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"}`}>
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <GalleryCard key={image.id} image={image} index={index} onOpen={() => openLightbox(index)} layoutClass={getCardLayout(index)} label={image.label} category={image.category} brandWatermark={t.projects.brandWatermark} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} className="mt-16 h-px bg-gradient-to-r from-transparent via-earth-brown/30 to-transparent origin-center" />
        </Container>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            labels={filteredImages.map(i => i.label)}
            categories={filteredImages.map(i => i.category)}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            onGoTo={(i) => setLightboxIndex(i)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
