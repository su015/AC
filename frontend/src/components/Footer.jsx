import React from "react";
import { Snowflake, PhoneCall, MessageCircle, Mail, MapPin } from "lucide-react";
import siteConfig from "../config/siteConfig";

const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-sky-100 pt-16 pb-10 border-t border-slate-200 dark:border-white/5 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center">
              <Snowflake className="w-5 h-5 text-white dark:text-[#082F49]" strokeWidth={2.4} />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-base text-[#0C4A6E] dark:text-white">
                {siteConfig.business.name}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-cyan-300">
                Est. {siteConfig.business.founded}
              </span>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-500 dark:text-sky-200/80 max-w-md leading-relaxed">
            {siteConfig.business.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneDial}`}
              className="inline-flex items-center gap-2 bg-sky-50 dark:bg-white/10 hover:bg-sky-100 dark:hover:bg-white/15 border border-sky-100 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold text-sky-700 dark:text-white"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500/80 hover:bg-emerald-500 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-[#0C4A6E] dark:text-white font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-sky-200/80">
            {siteConfig.navigation.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-sky-600 dark:hover:text-cyan-300 transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[#0C4A6E] dark:text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-sky-200/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-sky-600 dark:text-cyan-300" />
              {siteConfig.contact.address.full}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-600 dark:text-cyan-300" />
              {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-sky-600 dark:text-cyan-300" />
              {siteConfig.contact.phone}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-sky-200/60">
          <span>
            © {new Date().getFullYear()} {siteConfig.business.name}. All rights
            reserved.
          </span>
          <span>
            Built with care in Sector 31, Noida · {siteConfig.contact.hours}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
