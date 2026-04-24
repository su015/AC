import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Menu, X, Snowflake, ShoppingBag, LogIn, ChevronDown } from "lucide-react";
import siteConfig from "../config/siteConfig";
import ThemeToggle from "./ThemeToggle";
import GooeyNav from "./ui/GooeyNav";
import Magnetic from "./ui/Magnetic";

const Navbar = () => {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const mainItems = siteConfig.navigation.filter(item => !item.children);
  const moreItem = siteConfig.navigation.find(item => item.children);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Scroll Spy Logic
    const sections = ["services", "shop", "contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" });

      observer.observe(el);
      return observer;
    });

    // Reset to home if at top
    const topObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setActiveSection(null);
    }, { threshold: 0.1 });
    const hero = document.getElementById('home');
    if (hero) topObserver.observe(hero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach(o => o?.disconnect());
      topObserver.disconnect();
    };
  }, []);

  // Determine active index relative to mainItems
  const activeIndex = mainItems.findIndex(item => {
    if (!item.href) return false;
    
    // If we have an active section from scroll spy or a hash in URL, prioritize it
    if (location.pathname === "/") {
      const currentHash = location.hash.replace("#", "");
      if (currentHash && item.href.includes(`#${currentHash}`)) return true;
      if (activeSection && item.href.includes(`#${activeSection}`)) return true;
      if (!activeSection && !currentHash && item.href === "/") return true;
    }
    
    // Fallback to URL matching
    if (item.href === "/") return location.pathname === "/" && !location.hash;
    if (item.href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === item.href.replace("/", "");
    }
    return location.pathname.startsWith(item.href);
  });

  const safeActiveIndex = activeIndex;

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
        <Link
          to="/"
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
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <GooeyNav items={mainItems} activeIndex={safeActiveIndex} />
          
          {moreItem && (
            <div className="relative group ml-1">
              <button className="flex items-center gap-1.5 py-2 px-4 rounded-full text-[13px] font-bold uppercase tracking-wider text-slate-600 dark:text-sky-200/70 hover:text-sky-600 dark:hover:text-white transition-all">
                {moreItem.label}
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="w-48 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-sky-100 dark:border-slate-800 shadow-2xl overflow-hidden p-2">
                  {moreItem.children.map((child, idx) => (
                    <Link
                      key={idx}
                      to={child.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white transition-all group/item"
                    >
                      <span className="text-[13px] font-bold uppercase tracking-wider">{child.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Link
            to="/cart"
            className="relative flex items-center gap-2 p-2 px-3 rounded-xl border border-sky-100 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-sky-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg shadow-sky-500/40"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            
            <AnimatePresence>
              {totalPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="hidden sm:flex flex-col items-start leading-none pr-1"
                >
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cart Total</span>
                  <span className="text-[13px] font-black text-sky-600 dark:text-sky-400">₹{totalPrice.toLocaleString()}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <div className="hidden lg:flex items-center gap-6 ml-2">
            <Magnetic>
              <Link
                to="/auth"
                state={{ mode: 'login' }}
                className="ir-btn flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-sky-300/40 hover:shadow-sky-400/50 transition-all group"
              >
                <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 400 }}>
                    <LogIn className="w-4 h-4" />
                </motion.div>
                Login
              </Link>
            </Magnetic>
          </div>
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-sky-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden overscroll-contain"
          >
            <div className="px-6 py-8 flex flex-col gap-1">
              {/* Main Navigation Items */}
              {siteConfig.navigation.map((n, i) => {
                if (n.children) {
                  return n.children.map((child, childIdx) => (
                    <motion.div
                      key={child.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (i + childIdx) * 0.05 + 0.1 }}
                    >
                      <Link
                        to={child.href}
                        onClick={() => setOpen(false)}
                        className="py-3.5 text-lg font-bold text-[#0C4A6E] dark:text-sky-100 border-b border-sky-50 dark:border-slate-800/50 flex items-center justify-between group"
                      >
                        <span className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          {child.label}
                        </span>
                        <span className="text-sky-400">→</span>
                      </Link>
                    </motion.div>
                  ));
                }

                return (
                  <motion.div
                    key={n.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={n.href}
                      onClick={() => setOpen(false)}
                      className="py-3.5 text-lg font-bold text-[#0C4A6E] dark:text-sky-100 border-b border-sky-50 dark:border-slate-800/50 flex items-center justify-between group"
                    >
                      {n.label}
                      <span className="text-sky-400">→</span>
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/auth"
                  state={{ mode: 'login' }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-4 rounded-2xl font-bold shadow-xl shadow-sky-500/20"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
