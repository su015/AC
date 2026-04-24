import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Play, ExternalLink, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "./ui/SectionLabel";
import Navbar from "./Navbar";
import Footer from "./Footer";

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    { 
      id: "wu4NYMmk8pk", 
      title: "AC Installation Masterclass", 
      duration: "10:24", 
      thumbnail: "https://img.youtube.com/vi/wu4NYMmk8pk/maxresdefault.jpg",
      description: "Step-by-step professional split AC installation by our senior tech."
    },
    { 
      id: "wu4NYMmk8pk", 
      title: "Deep Jet Cleaning Demo", 
      duration: "5:45", 
      thumbnail: "https://img.youtube.com/vi/wu4NYMmk8pk/maxresdefault.jpg",
      description: "Watch how we remove 99% of dust using high-pressure jet pumps."
    },
    { 
      id: "wu4NYMmk8pk", 
      title: "VRF System Troubleshooting", 
      duration: "12:15", 
      thumbnail: "https://img.youtube.com/vi/wu4NYMmk8pk/maxresdefault.jpg",
      description: "Expert diagnostics on a multi-unit commercial VRF setup."
    },
    { 
      id: "wu4NYMmk8pk", 
      title: "Why Maintenance Matters", 
      duration: "3:50", 
      thumbnail: "https://img.youtube.com/vi/wu4NYMmk8pk/maxresdefault.jpg",
      description: "Comparing the efficiency of serviced vs non-serviced units."
    },
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
          <SectionLabel icon={Video} label="Video Library" />
          <h1 className="text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-white mt-4">
            Live <span className="ir-text-gradient">Previews.</span>
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Watch our certified technicians in action. We believe in complete transparency throughout our service process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((vid, i) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedVideo(vid)}
              className="group relative rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl cursor-pointer"
            >
              <div className="relative aspect-video">
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-2xl shadow-sky-500/50 relative z-10 group-hover:bg-white group-hover:text-sky-500 transition-colors"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </motion.div>
                </div>
                <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-black tracking-widest">
                  {vid.duration}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-white">{vid.title}</h3>
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-sky-500 group-hover:border-sky-400 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{vid.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/98 backdrop-blur-2xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 z-[110]"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-6xl w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default VideosPage;
