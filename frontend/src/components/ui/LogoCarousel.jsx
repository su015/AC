import React from "react";
import { motion } from "framer-motion";
import siteConfig from "../../config/siteConfig";
import BrandLogos from "./BrandLogos";

const LogoCarousel = () => {
  const brands = [...siteConfig.brands, ...siteConfig.brands];

  return (
    <div className="w-full py-12 md:py-16 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-y border-sky-100/50 dark:border-slate-800/50 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#020617] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#020617] to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-sky-600/60 dark:text-sky-400/60">
          Authorised Sales & Service Partner For
        </span>
      </div>

      <motion.div
        className="flex gap-16 md:gap-32 items-center whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {brands.map((brand, i) => {
          const Logo = BrandLogos[brand.key];
          return (
            <div
              key={i}
              className="flex items-center justify-center transition-all duration-500 hover:scale-110"
            >
              {Logo ? (
                <Logo className="h-10 md:h-14 w-auto text-[#0C4A6E]/40 dark:text-sky-100/50 hover:text-[#0C4A6E] dark:hover:text-white transition-colors" />
              ) : (
                <span className="font-display text-lg md:text-2xl font-black text-[#0C4A6E]/40 dark:text-sky-100/50 uppercase italic">
                  {brand.name}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
