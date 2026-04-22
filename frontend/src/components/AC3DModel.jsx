import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Screenshot-Matched 3D AC Model
 * Reverted branding and layout to match the user's reference image exactly.
 */

const AirParticles = () => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        delay: Math.random() * 3.5,
        duration: 2.8 + Math.random() * 2.4,
        size: 4 + Math.random() * 6,
      })),
    [],
  );

  return (
    <div className="absolute inset-x-0 top-[62%] bottom-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/70"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: "-6px",
            animation: `ac-drop ${p.duration}s ease-in ${p.delay}s infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

const AC3DModel = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 5]), { stiffness: 100, damping: 30 });
  const translateZ = useSpring(isHovered ? 40 : 0, { stiffness: 100, damping: 30 });
  const scale = useSpring(isHovered ? 1.05 : 1, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
      }}
      className="relative w-full h-full flex items-center justify-center cursor-crosshair"
      style={{ perspective: "1400px" }}
    >
      <style>{`
        @keyframes ac-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes ac-drop {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.85; }
          100% { transform: translateY(140px) scale(0.5); opacity: 0; }
        }
        @keyframes ac-grille-shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Shadow */}
      <motion.div 
        style={{ 
          scaleX: useTransform(scale, [1, 1.05], [0.8, 1]),
          opacity: useTransform(scale, [1, 1.05], [0.2, 0.4])
        }}
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[72%] h-6 bg-sky-400/25 blur-2xl rounded-full" 
      />

      {/* AC unit */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-[86%] max-w-[520px]"
      >
        {/* Body */}
        <div
          className="relative rounded-[22px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #f0f9ff 60%, #e0f2fe 100%)",
            boxShadow: "0 50px 80px -20px rgba(14,165,233,0.35), inset 0 -8px 24px rgba(14,165,233,0.08), inset 0 2px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Top highlight */}
          <div className="h-2 bg-gradient-to-b from-white to-sky-100" />

          {/* Grille */}
          <div className="relative px-6 py-8 bg-gradient-to-b from-white via-sky-50 to-cyan-50">
            <div className="flex flex-col gap-[6px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[4px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, rgba(186,230,253,0.9), rgba(207,250,254,0.4), rgba(186,230,253,0.9))",
                    backgroundSize: "200% 100%",
                    animation: `ac-grille-shine ${4 + i * 0.3}s linear infinite`,
                    opacity: 0.6 + (i % 3) * 0.15,
                  }}
                />
              ))}
            </div>

            {/* Display panel */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#082F49] rounded-lg px-3 py-2 text-[11px] font-mono font-bold text-cyan-300 shadow-inner flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan-300"
                style={{ animation: "ac-pulse 1.6s ease-in-out infinite" }}
              />
              18°C
            </div>

            {/* Brand badge */}
            <div className="absolute left-6 top-3 text-[9px] font-bold uppercase tracking-[0.25em] text-sky-500/70">
              COOL · INVERTER
            </div>
          </div>

          {/* Bottom vent with glow */}
          <div className="relative h-6 bg-gradient-to-b from-sky-100 to-sky-200">
            <div
              className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[6px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #00E5FF, transparent)",
                boxShadow: "0 0 18px #00E5FF",
                animation: "ac-pulse 2.4s ease-in-out infinite",
              }}
            />
          </div>

          {/* Corner LED accents */}
          <div
            className="absolute left-4 top-4 w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: "0 0 10px #00E5FF",
              animation: "ac-pulse 1.4s ease-in-out infinite",
            }}
          />
        </div>

        {/* 3D side face (illusion of depth) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-3 rounded-r-[22px]"
          style={{
            background: "linear-gradient(90deg, #bae6fd, #7dd3fc)",
            transform: "translateX(8px) rotateY(40deg)",
            transformOrigin: "left center",
            boxShadow: "inset -4px 0 10px rgba(14,165,233,0.25)",
          }}
        />
      </motion.div>

      {/* Air Particles */}
      <AirParticles />

      {/* Frost glow at bottom */}
      <div
        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-2/3 h-16 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,229,255,0.55), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
};

export default AC3DModel;
