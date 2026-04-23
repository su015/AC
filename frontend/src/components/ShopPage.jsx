import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowLeft,
  ShoppingBag,
  SlidersHorizontal,
  X
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import siteConfig from "../config/siteConfig";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ShopPage = () => {
  const { addToCart, totalItems, totalPrice, cart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [priceRange, setPriceRange] = useState(2000); // Max price for filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brands = useMemo(() => {
    const b = new Set(siteConfig.shopProducts.map(a => a.brand));
    return ["All Brands", ...Array.from(b)];
  }, []);

  const filteredProducts = useMemo(() => {
    return siteConfig.shopProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === "All Brands" || p.brand === selectedBrand;
      const matchesPrice = p.price <= priceRange;
      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [searchQuery, selectedBrand, priceRange]);



  return (
    <div className="min-h-screen ir-frost-bg">
      <Navbar />
      
      <main className="pt-24 md:pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm mb-4 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <h1 className="font-display text-4xl md:text-6xl font-black text-[#0C4A6E] dark:text-sky-50 tracking-tight">
              Genuine <span className="ir-text-gradient">Accessories</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl text-lg">
              Explore our range of authentic spare parts and accessories with same-day delivery in Noida.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 px-4 py-2 rounded-2xl border border-sky-200 dark:border-sky-800">
             <ShoppingBag className="w-5 h-5 text-sky-600 dark:text-sky-400" />
             <span className="font-black text-sky-800 dark:text-sky-200">{filteredProducts.length} Products</span>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="relative z-20 flex flex-col md:flex-row items-end gap-4 mb-10">
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 rounded-2xl -z-10 group-focus-within:bg-white/60 dark:group-focus-within:bg-slate-900/60 transition-colors duration-300"></div>
            <div className="relative flex items-center border border-sky-100/50 dark:border-slate-800/50 rounded-2xl px-4 py-1.5 transition-all duration-300 group-focus-within:border-sky-500/50 group-focus-within:shadow-[0_0_20px_-10px_rgba(14,165,233,0.5)]">
              <motion.div 
                animate={{ 
                  scale: searchQuery ? 1.1 : 1,
                  color: searchQuery ? "#0EA5E9" : "#94A3B8"
                }}
                className="mr-3"
              >
                <Search className="w-5 h-5" />
              </motion.div>
              <input
                type="text"
                placeholder="Search products, brands or accessories..."
                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-slate-700 dark:text-slate-200 placeholder-slate-400/70 py-4 text-base md:text-lg font-medium shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-slate-400 hover:text-sky-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border transition-all font-bold ${
              isFilterOpen 
                ? "bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/20" 
                : "bg-white/70 dark:bg-slate-900/70 border-sky-100 dark:border-slate-800 text-sky-700 dark:text-sky-400 hover:border-sky-300 shadow-sm"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
            {isFilterOpen ? <X className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-sky-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 grid md:grid-cols-2 gap-8 shadow-xl">
                {/* Brand Filter */}
                <div>
                  <h3 className="text-sm font-black text-[#0C4A6E] dark:text-sky-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filter by Brand
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                          selectedBrand === brand
                            ? "bg-sky-100 border-sky-300 text-sky-700 dark:bg-sky-900 dark:border-sky-700 dark:text-sky-100 shadow-inner"
                            : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:border-sky-200"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-black text-[#0C4A6E] dark:text-sky-100 uppercase tracking-widest flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4" /> Max Price: ₹{priceRange}
                    </h3>
                  </div>
                  <input 
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-2 bg-sky-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>₹100</span>
                    <span>₹2000+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group relative bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 cursor-pointer border border-sky-100 dark:border-slate-800"
              >
                {/* Image Section with Theme Gradient */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-sky-400 to-blue-600 dark:from-sky-500 dark:to-blue-700 overflow-hidden">
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    whileHover={{ scale: 1.1 }}
                    className="w-full h-full object-cover drop-shadow-2xl"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <h3 className="text-base md:text-2xl font-black text-slate-800 dark:text-white mb-2 md:mb-3 group-hover:text-sky-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    <span className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {product.brand}
                    </span>
                  </div>

                  <p className="hidden md:block text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price and Action */}
                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
                    <div>
                      <span className="block text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Price</span>
                      <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">₹{product.price.toLocaleString()}</span>
                    </div>
                    
                    {cart.some(item => item.id === product.id) ? (
                      <div className="bg-emerald-500 text-white px-3 md:px-6 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 w-full sm:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        In Cart
                      </div>
                    ) : (
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 md:px-6 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        Add to cart
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-sky-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-sky-100 dark:border-slate-800">
               <X className="w-10 h-10 text-sky-300" />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#0C4A6E] dark:text-sky-100 mb-2">No accessories found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("All Brands");
                setPriceRange(2000);
              }}
              className="mt-6 text-sky-600 font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 md:bottom-8 inset-x-6 z-50 flex justify-center"
          >
            <div 
              onClick={() => navigate('/cart')}
              className="bg-[#0C4A6E] dark:bg-sky-500 text-white px-6 md:px-8 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center gap-6 md:gap-10 cursor-pointer hover:scale-105 transition-transform border border-white/20 backdrop-blur-xl w-full max-w-md md:w-auto"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center relative">
                  <ShoppingBag className="w-6 h-6 text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-sky-600 text-[10px] font-black rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Current Total</p>
                  <p className="text-xl font-black">₹{totalPrice.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="h-10 w-px bg-white/20"></div>
              
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
                Checkout Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ShopPage;
