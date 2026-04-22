import React from "react";
import { motion } from "framer-motion";

const TextReveal = ({ children, className = "", delay = 0 }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal;
