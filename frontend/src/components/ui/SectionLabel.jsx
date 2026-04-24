import React from "react";
import { motion } from "framer-motion";

const SectionLabel = ({ icon: Icon, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6 group"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-sky-500/20 rounded-lg blur-md"
        />
        <div className="relative w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
        {label}
      </span>
    </motion.div>
  );
};

export default SectionLabel;
