import React from "react";
import { motion } from "framer-motion";
import siteConfig from "../config/siteConfig";
import { Link } from "react-router-dom";
import SectionLabel from "./ui/SectionLabel";
import { Sparkles } from "lucide-react";

const AccessoriesSection = () => {
  return (
    <section id="accessories" className="py-12 md:py-16 relative overflow-hidden bg-slate-100/40 dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-16 md:mb-20">
          <SectionLabel icon={Sparkles} label="Essentials" />
          <h2 className="text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-white font-display leading-[1.1]">
            Accessories
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mt-6 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {siteConfig.accessories.map((item) => (
            <Link key={item.id} to="/shop" className="group block">
              <div className="bg-white rounded-[2.5rem] flex items-center justify-center aspect-square mb-8 overflow-hidden border border-gray-100 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-sky-500/10 group-hover:-translate-y-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#0C4A6E] dark:text-sky-100 group-hover:text-sky-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Genuine Spare
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessoriesSection;
