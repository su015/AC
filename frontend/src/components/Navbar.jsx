import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Snowflake, CalendarCheck } from "lucide-react";
import siteConfig from "../config/siteConfig";
import ThemeToggle from "./ThemeToggle";
import GooeyNav from "./ui/GooeyNav";
import Magnetic from "./ui/Magnetic";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border-b border-sky-100 dark:border-slate-800 shadow-[0_10px_40px_-20px_rgba(14,165,233,0.3)]"
          : "backdrop-blur-md bg-white/30 dark:bg-slate-900/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#home"
          data-testid="brand-link"
          className="flex items-center gap-2 group"
        >
          <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(14,165,233,0.6)] group-hover:rotate-12 transition-transform">
            <Snowflake className="w-5 h-5 text-white" strokeWidth={2.4} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-[15px] md:text-base text-[#0C4A6E] dark:text-sky-100 tracking-tight">
              Indian Refrigeration
            </span>
            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-500 dark:text-sky-400">
              Sector 31 · Noida
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center">
          <GooeyNav items={siteConfig.navigation} />
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Magnetic>
            <a
              href="#contact"
              data-testid="navbar-book-btn"
              className="hidden lg:flex ir-btn items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-sky-300/40"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Service
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
            className="md:hidden w-10 h-10 rounded-xl border border-sky-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 backdrop-blur flex items-center justify-center text-sky-700 dark:text-sky-400 flex-shrink-0"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-sky-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {siteConfig.navigation.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                  className="py-3 text-lg font-bold text-[#0C4A6E] dark:text-sky-100 border-b border-sky-50 dark:border-slate-800/50 flex items-center justify-between group"
                >
                  {n.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setOpen(false)}
                className="mt-6 text-center bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-4 rounded-2xl font-bold shadow-xl shadow-sky-500/20"
              >
                Book Service Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
