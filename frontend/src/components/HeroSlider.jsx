import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";
import siteConfig from "../config/siteConfig";
import VariableProximity from "./ui/VariableProximity";
import Magnetic from "./ui/Magnetic";
import TextReveal from "./ui/TextReveal";

const AC3DModel = lazy(() => import("./AC3DModel"));

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
      className="relative min-h-[92vh] pt-20 md:pt-24 overflow-hidden"
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

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-10 lg:gap-6 items-center py-10 lg:py-6">
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
              <TextReveal delay={0.2}>
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
              </TextReveal>
              <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>
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
            <div className="flex gap-1 ml-2">
              <button
                type="button"
                onClick={() => go(-1)}
                data-testid="hero-prev"
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full border border-sky-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-sky-700 dark:text-sky-400 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                data-testid="hero-next"
                aria-label="Next slide"
                className="w-9 h-9 rounded-full border border-sky-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-sky-700 dark:text-sky-400 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
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

        {/* Right: 3D AC */}
        <div
          className="relative h-[340px] sm:h-[440px] lg:h-[560px] flex items-center justify-center -mt-10 lg:-mt-20"
          data-testid="hero-3d-container"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-cyan-400/5 blur-[120px] rounded-full" />
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-sky-400 text-sm">
                Loading 3D Preview…
              </div>
            }
          >
            <AC3DModel />
          </Suspense>
          
          <div className="absolute bottom-10 left-4 right-4 flex items-center justify-between text-[10px] md:text-xs text-sky-900 dark:text-sky-300 font-black tracking-widest">
            <span className="px-5 py-2 rounded-xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl">
              REAL-TIME 3D PREVIEW
            </span>
            <span className="px-5 py-2 rounded-xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl">
              ACTIVE COOLING · 18°C
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
