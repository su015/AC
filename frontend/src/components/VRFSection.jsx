import React from "react";
import { motion } from "framer-motion";
import siteConfig from "../config/siteConfig";
import { MessageCircle, Settings, Snowflake, Building } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";

const VRFSection = () => {
  return (
    <section id="vrf" className="py-12 md:py-16 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-16 md:mb-20 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
          <SectionLabel icon={Building} label="Commercial Solutions" />
          <h2 className="text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-white font-display leading-[1.1] relative z-10">
            VRF <span className="ir-text-gradient">Systems</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mt-6 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] relative z-10" />
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative bg-slate-900 dark:bg-[#0F172A] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/5 transition-all duration-700 hover:shadow-sky-500/20 hover:border-sky-500/30"
        >
            <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img 
                    src="/images/vrf_system_dark.png" 
                    alt="VRF System Diagram" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#0F172A] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 dark:from-[#0F172A]/40 via-transparent to-transparent opacity-60" />
            </div>
            
            <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                            <Settings className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-base">Smart Control</h4>
                            <p className="text-sm text-slate-400 mt-1">Individual zone control for maximum comfort and efficiency.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                            <Snowflake className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-base">Powerful Cooling</h4>
                            <p className="text-sm text-slate-400 mt-1">Single outdoor unit supports up to 64 indoor units simultaneously.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-base">Expert Install</h4>
                            <p className="text-sm text-slate-400 mt-1">Professional design and installation by certified engineers.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi, I want to enquire about VRF Systems for my office/building.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-3 bg-gradient-to-r from-sky-400 to-cyan-400 text-[#0F172A] px-10 py-4 rounded-full font-black text-base shadow-xl shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        Enquire Now
                        <MessageCircle className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VRFSection;
