"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimeBrandLoader } from "../ui/AnimeBrandLoader";

interface PreloaderProps {
  children: React.ReactNode;
}

export function Preloader({ children }: PreloaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    let videoReady = false;

    // Check if video is already flagged as loaded (e.g. from cached load)
    if (typeof window !== "undefined" && (window as any).heroVideoLoaded) {
      videoReady = true;
    }

    const checkFinished = () => {
      if (videoReady) {
        setLoading(false);
        document.body.style.overflow = "";
        
        // Dispatch finished event to trigger video autoplay cross-fade
        (window as any).preloaderFinished = true;
        window.dispatchEvent(new Event("preloaderFinished"));
      }
    };

    // If already ready (cached), check right away
    if (videoReady) {
      checkFinished();
      return;
    }

    // Safety fallback timer: proceed after 6 seconds even if video load event fails
    const safetyTimer = setTimeout(() => {
      videoReady = true;
      checkFinished();
    }, 6000);

    // Listen for video loading completion from HeroSection
    const handleVideoLoaded = () => {
      videoReady = true;
      checkFinished();
    };

    window.addEventListener("heroVideoLoaded", handleVideoLoaded);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("heroVideoLoaded", handleVideoLoaded);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: "-100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1F1F1F] text-[#F4F0EA]"
          >
            {/* The AnimeJS particles consolidation loader */}
            <div className="z-10 flex flex-col items-center justify-center">
              <AnimeBrandLoader />
              
              {/* التسمية التوضيحية الهندسية */}
              <motion.div 
                className="mt-8 text-center select-none"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              >
                <p className="text-[#F4F0EA] font-medium text-sm tracking-wider">جاري تهيئة وتأمين الأساسات...</p>
                <span className="text-[#D96B2B] text-xs font-mono mt-1.5 block tracking-widest uppercase">Securing Depth & Strata</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* The actual page content */}
      {children}
    </>
  );
}
