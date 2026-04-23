import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import siteConfig from "../config/siteConfig";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const testimonials = [...siteConfig.testimonials, ...siteConfig.testimonials].slice(0, 10);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
            Success Stories
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight">
            Loved by <span className="ir-text-gradient">10,000+ Noida homes.</span>
          </h2>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-sky-500 transition-all active:scale-90"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button 
            onClick={next}
            className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-sky-500 transition-all active:scale-90"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                
                {/* Ribbon Name Tag */}
                <div className="absolute -top-6 -left-4">
                  <div className="relative">
                    <div className="bg-[#0C4A6E] dark:bg-sky-600 text-white px-8 py-5 rounded-3xl rounded-bl-none font-bold text-xl md:text-3xl shadow-xl shadow-sky-900/30">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="absolute top-full left-0 w-4 h-4 bg-[#082a3d] dark:bg-sky-800 rounded-bl-full" />
                  </div>
                </div>

                {/* Overlapping Avatar */}
                <div className="absolute -top-12 -right-4 md:-right-8 w-24 h-24 md:w-36 md:h-36 rounded-full border-[10px] border-white dark:border-slate-900 shadow-2xl overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${testimonials[currentIndex].name}`}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stars below ribbon */}
                <div className="flex gap-1 mb-8 mt-12">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < testimonials[currentIndex].rating ? 'fill-amber-400 text-amber-400' : 'text-slate-100 dark:text-slate-800'}`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Footer */}
                <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                   <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                     {testimonials[currentIndex].role} · Verified
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Live Review</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-sky-500' : 'w-2 bg-slate-200 dark:bg-slate-800'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
