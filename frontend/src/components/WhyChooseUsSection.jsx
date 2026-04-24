import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Award,
  IndianRupee,
  ShieldCheck,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import siteConfig from "../config/siteConfig";
import SectionLabel from "./ui/SectionLabel";
import { Heart } from "lucide-react";

const ICONS = { Zap, Award, IndianRupee, ShieldCheck, MapPin, HeartHandshake };

const WhyChooseUsSection = () => {
  return (
    <section
      data-testid="why-choose-us-section"
      className="relative py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <SectionLabel icon={Heart} label="Why Choose Us" />
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-black text-[#0C4A6E] leading-tight">
            Noida's most trusted <span className="ir-text-gradient">cooling experts.</span>
          </h2>
        </div>

        <style>
          {`
            .hover-card {
              transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
            }
            .hover-card:hover {
              transform: translateY(-10px) scale(1.05);
              border-color: rgba(14, 165, 233, 0.3);
              box-shadow: 0 20px 40px -10px rgba(14, 165, 233, 0.15);
            }
          `}
        </style>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover-container">
          {siteConfig.whyChooseUs.map((f, i) => {
            const Icon = ICONS[f.icon] || ShieldCheck;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="hover-card ir-card ir-glass rounded-3xl p-8 flex flex-col items-center text-center gap-4 cursor-pointer border border-sky-100/50 dark:border-white/5"
                data-testid={`feature-${i}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-sky-300/20 flex-shrink-0">
                  <Icon className="w-7 h-7" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0C4A6E] dark:text-sky-100">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
