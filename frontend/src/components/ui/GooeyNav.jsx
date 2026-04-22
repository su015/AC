import React, { useRef, useEffect, useState } from 'react';

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 12,
  particleDistances = [80, 10],
  particleR = 100,
  timeVariance = 300,
  colors = ['#0EA5E9', '#00E5FF', '#38BDF8', '#22D3EE'],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentParticleCount = isMobile ? Math.floor(particleCount / 3) : particleCount;

  const noise = (n = 1) => n / 2 - Math.random() * n;
  
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    
    for (let i = 0; i < currentParticleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      
      const particle = document.createElement('span');
      const point = document.createElement('span');
      
      particle.classList.add('particle');
      particle.style.setProperty('--start-x', `${p.start[0]}px`);
      particle.style.setProperty('--start-y', `${p.start[1]}px`);
      particle.style.setProperty('--end-x', `${p.end[0]}px`);
      particle.style.setProperty('--end-y', `${p.end[1]}px`);
      particle.style.setProperty('--time', `${p.time}ms`);
      particle.style.setProperty('--scale', `${p.scale}`);
      particle.style.setProperty('--color', p.color);
      particle.style.setProperty('--rotate', `${p.rotate}deg`);
      
      point.classList.add('point');
      particle.appendChild(point);
      element.appendChild(particle);
      
      setTimeout(() => {
        try {
          if (element.contains(particle)) {
            element.removeChild(particle);
          }
        } catch (e) {}
      }, t);
    }
    
    element.classList.remove('active');
    requestAnimationFrame(() => {
      element.classList.add('active');
    });
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e, index, href) => {
    // If it's a hash link, let the browser handle it or scroll manually
    const liEl = e.currentTarget.parentElement;
    if (activeIndex === index) return;
    
    setActiveIndex(index);
    updateEffectPosition(liEl);
    
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => {
        if (filterRef.current.contains(p)) filterRef.current.removeChild(p);
      });
      makeParticles(filterRef.current);
    }
    
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
      // Trigger gooey effect on initial load
      if (filterRef.current && filterRef.current.querySelectorAll('.particle').length === 0) {
        makeParticles(filterRef.current);
      }
    }
    
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="relative" ref={containerRef}>
      <style>
        {`
          .gooey-nav-container {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: var(--ir-heading);
            transition: color 0.3s ease;
            font-weight: 700;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Manrope", sans-serif;
          }
          .dark .effect.text {
            color: #f8fafc;
          }
          .effect.text.active {
            color: white;
          }
          .effect.filter {
            filter: url('#gooey-filter');
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, #0ea5e9, #00e5ff);
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.filter.active::after {
            animation: pill 0.4s var(--linear-ease) both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 18px;
            height: 18px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 9px);
            left: calc(50% - 9px);
            animation: particle calc(var(--time)) ease 1 -150ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -150ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.1), calc(var(--end-y) * 1.1));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active {
            color: white;
          }
          li {
             color: #0c4a6e;
             transition: color 0.3s ease;
             opacity: 0.8;
          }
          .dark li {
             color: #bae6fd;
             opacity: 0.7;
          }
          li.active {
            color: white;
            opacity: 1;
          }
        `}
      </style>
      <div className="gooey-nav-container">
        <nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul
            ref={navRef}
            className="flex gap-2 list-none p-0 m-0 relative z-[10]"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`rounded-full relative cursor-pointer ${
                  activeIndex === index ? 'active' : ''
                }`}
              >
                <a
                  href={item.href}
                  onClick={e => handleClick(e, index, item.href)}
                  className="outline-none py-2 px-4 inline-block text-[13px] font-bold uppercase tracking-wider"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GooeyNav;
