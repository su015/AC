import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShoppingBag, 
  CreditCard,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import siteConfig from "../config/siteConfig";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OrderLoader from "./ui/OrderLoader";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Preparation for WhatsApp
    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n');
    const message = `Hi Indian Refrigeration, I'd like to place an order for:\n\n${itemsList}\n\nTotal: ₹${totalPrice.toLocaleString()}\n\nPlease confirm my order.`;
    const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

    // Show loader for a bit, then redirect
    setTimeout(() => {
      window.open(waUrl, '_blank');
      clearCart();
      setIsProcessing(false);
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen ir-frost-bg">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-sky-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-4">Your cart is empty</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-sky-500/20"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen ir-frost-bg">
      <Navbar />

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl"
          >
            <OrderLoader />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-xl font-black text-sky-600 tracking-tight"
            >
              Dispatching Your Order...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-6 py-24">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/shop")}
          className="group flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items List */}
          <div className="flex-[2]">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-black text-slate-800 dark:text-white">
                Shopping <span className="ir-text-gradient">Cart</span>
              </h1>
              <span className="text-slate-500 font-medium">{totalItems} Items</span>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="ir-glass p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/50 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{item.name}</h3>
                      <p className="text-sky-500 font-black mb-1">₹{item.price.toLocaleString()}</p>
                      <p className="text-slate-500 text-sm">{item.brand}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-1 border border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-800 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 5}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-xl font-black text-slate-800 dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="ir-glass p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center text-sky-500">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Same-Day Delivery</p>
                  <p className="text-xs text-slate-500">Available across Noida</p>
                </div>
              </div>
              <div className="ir-glass p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Genuine Spares</p>
                  <p className="text-xs text-slate-500">100% Authentic Parts</p>
                </div>
              </div>
              <div className="ir-glass p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-500">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Safe Packaging</p>
                  <p className="text-xs text-slate-500">Secure delivery handling</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex-1">
            <div className="ir-glass p-8 rounded-[2rem] sticky top-32 border-2 border-sky-500/20">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800 dark:text-white">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-500 font-bold uppercase text-xs tracking-widest mt-1">Free</span>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800 dark:text-white">Total Amount</span>
                  <span className="text-3xl font-black text-sky-500">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3 group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Order on WhatsApp
                </button>
                <p className="text-center text-xs text-slate-500 font-medium">
                  We'll confirm your delivery slot on WhatsApp instantly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
