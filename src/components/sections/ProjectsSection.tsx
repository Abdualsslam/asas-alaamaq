"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Layers, ZoomIn } from "lucide-react";
import { Container } from "@/components/ui/Container";

const galleryImages = [
  {
    id: 1,
    src: "/images/gallary/img (1).webp",
    label: "تمديد الأنابيب المثقبة للتصريف",
    category: "الأنابيب المثقبة",
  },
  {
    id: 2,
    src: "/images/gallary/img (2).webp",
    label: "أعمال حفر الخوازيق",
    category: "ميكروبايل",
  },
  {
    id: 3,
    src: "/images/gallary/img (3).webp",
    label: "سند حفريات عميقة",
    category: "سند حفريات",
  },
  {
    id: 4,
    src: "/images/gallary/img (4).webp",
    label: "تركيب أنظمة التثبيت",
    category: "سند حفريات",
  },
  {
    id: 5,
    src: "/images/gallary/img (5).webp",
    label: "جدران الخوازيق المتلاصقة",
    category: "ميكروبايل",
  },
  {
    id: 6,
    src: "/images/gallary/img (6).webp",
    label: "معدات ضخ ونزح المياه الجوفية",
    category: "نزح مياه",
  },
  {
    id: 7,
    src: "/images/gallary/img (7).webp",
    label: "تجهيز موقع العمل",
    category: "سند حفريات",
  },
  {
    id: 8,
    src: "/images/gallary/img (8).webp",
    label: "أنظمة الدعم المؤقت",
    category: "سند حفريات",
  },
  {
    id: 9,
    src: "/images/gallary/img (9).webp",
    label: "رقابة جودة ميدانية",
    category: "ميكروبايل",
  },
  {
    id: 10,
    src: "/images/gallary/img (10).webp",
    label: "معدات الحفر الثقيلة",
    category: "سند حفريات",
  },
  {
    id: 11,
    src: "/images/gallary/img (11).webp",
    label: "أعمال التسليح والصب",
    category: "ميكروبايل",
  },
  {
    id: 12,
    src: "/images/gallary/img (12).webp",
    label: "أعمال التدعيم وسند الجوانب الخشبي",
    category: "سند حفريات",
  },
  {
    id: 13,
    src: "/images/gallary/img (13).webp",
    label: "تنفيذ ميداني متقدم",
    category: "شوتكريت",
  },
  {
    id: 14,
    src: "/images/gallary/img (14).webp",
    label: "أنظمة نزح المياه الجوفية",
    category: "نزح مياه",
  },
  {
    id: 15,
    src: "/images/gallary/img (15).webp",
    label: "تركيب شبكات الأنابيب المثقبة بالموقع",
    category: "الأنابيب المثقبة",
  },
];

/* ─── Layout pattern: repeating 5-card rows ─── */
// Row pattern repeats every 5 images:
//   Row A: 1 large (col-span-2) + 1 normal → 3 columns
//   Row B: 1 normal + 1 large (col-span-2) → 3 columns  
//   Row C: 3 normal → 3 columns
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

/* ─── Gallery Card with parallax tilt ─── */
function GalleryCard({
  image,
  index,
  onOpen,
  layoutClass,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onOpen: () => void;
  layoutClass: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -8, y: x * 8 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        type: "spring",
        bounce: 0.25,
      }}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${layoutClass}`}
      style={{
        perspective: "1000px",
      }}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Image
          src={image.src}
          alt={image.label}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Gradient Overlay — always visible subtly, more on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />

      {/* Shimmer line on hover */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
      </div>

      {/* Top Badge */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-wide">
          {image.category}
        </div>
      </div>

      {/* Zoom icon */}
      <motion.div
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-earth-brown/80 backdrop-blur-md flex items-center justify-center text-white"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <ZoomIn size={18} strokeWidth={2} />
      </motion.div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        <motion.div
          initial={false}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-white font-bold text-base leading-relaxed">
            {image.label}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-[2px] bg-earth-brown rounded-full" />
            <span className="text-white/60 text-xs font-medium">
              أساس الأعماق
            </span>
          </div>
        </motion.div>
      </div>

      {/* Number Badge (bottom-right, subtle) */}
      <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white/30 text-4xl font-black tabular-nums">
          {String(image.id).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox / Modal ─── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onGoTo,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNext(); // RTL: left = next
      if (e.key === "ArrowRight") onPrev(); // RTL: right = prev
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-2xl" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 right-6 z-50 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-bold tabular-nums">
        <span className="text-earth-brown">{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="text-white/30 mx-2">/</span>
        <span>{String(images.length).padStart(2, "0")}</span>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronRight size={28} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        className="relative w-[90vw] h-[80vh] max-w-6xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.label}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />

        {/* Image Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-earth-brown/80 flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">{current.label}</p>
              <p className="text-white/50 text-sm">{current.category}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-[90vw] overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={(e) => {
              e.stopPropagation();
              onGoTo(i);
            }}
            className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 cursor-pointer ${
              i === currentIndex
                ? "ring-2 ring-earth-brown scale-110 opacity-100"
                : "opacity-40 hover:opacity-70"
            }`}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function ProjectsSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("الكل");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const categories = [
    "الكل",
    "سند حفريات",
    "شوتكريت",
    "نزح مياه",
    "ميكروبايل",
    "الأنابيب المثقبة"
  ];

  const filteredImages =
    activeFilter === "الكل"
      ? [
          ...galleryImages.filter((img) => img.category !== "سند حفريات"),
          ...galleryImages.filter((img) => img.category === "سند حفريات"),
        ]
      : galleryImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
    );

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative py-24 md:py-32 overflow-hidden bg-[#0F0F0F]"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ y: bgY1 }}
            className="absolute top-[5%] -right-[15%] w-[600px] h-[600px] bg-earth-brown/8 rounded-full blur-[150px]"
          />
          <motion.div
            style={{ y: bgY2 }}
            className="absolute bottom-[5%] -left-[15%] w-[500px] h-[500px] bg-amber-900/6 rounded-full blur-[130px]"
          />
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-end justify-between mb-16"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-earth-brown/15 border border-earth-brown/25 text-earth-brown text-sm font-bold mb-6 backdrop-blur-sm">
                <Camera size={16} />
                <span>معرض الأعمال</span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.2]">
                مشاريع صنعت{" "}
                <span className="relative inline-block text-earth-brown">
                  الفارق
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-earth-brown/40"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                    />
                  </svg>
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                سجل حافل من المشاريع المنفذة بأعلى المعايير الهندسية العالمية.
                كل صورة تروي قصة تحدٍّ هندسي تغلبنا عليه بخبرة واحترافية.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-10 lg:gap-14 lg:mb-4">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Layers size={18} className="text-earth-brown" />
                  <span className="text-3xl font-black text-white tabular-nums">+40</span>
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  مشروع مُنجز
                </span>
              </div>
              <div className="w-px bg-white/10 hidden lg:block" />
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Camera size={18} className="text-earth-brown" />
                  <span className="text-3xl font-black text-white tabular-nums">+10</span>
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  عاماً من الخبرة
                </span>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-400 border cursor-pointer ${
                  activeFilter === cat
                    ? "bg-earth-brown text-white border-earth-brown shadow-[0_4px_20px_rgba(139,90,43,0.3)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => {
                return (
                  <GalleryCard
                    key={image.id}
                    image={image}
                    index={index}
                    onOpen={() => openLightbox(index)}
                    layoutClass={getCardLayout(index)}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="mt-16 h-px bg-gradient-to-r from-transparent via-earth-brown/30 to-transparent origin-center"
          />
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
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
