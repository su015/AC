import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import siteConfig from "../config/siteConfig";
import SectionLabel from "./ui/SectionLabel";

const SERVICE_OPTIONS = [
  "AC Installation",
  "AC Repair",
  "Gas Refilling",
  "AC Cleaning",
  "AMC Plan",
  "Fridge / Freezer",
  "Buy New AC",
  "Accessories",
];

import Stepper, { Step } from "./ui/Stepper";

import {
  Wrench,
  Settings,
  Droplets,
  Sparkles,
  CalendarCheck,
  Refrigerator,
  AirVent,
  Radio,
} from "lucide-react";

const SERVICE_ICONS = {
  "AC Installation": Wrench,
  "AC Repair": Settings,
  "Gas Refilling": Droplets,
  "AC Cleaning": Sparkles,
  "AMC Plan": CalendarCheck,
  "Fridge / Freezer": Refrigerator,
  "Buy New AC": AirVent,
  "Accessories": Radio,
};

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submitBooking = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${siteConfig.api.base}${siteConfig.api.bookings}`,
        form,
      );
      toast.success("Booking received! We'll call you within 10 minutes.");
      setDone(true);
    } catch (err) {
      toast.error("Couldn't send booking. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <div
          >
            <SectionLabel icon={PhoneCall} label="Contact" />
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight tracking-tight">
              Let's get you <span className="ir-text-gradient">cool again.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-lg">
              Fill the form and we'll call you within 10 minutes during working
              hours. Or reach us directly — whichever's faster for you.
            </p>

            <div className="mt-10 space-y-4 max-w-lg">
              <a
                href={`tel:${siteConfig.contact.phoneDial}`}
                className="group ir-card ir-glass rounded-2xl p-5 flex items-center gap-5 transition-all hover:translate-x-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-sky-500 font-black">
                    Call us
                  </div>
                  <div className="font-display text-xl font-bold text-[#0C4A6E] dark:text-sky-100">
                    {siteConfig.contact.phone}
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group ir-card ir-glass rounded-2xl p-5 flex items-center gap-5 transition-all hover:translate-x-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-black">
                    WhatsApp
                  </div>
                  <div className="font-display text-xl font-bold text-[#0C4A6E] dark:text-sky-100">
                    Chat now · instant reply
                  </div>
                </div>
              </a>

              <div className="flex flex-col sm:flex-row gap-4">
                 <div className="flex-1 ir-glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-sky-500 font-bold">
                        Visit
                      </div>
                      <div className="text-xs font-semibold text-[#0C4A6E] dark:text-slate-300 mt-1">
                        Sector 31, Noida
                      </div>
                    </div>
                 </div>
                 <div className="flex-1 ir-glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-sky-500 font-bold">
                        Hours
                      </div>
                      <div className="text-xs font-semibold text-[#0C4A6E] dark:text-slate-300 mt-1">
                        {siteConfig.contact.hours}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Stepper form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="ir-glass rounded-[2.5rem] overflow-hidden flex flex-col h-full min-h-[500px]"
          >
            <div className="px-8 pt-10">
               <h3 className="font-display text-2xl md:text-4xl font-black text-[#0C4A6E] dark:text-sky-50">
                  Book your service
               </h3>
               <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Free quote. No obligation.
               </p>
            </div>

            <Stepper 
               onFinalStepCompleted={submitBooking}
               nextButtonText="Next Step"
               className="flex-1"
            >
               <Step>
                  <div className="px-6 md:px-8 space-y-4 pt-6 pb-2">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mb-4 block">
                        Choose Service
                     </label>
                     <motion.div 
                        variants={{
                           hidden: { opacity: 0 },
                           show: {
                              opacity: 1,
                              transition: { staggerChildren: 0.03 }
                           }
                        }}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 gap-3 mt-4"
                     >
                        {SERVICE_OPTIONS.map((s) => {
                           const Icon = SERVICE_ICONS[s] || AirVent;
                           const isActive = form.service === s;
                           
                           return (
                              <motion.button
                                 key={s}
                                 variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    show: { opacity: 1, scale: 1 }
                                 }}
                                 type="button"
                                 onClick={() => setForm(f => ({ ...f, service: s }))}
                                 whileHover={{ scale: 1.02, y: -1 }}
                                 whileTap={{ scale: 0.98 }}
                                 className={`group relative p-3 rounded-2xl text-left transition-all border overflow-hidden ${
                                    isActive 
                                    ? "bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20" 
                                    : "bg-white/40 dark:bg-slate-800/40 text-[#0C4A6E] dark:text-sky-200 border-white/20 hover:bg-white/60 dark:hover:bg-slate-800/60"
                                 }`}
                              >
                                 <div className="flex items-center gap-3 relative z-10">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                                       isActive ? "bg-white/20" : "bg-sky-500/10 dark:bg-sky-400/10"
                                    }`}>
                                       <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-sky-600 dark:text-sky-400"}`} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-tight leading-tight">
                                       {s}
                                    </span>
                                 </div>
                              </motion.button>
                           );
                        })}
                     </motion.div>
                  </div>
               </Step>

               <Step>
                  <div className="px-6 md:px-8 space-y-6 pt-6 pb-2">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                           Full Name
                        </label>
                        <input
                           type="text"
                           name="name"
                           value={form.name}
                           onChange={onChange}
                           placeholder="Your full name"
                           className="mt-2 w-full bg-white/50 dark:bg-slate-900/50 border border-sky-100 dark:border-slate-800 focus:border-sky-500 rounded-2xl px-5 py-4 text-[#0C4A6E] dark:text-sky-100 placeholder:text-slate-400 outline-none transition shadow-sm"
                        />
                     </div>
                     <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                              Phone
                           </label>
                           <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={onChange}
                              placeholder="+91 98765 43210"
                              className="mt-2 w-full bg-white/50 dark:bg-slate-900/50 border border-sky-100 dark:border-slate-800 focus:border-sky-500 rounded-2xl px-5 py-4 text-[#0C4A6E] dark:text-sky-100 placeholder:text-slate-400 outline-none transition shadow-sm"
                           />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                              Email (Optional)
                           </label>
                           <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={onChange}
                              placeholder="you@example.com"
                              className="mt-2 w-full bg-white/50 dark:bg-slate-900/50 border border-sky-100 dark:border-slate-800 focus:border-sky-500 rounded-2xl px-5 py-4 text-[#0C4A6E] dark:text-sky-100 placeholder:text-slate-400 outline-none transition shadow-sm"
                           />
                        </div>
                     </div>
                  </div>
               </Step>

               <Step>
                  <div className="px-6 md:px-8 space-y-6 pt-6 pb-2">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                           Message (Optional)
                        </label>
                        <textarea
                           name="message"
                           value={form.message}
                           onChange={onChange}
                           rows={4}
                           placeholder="Describe your issue or requirement…"
                           className="mt-2 w-full bg-white/50 dark:bg-slate-900/50 border border-sky-100 dark:border-slate-800 focus:border-sky-500 rounded-2xl px-5 py-4 text-[#0C4A6E] dark:text-sky-100 placeholder:text-slate-400 outline-none transition shadow-sm resize-none"
                        />
                     </div>
                     <div className="bg-sky-50/50 dark:bg-slate-800/50 rounded-2xl p-5 border border-sky-100/50 dark:border-slate-700/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-sky-500">
                           Summary
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                           <span className="text-sm font-bold text-[#0C4A6E] dark:text-sky-100">{form.service}</span>
                           <span className="text-xs text-slate-500 dark:text-slate-400">Call within 10 mins</span>
                        </div>
                     </div>
                  </div>
               </Step>
            </Stepper>

            {done && (
               <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-10 text-center z-50">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 mb-6">
                     <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-[#0C4A6E] dark:text-sky-50">Booking Confirmed!</h4>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xs">
                     Our technician will call you at <strong>{form.phone}</strong> shortly to confirm the time.
                  </p>
                  <button 
                     onClick={() => setDone(false)}
                     className="mt-8 text-sky-600 dark:text-sky-400 font-bold text-sm"
                  >
                     Book another service
                  </button>
               </div>
            )}
            
            {loading && (
               <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-50">
                  <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
