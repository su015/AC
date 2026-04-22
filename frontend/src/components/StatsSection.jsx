import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const StatCounter = ({ value, suffix = "", label, subLabel }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );
  const spanRef = useRef(null);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      if (spanRef.current) {
        spanRef.current.innerText = latest;
      }
    });
    return () => unsubscribe();
  }, [displayValue]);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="text-center group">
      <div className="relative inline-block">
        <div className="font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-white block">
          <span ref={spanRef}>0</span>
          {suffix}
        </div>
        <div className="absolute -inset-2 bg-sky-400/10 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
      </div>
      <div className="mt-4">
        <h4 className="text-sm md:text-base font-bold text-[#0C4A6E] dark:text-sky-100 uppercase tracking-widest">
          {label}
        </h4>
        <p className="text-xs text-slate-500 dark:text-sky-200/60 mt-1 font-medium italic">
          {subLabel}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 15, suffix: "+", label: "Years Experience", subLabel: "Serving Noida & NCR" },
    { value: 12000, suffix: "+", label: "Happy Customers", subLabel: "Homes & Businesses" },
    { value: 500, suffix: "+", label: "Corporate Clients", subLabel: "Trusted Partnerships" },
    { value: 98, suffix: "%", label: "Service Rating", subLabel: "Customer Satisfaction" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-sky-200/20 dark:bg-sky-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-200/20 dark:bg-cyan-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
