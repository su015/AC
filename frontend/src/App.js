import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

import Navbar from "./components/Navbar";
import SnowParticles from "./components/SnowParticles";
import WeatherMonitor from "./components/ui/WeatherMonitor";
import Preloader from "./components/ui/Preloader";
import HeroSlider from "./components/HeroSlider";

import ServicesSection from "./components/ServicesSection";
import ShopSection from "./components/ShopSection";
import ShopPage from "./components/ShopPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import HowItWorksSection from "./components/HowItWorksSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import GlobeSection from "./components/GlobeSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Dock from "./components/ui/Dock";
import ScrollProgress from "./components/ui/ScrollProgress";
import LogoCarousel from "./components/ui/LogoCarousel";
import siteConfig from "./config/siteConfig";
import { Phone, MessageCircle, CalendarCheck, Home as HomeIcon } from "lucide-react";

import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";
import AuthPage from "./components/AuthPage";


const Home = () => {
  const dockItems = [
    {
      icon: <HomeIcon className="w-6 h-6 text-sky-500" />,
      label: "Home",
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      icon: <Phone className="w-6 h-6 text-emerald-500" />,
      label: "Call",
      onClick: () => window.location.href = `tel:${siteConfig.contact.phoneDial}`
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      label: "WhatsApp",
      onClick: () => window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, '_blank')
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-sky-400" />,
      label: "Book",
      onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  return (
    <div className="relative ir-frost-bg min-h-screen">
      <ScrollProgress />
      {siteConfig.featureToggles.snowParticles && <SnowParticles count={36} />}
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSlider />
          <LogoCarousel />

          <ServicesSection />
          <ShopSection />
          <HowItWorksSection />
          <WhyChooseUsSection />
          <GlobeSection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
        <div className="md:hidden">
          <Dock items={dockItems} />
        </div>
      </div>
    </div>
  );
};


const ConditionalWeatherMonitor = () => {
  const location = useLocation();
  if (location.pathname === '/auth') return null;
  return <WeatherMonitor />;
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <Preloader />
        <BrowserRouter>
          <ConditionalWeatherMonitor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
