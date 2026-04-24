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
import VRFSection from "./components/VRFSection";
import HowItWorksSection from "./components/HowItWorksSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import GlobeSection from "./components/GlobeSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";
import AuthPage from "./components/AuthPage";
import GalleryPage from "./components/GalleryPage";
import VideosPage from "./components/VideosPage";
import ScrollToHash from "./components/ui/ScrollToHash";
import ScrollProgress from "./components/ui/ScrollProgress";
import LogoCarousel from "./components/ui/LogoCarousel";
import AccessoriesSection from "./components/AccessoriesSection";
import siteConfig from "./config/siteConfig";
import { Phone, MessageCircle, CalendarCheck, Home as HomeIcon } from "lucide-react";
import MobileBottomBar from "./components/MobileBottomBar";
import ScrollToTop from "./components/ScrollToTop";

const Home = () => {
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
          <AccessoriesSection />
          <ShopSection />
          <VRFSection />
          <HowItWorksSection />
          <WhyChooseUsSection />
          <GlobeSection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
        <MobileBottomBar />
        <ScrollToTop />
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
          <ScrollToHash />
          <ConditionalWeatherMonitor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/videos" element={<VideosPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
