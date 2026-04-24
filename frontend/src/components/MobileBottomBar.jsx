import React from "react";
import { Home, ShoppingBag, Wrench, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import siteConfig from "../config/siteConfig";

const MobileBottomBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const items = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Shop", icon: ShoppingBag, href: "/shop" },
    { label: "Services", icon: Wrench, href: "/#services" },
    { label: "Contact", icon: MessageCircle, href: `https://wa.me/${siteConfig.contact.whatsapp}` },
  ];

  return (
    <div
      data-testid="mobile-bottom-bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-[60] bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-t border-sky-100 dark:border-slate-800 shadow-[0_-10px_40px_-10px_rgba(14,165,233,0.2)]"
    >
      <div className="grid grid-cols-4 px-2 py-2.5">
        {items.map((item) => {
          const isExternal = item.href.startsWith("http");
          const Component = isExternal ? "a" : Link;
          const active = isActive(item.href);

          return (
            <Component
              key={item.label}
              to={!isExternal ? item.href : undefined}
              href={isExternal ? item.href : undefined}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center gap-1 py-1 rounded-xl transition-all duration-300 ${
                active 
                  ? "text-sky-600 dark:text-sky-400 scale-110" 
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
              <span className={`text-[10px] font-black uppercase tracking-wider ${active ? "opacity-100" : "opacity-70"}`}>
                {item.label}
              </span>
            </Component>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomBar;
