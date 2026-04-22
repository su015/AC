import React from "react";
import { PhoneCall, MessageCircle, CalendarCheck } from "lucide-react";
import siteConfig from "../config/siteConfig";

const MobileBottomBar = () => {
  return (
    <div
      data-testid="mobile-bottom-bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-sky-100 shadow-[0_-10px_40px_-10px_rgba(14,165,233,0.25)]"
    >
      <div className="grid grid-cols-3">
        <a
          href={`tel:${siteConfig.contact.phoneDial}`}
          data-testid="bottom-call"
          className="flex flex-col items-center gap-1 py-3 text-sky-700 active:bg-sky-50"
        >
          <PhoneCall className="w-5 h-5" strokeWidth={2.2} />
          <span className="text-[11px] font-bold">Call</span>
        </a>
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi, I need AC service.")}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="bottom-whatsapp"
          className="flex flex-col items-center gap-1 py-3 text-emerald-600 active:bg-emerald-50 border-x border-sky-100"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2.2} />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>
        <a
          href="#contact"
          data-testid="bottom-book"
          className="flex flex-col items-center gap-1 py-3 text-white bg-gradient-to-br from-sky-500 to-cyan-400"
        >
          <CalendarCheck className="w-5 h-5" strokeWidth={2.2} />
          <span className="text-[11px] font-bold">Book</span>
        </a>
      </div>
    </div>
  );
};

export default MobileBottomBar;
