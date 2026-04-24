import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import siteConfig from "../config/siteConfig";
import SectionLabel from "./ui/SectionLabel";

const Globe = lazy(() => import("react-globe.gl"));

const GlobeSection = () => {
  const globeRef = useRef(null);
  const wrapRef = useRef(null);
  const textContainerRef = useRef(null);
  const [size, setSize] = useState({ w: 600, h: 520 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      setSize({ w: Math.floor(rect.width), h: Math.floor(rect.height) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const g = globeRef.current;
    g.pointOfView(
      {
        lat: siteConfig.contact.location.lat,
        lng: siteConfig.contact.location.lng,
        altitude: 1.8,
      },
      0,
    );
    const controls = g.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
    }
    // Dramatic zoom-in after mount
    const t = setTimeout(() => {
      g.pointOfView(
        {
          lat: siteConfig.contact.location.lat,
          lng: siteConfig.contact.location.lng,
          altitude: 0.9,
        },
        2200,
      );
    }, 600);
    return () => clearTimeout(t);
  }, [ready]);

  const markers = [
    {
      lat: siteConfig.contact.location.lat,
      lng: siteConfig.contact.location.lng,
      size: 28,
      label: "Sector 31, Noida",
    },
  ];

  const ringsData = [
    {
      lat: siteConfig.contact.location.lat,
      lng: siteConfig.contact.location.lng,
      maxR: 6,
      propagationSpeed: 3,
      repeatPeriod: 900,
    },
  ];

  return (
    <section
      data-testid="globe-section"
      className="relative py-12 md:py-16 bg-[#082F49] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-40 w-[540px] h-[540px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-10 -right-40 w-[540px] h-[540px] rounded-full bg-sky-500/20 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div
          ref={textContainerRef}
        >
          <SectionLabel icon={MapPin} label="Service Area" />
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-black text-white leading-tight">
            Rooted in <span className="text-cyan-300">Sector 31</span>.
            Serving all of Noida.
          </h2>
          <div className="mt-5 text-sky-100/80 text-base md:text-lg max-w-xl">
            <p>
              We're a local, family-run business. That's why we can reach you faster, charge fairer, and stand behind every job with a 90-day warranty.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {siteConfig.serviceAreas.map((a) => (
              <div
                key={a}
                className="flex items-center gap-2 text-sm text-sky-100"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                {a}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`https://maps.google.com/?q=${siteConfig.contact.location.lat},${siteConfig.contact.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="globe-directions-btn"
              className="ir-btn inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-sky-900 font-bold px-6 py-3.5 rounded-full text-sm"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneDial}`}
              className="ir-btn inline-flex items-center gap-2 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 font-bold px-6 py-3.5 rounded-full text-sm"
            >
              <MapPin className="w-4 h-4" />
              {siteConfig.contact.address.full}
            </a>
          </div>
        </div>

        <div
          ref={wrapRef}
          className="relative h-[420px] md:h-[520px] ir-glass-dark rounded-[2rem] overflow-hidden"
          data-testid="globe-container"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-cyan-200 text-sm">
                Loading globe…
              </div>
            }
          >
            {size.w > 0 && (
              <Globe
                ref={globeRef}
                width={size.w}
                height={size.h}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                atmosphereColor="#00E5FF"
                atmosphereAltitude={0.22}
                pointsData={markers}
                pointLat="lat"
                pointLng="lng"
                pointColor={() => "#00E5FF"}
                pointAltitude={0.04}
                pointRadius={0.7}
                pointLabel={(d) => `<div style="color:#082F49;background:#fff;padding:6px 10px;border-radius:8px;font-weight:700">${d.label}</div>`}
                ringsData={ringsData}
                ringColor={() => "rgba(0,229,255,0.85)"}
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
                onGlobeReady={() => setReady(true)}
              />
            )}
          </Suspense>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-cyan-400/30 text-[11px] font-bold uppercase tracking-widest text-cyan-200">
            Live · Noida
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobeSection;
