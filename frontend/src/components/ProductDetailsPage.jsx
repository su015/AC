import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  MessageCircle, 
  Share2,
  ChevronRight,
  ShoppingBag,
  Info,
  Minus,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import siteConfig from "../config/siteConfig";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { addToCart, cart, totalPrice, updateQuantity } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const product = useMemo(() => {
    return siteConfig.shopProducts.find(p => p.id === id);
  }, [id]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return siteConfig.shopProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen ir-frost-bg flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-display font-black text-[#0C4A6E] mb-4">Product Not Found</h1>
          <p className="text-slate-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop" className="ir-btn">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const waHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (ID: ${product.id}) listed at ₹${product.price}. Is it available?`
  )}`;

  return (
    <div className="min-h-screen ir-frost-bg">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-sky-600 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-sky-600 dark:text-sky-400 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-sky-100 dark:border-slate-800 shadow-2xl"
            >
              <img 
                src={product.images[activeImage] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-slate-600 dark:text-slate-300 shadow-lg hover:text-sky-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </motion.div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 rounded-2xl border-2 transition-all overflow-hidden bg-white dark:bg-slate-900 ${
                      activeImage === idx 
                        ? "border-sky-500 shadow-lg shadow-sky-500/20" 
                        : "border-sky-100 dark:border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : 'opacity-30'}`} />
                  ))}
                  <span className="text-slate-400 text-xs font-bold ml-1">4.0 (No reviews yet)</span>
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-black text-[#0C4A6E] dark:text-sky-50 leading-tight tracking-tight">
                {product.name}
              </h1>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-4xl font-display font-black text-sky-600 dark:text-sky-400">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-slate-400 line-through font-bold">
                  ₹{(product.price * 1.2).toLocaleString()}
                </span>
                <span className="text-emerald-500 font-bold text-sm">20% OFF</span>
              </div>
            </div>

            {/* Quick Delivery/Trust */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur border border-sky-50 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Delivery</div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">Same-day in Noida</div>
                </div>
              </div>
              <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur border border-sky-50 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Warranty</div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{product.specs.warranty || "Genuine Part"}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to enquire about ${product.name}`)}`, '_blank')}
                  className="flex-1 flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white py-5 px-8 rounded-3xl font-black text-sm transition-all shadow-xl shadow-emerald-500/20 group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Enquire on WhatsApp
                </button>

                  {cart.some(item => item.id === product.id) ? (
                    <button 
                      onClick={() => navigate('/cart')}
                      className="flex-1 flex items-center justify-center gap-3 bg-[#0C4A6E] dark:bg-sky-500 text-white py-5 px-8 rounded-3xl font-black text-sm transition-all shadow-xl shadow-sky-500/20 group"
                    >
                      <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Go to Cart (₹{(cart.find(item => item.id === product.id).quantity * product.price).toLocaleString()})
                    </button>
                  ) : (
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#0C4A6E] dark:bg-sky-500 text-white py-5 px-8 rounded-3xl font-black text-sm transition-all shadow-xl shadow-sky-500/20 group"
                  >
                    <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                )}
              </div>

              {/* Quantity Selector (Only if in cart) */}
              {cart.find(item => item.id === product.id) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-sky-50/50 dark:bg-slate-800/50 rounded-2xl border border-sky-100 dark:border-slate-800"
                >
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Adjust Quantity</span>
                  <div className="flex items-center gap-6 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-sky-100 dark:border-slate-800 shadow-sm">
                    <button 
                      onClick={() => updateQuantity(product.id, cart.find(item => item.id === product.id).quantity - 1)}
                      disabled={cart.find(item => item.id === product.id).quantity <= 1}
                      className="text-slate-400 hover:text-sky-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-black text-slate-800 dark:text-white min-w-[20px] text-center">
                      {cart.find(item => item.id === product.id).quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(product.id, cart.find(item => item.id === product.id).quantity + 1)}
                      disabled={cart.find(item => item.id === product.id).quantity >= 5}
                      className="text-slate-400 hover:text-sky-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Tab-like sections */}
            <div className="space-y-6 pt-6 border-t border-sky-100 dark:border-slate-800">
              <div>
                <h3 className="font-display font-bold text-[#0C4A6E] dark:text-sky-100 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-sky-500" /> Description
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.features && (
                <div>
                  <h3 className="font-display font-bold text-[#0C4A6E] dark:text-sky-100 mb-3">Key Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specs && (
                <div>
                  <h3 className="font-display font-bold text-[#0C4A6E] dark:text-sky-100 mb-3">Specifications</h3>
                  <div className="bg-white/30 dark:bg-slate-900/30 rounded-2xl border border-sky-50 dark:border-slate-800 overflow-hidden">
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <div key={key} className={`flex justify-between p-3 text-xs ${idx % 2 === 0 ? 'bg-sky-50/30 dark:bg-slate-800/30' : ''}`}>
                        <span className="text-slate-400 font-bold uppercase tracking-wider">{key}</span>
                        <span className="text-slate-700 dark:text-slate-200 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#0C4A6E] dark:text-sky-50 mb-8">
              Similar <span className="ir-text-gradient">Products</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map(p => (
                <Link 
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-sky-100 dark:border-slate-800 rounded-3xl p-4 hover:border-sky-300 transition-all"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0C4A6E] dark:text-sky-100 line-clamp-1 mb-1">{p.name}</h3>
                  <div className="text-sky-600 dark:text-sky-400 font-black">₹{p.price.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
