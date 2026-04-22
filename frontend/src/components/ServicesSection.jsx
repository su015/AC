import React, { useRef } from "react";
import VariableProximity from "./ui/VariableProximity";
import { motion } from "framer-motion";
import {
  Wrench,
  Settings,
  Droplets,
  Sparkles,
  CalendarCheck,
  Refrigerator,
} from "lucide-react";
import siteConfig from "../config/siteConfig";

const ICONS = {
  Wrench,
  Settings,
  Droplets,
  Sparkles,
  CalendarCheck,
  Refrigerator,
};

import TextType from "./ui/TextType";
import TiltedCard from "./ui/TiltedCard";
import SpotlightCard from "./ui/SpotlightCard";

const ServicesSection = () => {
  const containerRef = useRef(null);
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-20 md:py-28 ir-frost-bg"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          ref={containerRef}
        >
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Services
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight tracking-tight">
              Cool again in <span className="ir-text-gradient">under 2 hours.</span>
            </h2>
          </div>
          <div className="text-slate-600 dark:text-slate-400 md:max-w-sm text-sm md:text-base">
            <TextType
              text="Certified technicians, genuine spares, transparent pricing — every time. We carry a 90-day service warranty across all jobs."
              typingSpeed={40}
              startOnVisible={true}
              showCursor={true}
              cursorCharacter="_"
              loop={false}
            />
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {siteConfig.services.map((s, i) => {
            const Icon = ICONS[s.icon] || Wrench;
            const isFeature = i === 0;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <TiltedCard
                  imageSrc={s.image}
                  altText={s.name}
                  captionText={s.name}
                  containerHeight="400px"
                  imageHeight="100%"
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/90 dark:bg-slate-900/90 shadow-lg`}>
                          <Icon className="w-6 h-6 text-sky-600 dark:text-sky-400" strokeWidth={2} />
                        </div>
                        {isFeature && (
                          <span className="bg-cyan-400 text-sky-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Most Booked
                          </span>
                        )}
                      </div>
                      
                      <div className="ir-glass dark:bg-slate-900/80 rounded-2xl p-5 border border-white/20 backdrop-blur-md">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#0C4A6E] dark:text-sky-100">
                          {s.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                          {s.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <a
                            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Hi, I need ${s.name}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-black uppercase tracking-widest text-sky-700 dark:text-sky-400 hover:text-sky-900 transition-colors"
                          >
                            Book now →
                          </a>
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
