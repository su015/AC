import React, { useRef } from "react";
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
import SectionLabel from "./ui/SectionLabel";

const ICONS = {
  Wrench,
  Settings,
  Droplets,
  Sparkles,
  CalendarCheck,
  Refrigerator,
};

const ServicesSection = () => {
  const containerRef = useRef(null);
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-12 md:py-16 ir-frost-bg"
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
            <SectionLabel icon={Wrench} label="Services" />
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight tracking-tight">
              Cool again in <span className="ir-text-gradient">under 2 hours.</span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 md:max-w-sm text-sm md:text-base">
            Certified technicians, genuine spares, transparent pricing — every time. We carry a 90-day service warranty across all jobs.
          </p>
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
                className="relative h-[500px] group rounded-[2.5rem] overflow-hidden shadow-xl border border-white/10"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/20">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    {isFeature && (
                      <span className="bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        Top Rated
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-black text-white">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-200 leading-relaxed line-clamp-2 font-medium">
                        {s.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                        90-Day Warranty
                      </span>
                      <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                        Genuine Spares
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Hi, I need ${s.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-black py-4 rounded-full font-black text-sm text-center transition-all duration-300 hover:bg-sky-500 hover:text-white transform hover:scale-[1.02] active:scale-95 shadow-xl"
                    >
                      Enquire now
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
