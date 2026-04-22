import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Radio,
  Waves,
  Wrench,
  Shield,
} from "lucide-react";
import siteConfig from "../config/siteConfig";
import TextType from "./ui/TextType";

const ICONS = {
  remote: Radio,
  hose: Waves,
  adapter: Wrench,
  cover: Shield,
};

const GRADIENTS = {
  remote: "from-cyan-300 via-sky-400 to-blue-400",
  hose: "from-sky-400 via-cyan-300 to-teal-300",
  adapter: "from-blue-400 via-sky-500 to-cyan-400",
  cover: "from-indigo-300 via-sky-400 to-cyan-300",
};

import TiltedCard from "./ui/TiltedCard";

const ShopSection = () => {
  const containerRef = useRef(null);
  const waHref = (name, price) =>
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      `Hi, I'd like to buy ${name} (listed at ${price}).`,
    )}`;

  return (
    <section
      id="shop"
      data-testid="shop-section"
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
            Accessories Shop
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight tracking-tight">
            Genuine parts. <span className="ir-text-gradient">Same-day delivery.</span>
          </h2>
          <div className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
            <TextType
              text="Tap any product to enquire instantly on WhatsApp. We confirm stock, share photos and arrange delivery in Noida within the same day."
              typingSpeed={40}
              startOnVisible={true}
              showCursor={true}
              cursorCharacter="_"
              loop={false}
            />
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {siteConfig.accessories.map((a, i) => {
            const Icon = ICONS[a.id] || Radio;
            const grad = GRADIENTS[a.id] || GRADIENTS.remote;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <TiltedCard
                  imageSrc={a.image}
                  altText={a.name}
                  captionText={a.name}
                  containerHeight="380px"
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/90 dark:bg-slate-900/90 shadow-sm`}>
                            <Icon className="w-5 h-5 text-sky-600" />
                         </div>
                         <span className="bg-white/90 dark:bg-slate-900/90 text-sky-700 dark:text-sky-400 text-[10px] font-black px-2 py-1 rounded shadow-sm">
                            {a.price}
                         </span>
                      </div>
                      
                      <div className="ir-glass dark:bg-slate-900/80 rounded-2xl p-4 border border-white/20 backdrop-blur-md">
                        <h3 className="font-display text-sm md:text-base font-bold text-[#0C4A6E] dark:text-sky-100 line-clamp-1">
                          {a.name}
                        </h3>
                        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          {a.description}
                        </p>
                        <a
                          href={waHref(a.name, a.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 w-full inline-flex items-center justify-center gap-2 text-[10px] font-bold bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          Enquire
                        </a>
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

export default ShopSection;
