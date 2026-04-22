import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import siteConfig from "../config/siteConfig";

import TiltedCard from "./ui/TiltedCard";

const TestimonialsSection = () => {
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-20 md:py-28 ir-frost-bg"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Testimonials
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight">
              Loved by <span className="ir-text-gradient">10,000+ Noida homes.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-bold text-[#0C4A6E] dark:text-sky-100">4.8</span>
            <span>· Google Reviews</span>
          </div>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {siteConfig.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltedCard
                imageSrc="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=40" // Generic abstract background
                altText={t.name}
                captionText={t.name}
                containerHeight="320px"
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <Quote className="w-6 h-6 text-cyan-400/80" />
                      <div className="flex">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-3 h-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="ir-glass dark:bg-slate-900/80 rounded-2xl p-4 border border-white/20 backdrop-blur-md">
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed italic">
                        “{t.text}”
                      </p>
                      <div className="mt-4 pt-3 border-t border-sky-100 dark:border-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-slate-800 flex items-center justify-center font-display font-black text-sky-700 dark:text-sky-300 text-[10px]">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-display font-bold text-[#0C4A6E] dark:text-sky-100 text-[11px]">
                            {t.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
