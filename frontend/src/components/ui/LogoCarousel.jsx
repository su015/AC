import React from "react";
import { motion } from "framer-motion";
import siteConfig from "../../config/siteConfig";
import BrandLogos from "./BrandLogos";

const LogoCarousel = () => {
  const brandImageMap = {
    "Hitachi": "/images/Hitachi.png",
    "LG": "/images/LG-Logo.webp",
    "Samsung": "/images/Samsung.png",
    "Haier": "/images/Haier_logo.svg.png",
    "Voltas": "/images/Voltas-Logo.png",
    "Panasonic": "/images/Panasonic.png"
  };

  // Filter to the exact 5 brands shown in the user's screenshot
  const targetBrands = ["Haier", "LG", "Samsung", "Panasonic", "Hitachi"];
  const filteredBrandsSet = siteConfig.brands.filter(brand => targetBrands.includes(brand.name));
  
  // Quadruple for a truly infinite loop on wide screens
  const displayBrands = [
    ...filteredBrandsSet, 
    ...filteredBrandsSet, 
    ...filteredBrandsSet, 
    ...filteredBrandsSet
  ];

  return (
    <div className="w-full py-4 md:py-6 bg-white/30 dark:bg-slate-950/20 backdrop-blur-md border-y border-white/20 dark:border-white/5 overflow-hidden relative">
      {/* Soft cinematic edge fades */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-30 pointer-events-none opacity-90" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-30 pointer-events-none opacity-90" />
      
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-sky-500/70 dark:text-sky-400/70">
          Authorised Sales & Service Partner For
        </h2>
      </div>

      <motion.div
        className="flex items-center w-max"
        animate={{
          x: ["0%", "-25%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {displayBrands.map((brand, i) => {
          const imageSrc = brandImageMap[brand.name];
          
          // Precise scaling for the screenshot look
          let scaleFactor = 1;
          if (brand.name === "Haier") scaleFactor = 0.6;
          if (brand.name === "LG") scaleFactor = 0.9;
          if (brand.name === "Samsung") scaleFactor = 1.5;
          if (brand.name === "Panasonic") scaleFactor = 2.5;
          if (brand.name === "Hitachi") scaleFactor = 1.1;

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center cursor-pointer w-[140px] md:w-[200px] flex-shrink-0"
            >
              <div style={{ transform: `scale(${scaleFactor})` }} className="flex items-center justify-center">
                <img 
                  src={imageSrc} 
                  alt={brand.name} 
                  className="h-8 md:h-10 w-auto max-w-[150px] object-contain transition-opacity duration-500"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
