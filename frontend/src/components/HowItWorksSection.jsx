import React from "react";
import { motion } from "framer-motion";
import siteConfig from "../config/siteConfig";

const HowItWorksSection = () => {
  return (
    <section
      data-testid="how-it-works-section"
      className="relative py-20 md:py-28 ir-frost-bg"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
            How It Works
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-black text-[#0C4A6E] leading-tight">
            Four steps. <span className="ir-text-gradient">Zero hassle.</span>
          </h2>
        </motion.div>

        <div className="mt-16 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 relative">
            {siteConfig.howItWorks.map((s, i) => (
              <React.Fragment key={s.step}>
                {/* Connector line segment */}
                {i < siteConfig.howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 z-0 h-[2px] bg-sky-100 dark:bg-slate-800" 
                    style={{ 
                      left: `${(i * 25) + 15}%`, 
                      width: '20%' 
                    }}
                  >
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: (i * 1) + 0.5, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 1 }}
                  className="relative flex flex-col items-center text-center z-10"
                >
                  <div className="relative group">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i * 1) + 0.2, type: "spring", stiffness: 200 }}
                      className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl group-hover:bg-cyan-400/50 transition-colors" 
                    />
                    <div className="relative w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-100 dark:border-slate-800 flex items-center justify-center font-display text-3xl font-black text-[#0C4A6E] dark:text-sky-100 shadow-xl">
                      {s.step}
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * 1) + 0.4 }}
                  >
                    <h3 className="mt-8 font-display text-xl md:text-2xl font-bold text-[#0C4A6E] dark:text-sky-50">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-[180px] leading-relaxed">
                      {s.desc}
                    </p>
                  </motion.div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
