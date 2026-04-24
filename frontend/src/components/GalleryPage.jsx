import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Maximize2, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "./ui/SectionLabel";
import Navbar from "./Navbar";
import Footer from "./Footer";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1590486803833-ffc6f08d059e?auto=format&fit=crop&q=80&w=1200", title: "Installation Work" },
    { id: 2, url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1200", title: "Deep Cleaning" },
    { id: 3, url: "https://images.unsplash.com/photo-1581094288338-2314dddb790d?auto=format&fit=crop&q=80&w=1200", title: "Professional Tools" },
    { id: 4, url: "https://images.unsplash.com/photo-1454165833767-027eeef15265?auto=format&fit=crop&q=80&w=1200", title: "Site Inspection" },
    { id: 5, url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200", title: "VRF Setup" },
    { id: 6, url: "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=1200", title: "Workshop" },
  ];

  return (
    <div className="ir-frost-bg min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold mb-8 hover:gap-3 transition-all group"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="text-center mb-16">
          <SectionLabel icon={Image} label="Project Gallery" />
          <h1 className="text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-white mt-4">
            Our Work in <span className="ir-text-gradient">Action.</span>
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Take a look at our recent installations and service projects across Noida. We take pride in our precision and clean workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              layoutId={`img-${img.id}`}
              onClick={() => setSelectedImage(img)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 shadow-xl cursor-zoom-in"
            >
              <motion.img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-white font-black text-xl mb-2">{img.title}</span>
                <span className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                  <Maximize2 className="w-4 h-4" /> Click to Expand
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              layoutId={`img-${selectedImage.id}`}
              className="relative max-w-5xl w-full aspect-square md:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl md:text-4xl font-black text-white">{selectedImage.title}</h3>
                <p className="text-sky-400 font-bold mt-2 tracking-widest uppercase text-xs md:text-sm">Verified Project · Sector 31 Noida</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default GalleryPage;
