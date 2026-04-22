import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Snowflake } from "lucide-react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/40 dark:bg-slate-950/40 backdrop-blur-3xl overflow-hidden"
        >
          {/* Background effects */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-[500px] h-[500px] bg-sky-400 rounded-full blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Main Icon Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                duration: 1
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.5)]"
              >
                <Snowflake className="w-12 h-12 md:w-16 md:h-16 text-[#082F49]" strokeWidth={2.5} />
              </motion.div>
              
              {/* Pulsing rings */}
              <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl border-2 border-sky-400/50"
              />
            </motion.div>

            {/* Brand text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <h1 className="text-3xl md:text-5xl font-display font-black text-[#0C4A6E] dark:text-white tracking-tight">
                Indian <span className="text-sky-400">Refrigeration</span>
              </h1>
              <p className="mt-2 text-sky-600 dark:text-sky-200/60 font-bold uppercase tracking-[0.3em] text-xs">
                Perfecting your comfort
              </p>
            </motion.div>

            {/* Loading bar */}
            <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 2, ease: "easeInOut" }}
                 className="h-full w-full bg-gradient-to-r from-sky-400 to-cyan-300"
               />
            </div>
          </div>
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 10,
                opacity: 0 
              }}
              animate={{ 
                y: -10,
                opacity: [0, 1, 0],
                rotate: 360
              }}
              transition={{ 
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute text-sky-400/20"
            >
              <Snowflake size={Math.random() * 20 + 10} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
