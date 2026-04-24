import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  MessageCircle,
  Radio,
  Waves,
  Wrench,
  Shield,
  ShoppingBag
} from "lucide-react";
import siteConfig from "../config/siteConfig";
import SectionLabel from "./ui/SectionLabel";

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


import { useCart } from "../context/CartContext";

const ShopSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  const waHref = (name, price) =>
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      `Hi, I'd like to buy ${name} (listed at ${price}).`,
    )}`;

  return (
    <section
      id="shop"
      data-testid="shop-section"
      className="relative pt-12 md:pt-16 pb-12 md:pb-16"
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
          <SectionLabel icon={ShoppingBag} label="Accessories Shop" />
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight tracking-tight">
            Genuine parts. <span className="ir-text-gradient">Same-day delivery.</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
            Tap any product to enquire instantly on WhatsApp. We confirm stock, share photos and arrange delivery in Noida within the same day.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {siteConfig.shopProducts.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 border border-sky-100 dark:border-slate-800"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-sky-400 to-blue-600 dark:from-sky-500 dark:to-blue-700 overflow-hidden">
                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  whileHover={{ scale: 1.1 }}
                  className="w-full h-full object-cover drop-shadow-2xl"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <h3 className="text-lg md:text-2xl font-black text-slate-800 dark:text-white mb-2 md:mb-3 group-hover:text-sky-500 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {product.brand}
                  </span>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
                  <div>
                    <span className="block text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Price</span>
                    <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">₹{product.price.toLocaleString()}</span>
                  </div>
                  
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-[10px] md:text-xs transition-all shadow-lg shadow-sky-500/20 w-full sm:w-auto whitespace-nowrap"
                  >
                    Add to cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link 
            to="/shop"
            className="group flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-sky-100 dark:border-slate-800 px-8 py-4 rounded-2xl font-bold text-sky-700 dark:text-sky-400 hover:bg-sky-500 hover:text-white hover:border-sky-400 transition-all shadow-xl shadow-sky-500/5"
          >
            View All Accessories
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;
