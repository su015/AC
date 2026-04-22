import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Cloud, CloudRain, Thermometer, MapPin } from "lucide-react";

const WeatherMonitor = () => {
  const [weather, setWeather] = useState({
    temp: 34,
    condition: "Sunny",
    city: "Noida",
  });

  // Mock weather update
  useEffect(() => {
    const timer = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temp: prev.temp + (Math.random() > 0.5 ? 0.1 : -0.1)
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-24 md:top-24 left-4 md:left-6 z-[40]"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          y: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }
        }}
        className="group relative flex items-center gap-2 md:gap-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-1.5 md:p-2 pl-2.5 md:pl-3 rounded-xl md:rounded-2xl shadow-2xl shadow-sky-500/20 cursor-help overflow-hidden"
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
            className="text-amber-400 dark:text-amber-300"
          >
            <Sun className="w-5 h-5 md:w-6 md:h-6 fill-amber-400/20" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -bottom-1 -right-1 text-sky-400"
          >
            <Cloud className="w-3.5 h-3.5 md:w-4 md:h-4 fill-sky-400/20" />
          </motion.div>
        </div>

        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span className="text-base md:text-lg font-black text-[#0C4A6E] dark:text-sky-100">
              {weather.temp.toFixed(0)}°
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-sky-500 uppercase tracking-tighter">
              {weather.condition}
            </span>
          </div>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: "auto", opacity: 1 }}
            className="overflow-hidden flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
          >
            <MapPin className="w-2 h-2" />
            {weather.city}, UP
          </motion.div>
        </div>

        <div className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherMonitor;
