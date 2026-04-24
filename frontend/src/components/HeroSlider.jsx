import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";
import siteConfig from "../config/siteConfig";
import VariableProximity from "./ui/VariableProximity";
import Magnetic from "./ui/Magnetic";

const StatCounter = ({ value, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spanRef = useRef(null);

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
  });

  const displayValue = useTransform(springValue, (latest) => 
    latest % 1 === 0 ? Math.floor(latest).toLocaleString() : latest.toFixed(1)
  );

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      if (spanRef.current) {
        spanRef.current.innerText = latest;
      }
    });
    return () => unsubscribe();
  }, [displayValue]);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {prefix}
      <span ref={spanRef}>0</span>
      {suffix}
    </span>
  );
};

const HeroSlider = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const slides = siteConfig.heroSlides;

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  const slide = slides[index];

  const getHref = (cta) => {
    if (cta.href === "whatsapp") {
      return `https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20Indian%20Refrigeration%2C%20I%27d%20like%20to%20know%20more.`;
    }
    return cta.href;
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-0 pt-32 md:pt-40 pb-8 md:pb-12 overflow-hidden"
    >
      <div className="ir-frost-overlay absolute inset-0 pointer-events-none" />

      {/* Decorative airflow streaks */}
      <div className="ir-airflow left-[10%] top-[55%]" />
      <div
        className="ir-airflow left-[35%] top-[38%]"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="ir-airflow right-[18%] top-[62%]"
        style={{ animationDelay: "2.4s" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
        {/* Left: copy + CTA */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="will-change-transform"
            >
              <span
                data-testid="hero-eyebrow"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {slide.eyebrow}
              </span>
              <h1
                  data-testid="hero-title"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#0C4A6E] dark:text-sky-50 tracking-tight"
                >
                  {slide.title.split(" ").map((w, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 2 || i === arr.length - 1 ? (
                        <span className="ir-text-gradient">{w} </span>
                      ) : (
                        <>{w} </>
                      )}
                    </span>
                  ))}
                </h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <a
                    href={getHref(slide.primaryCta)}
                    data-testid="hero-primary-cta"
                    className="ir-btn flex"
                  >
                    {slide.primaryCta.label}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={getHref(slide.secondaryCta)}
                    data-testid="hero-secondary-cta"
                    target={
                      slide.secondaryCta.href === "whatsapp" ? "_blank" : undefined
                    }
                    rel="noopener noreferrer"
                    className="ir-btn flex"
                  >
                    {slide.secondaryCta.label}
                  </a>
                </Magnetic>

                <a
                  href={`tel:${siteConfig.contact.phoneDial}`}
                  data-testid="hero-call-link"
                  className="inline-flex items-center gap-2 text-sky-700 dark:text-sky-400 font-semibold text-sm hover:text-sky-900 dark:hover:text-sky-300 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" /> {siteConfig.contact.phone}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* slider controls */}
          {/* slider controls (Dots only) */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setIndex(i)}
                  data-testid={`hero-dot-${i}`}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-10 bg-gradient-to-r from-sky-500 to-cyan-400"
                      : "w-4 bg-sky-200 dark:bg-slate-700 hover:bg-sky-300 dark:hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <div className="text-left">
              <div className="font-display text-2xl md:text-3xl font-black text-[#0C4A6E] dark:text-sky-100">
                <StatCounter value={10} suffix="k+" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Happy Customers</div>
            </div>
            <div className="text-left">
              <div className="font-display text-2xl md:text-3xl font-black text-[#0C4A6E] dark:text-sky-100">
                <StatCounter value={4.8} suffix="★" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Google Rating</div>
            </div>
            <div className="text-left">
              <div className="font-display text-2xl md:text-3xl font-black text-[#0C4A6E] dark:text-sky-100">
                <StatCounter value={24} suffix="/7" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Fast Response</div>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Image */}
        <div
          className="relative h-[400px] sm:h-[500px] lg:h-[650px] flex items-center justify-center -mt-10 lg:-mt-20 px-4"
          data-testid="hero-image-container"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-cyan-400/10 blur-[120px] rounded-full" />
          
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Trust Badges */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 md:-right-6 px-5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-sky-100 dark:border-slate-700 shadow-2xl z-20 hidden md:block"
            >
              <span className="text-[11px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.2em]">Premium Quality</span>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-0 md:-left-6 px-5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-sky-100 dark:border-slate-700 shadow-2xl z-20 hidden md:block"
            >
              <span className="text-[11px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.2em]">Noida's #1 Choice</span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.key}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-6 bg-sky-400/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="relative w-full h-auto max-h-[550px] object-contain drop-shadow-[0_35px_35px_rgba(14,165,233,0.3)] rounded-[2.5rem]"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Side Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 pointer-events-none z-30">
        <button
          onClick={() => go(-1)}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-sky-100/20 bg-white/5 dark:bg-slate-900/20 backdrop-blur-xl flex items-center justify-center text-sky-500 hover:text-sky-400 hover:bg-white/10 transition-all pointer-events-auto active:scale-90 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => go(1)}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-sky-100/20 bg-white/5 dark:bg-slate-900/20 backdrop-blur-xl flex items-center justify-center text-sky-500 hover:text-sky-400 hover:bg-white/10 transition-all pointer-events-auto active:scale-90 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
