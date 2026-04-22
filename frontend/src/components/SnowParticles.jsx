import React from "react";

/**
 * Lightweight, pure-CSS snow particle layer.
 * No JS RAF loops — pure CSS for performance.
 */
const SnowParticles = ({ count = 40 }) => {
  const flakes = React.useMemo(() => {
    const arr = [];
    const glyphs = ["❅", "❆", "❄", "•"];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        duration: 12 + Math.random() * 14,
        delay: Math.random() * 12,
        drift: (Math.random() - 0.5) * 120,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        opacity: 0.25 + Math.random() * 0.45,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="ir-snow" aria-hidden="true" data-testid="snow-particles">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="ir-snowflake"
          style={{
            left: `${f.left}vw`,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `-${f.delay}s`,
            "--drift": `${f.drift}px`,
          }}
        >
          {f.glyph}
        </span>
      ))}
    </div>
  );
};

export default SnowParticles;
