import React, { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 150,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const letterPositions = useRef([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-performance spring for ultra-smooth response
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25, restDelta: 0.001 });

  const parsedSettings = useMemo(() => {
    const parse = (s) => new Map(s.split(',').map(x => {
      const [n, v] = x.trim().split(' ');
      return [n.replace(/['"]/g, ''), parseFloat(v)];
    }));
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromVal]) => ({
      axis, fromVal, toVal: to.get(axis) ?? fromVal
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const updatePositions = () => {
    if (!containerRef?.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    letterPositions.current = letterRefs.current.map(el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - rect.left, y: r.top + r.height / 2 - rect.top };
    });
  };

  useEffect(() => {
    // Re-calculate after font load and on resize
    document.fonts.ready.then(updatePositions);
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [label]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', (e) => handleMove(e.touches[0]));
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [containerRef]);

  useAnimationFrame(() => {
    const x = smoothX.get();
    const y = smoothY.get();
    
    letterRefs.current.forEach((el, i) => {
      const pos = letterPositions.current[i];
      if (!el || !pos) return;

      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      const rawNorm = Math.min(Math.max(1 - dist / radius, 0), 1);
      const falloffVal = falloff === 'gaussian' ? Math.exp(-((dist / (radius / 2)) ** 2) / 2) : 
                         falloff === 'exponential' ? rawNorm ** 2 : rawNorm;

      if (rawNorm <= 0) {
        el.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      // Pre-calculating settings string is faster than per-axis updates
      const settings = parsedSettings.map(({ axis, fromVal, toVal }) => {
        const val = fromVal + (toVal - fromVal) * falloffVal;
        return `'${axis}' ${val.toFixed(2)}`; // Fixed precision prevents flickering
      }).join(', ');
      
      el.style.fontVariationSettings = settings;
    });
  });

  if (!label) return null;
  const words = label.split(' ');
  let letterIdx = 0;

  return (
    <span ref={ref} onClick={onClick} className={className}
      style={{ display: 'inline', fontFamily: '"Roboto Flex", sans-serif', ...style }} {...restProps}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((l, li) => {
            const idx = letterIdx++;
            return (
              <span key={li} ref={el => { letterRefs.current[idx] = el; }}
                style={{ display: 'inline-block', willChange: 'font-variation-settings' }} aria-hidden="true">
                {l}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;

