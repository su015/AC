import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, CalendarCheck } from "lucide-react";
import siteConfig from "../config/siteConfig";

const CTASection = () => {
  return (
    <section data-testid="cta-section" className="relative py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#082F49] via-sky-900 to-[#0C4A6E] p-10 md:p-16 text-center text-white"
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sky-400/20 blur-[120px]" />

          <span className="relative inline-block text-xs md:text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">
            24/7 Emergency Service
          </span>
          <h2 className="relative mt-4 font-display text-4xl md:text-6xl font-black leading-[1.05]">
            Need AC service <span className="text-cyan-300">today?</span>
          </h2>
          <p className="relative mt-5 max-w-xl mx-auto text-sky-100/80 text-base md:text-lg">
            Pick your fastest channel. We usually respond within 3 minutes —
            and dispatch the same day.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneDial}`}
              data-testid="cta-call-btn"
              className="ir-btn flex"
            >
              <PhoneCall className="w-4 h-4" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi, I need AC service today.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-btn"
              className="ir-btn flex"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="#contact"
              data-testid="cta-book-btn"
              className="ir-btn flex"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Service
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
