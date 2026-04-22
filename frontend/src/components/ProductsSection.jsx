import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  AirVent,
  Square,
  LayoutGrid,
  Workflow,
  Network,
} from "lucide-react";
import siteConfig from "../config/siteConfig";
import TextType from "./ui/TextType";
import TextReveal from "./ui/TextReveal";

const ICONS = {
  split: AirVent,
  window: Square,
  cassette: LayoutGrid,
  duct: Workflow,
  vrf: Network,
};

const GRADIENTS = {
  split: "from-sky-400 via-cyan-300 to-blue-400",
  window: "from-cyan-300 via-sky-400 to-blue-500",
  cassette: "from-indigo-300 via-sky-400 to-cyan-300",
  duct: "from-teal-300 via-cyan-400 to-sky-500",
  vrf: "from-sky-500 via-blue-500 to-indigo-500",
};

import TiltedCard from "./ui/TiltedCard";

const ProductsSection = () => {
  const containerRef = useRef(null);
  const waHref = (name) =>
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      `Hi, I'd like to enquire about ${name}.`,
    )}`;

  return (
    <section
      id="products"
      data-testid="products-section"
      className="relative py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
          ref={containerRef}
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
            Our Solutions
          </span>
          <TextReveal delay={0.1}>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight">
              Quality cooling for <span className="ir-text-gradient">every space.</span>
            </h2>
          </TextReveal>
          <div className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
            <TextType
              text="From cozy bedrooms to showrooms and offices — authorised dealer for Daikin, LG, Voltas, Blue Star, Hitachi & more."
              typingSpeed={40}
              startOnVisible={true}
              showCursor={true}
              cursorCharacter="_"
              loop={false}
            />
          </div>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {siteConfig.products.map((p, i) => {
            const Icon = ICONS[p.id] || AirVent;
            const grad = GRADIENTS[p.id] || GRADIENTS.split;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="h-[420px]"
              >
                <TiltedCard
                  imageSrc={p.image}
                  altText={p.name}
                  captionText={p.name}
                  containerHeight="100%"
                  imageHeight="100%"
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                         <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/50 shadow-sm">
                            {p.id}
                         </div>
                         <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg border border-white/20`}>
                            <Icon className="w-6 h-6 text-white" />
                         </div>
                      </div>

                      <div className="ir-glass dark:bg-slate-900/90 rounded-3xl p-5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-xl md:text-2xl font-bold text-[#0C4A6E] dark:text-sky-100">
                            {p.name}
                          </h3>
                          <a
                            href={waHref(p.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 hover:scale-110 transition-transform flex-shrink-0"
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </a>
                        </div>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 dark:text-sky-400">
                          {p.specs}
                        </p>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                          {p.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-sky-100/50 dark:border-slate-800/50 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                            Instant Quote
                          </span>
                          <span className="font-bold text-sky-600 dark:text-sky-400">
                            Book Now →
                          </span>
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

export default ProductsSection;
