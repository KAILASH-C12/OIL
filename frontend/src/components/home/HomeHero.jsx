import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

const HomeHero = () => {
  return (
    <section className="relative bg-[var(--color-primary)] text-white overflow-hidden py-24 min-h-[600px] flex items-center">
      {/* Background Graphic/Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm font-semibold mb-4 border border-[var(--color-accent)]/30">
              India's Leading Oil Distributor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Premium Quality Edible Oils For <span className="text-[var(--color-accent)]">Homes, Retailers & Bulk Businesses</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Trusted wholesale and retail supplier of refined oil, mustard oil, sunflower oil, soybean oil, and bulk edible oil packaging across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-accent flex items-center justify-center text-lg py-3 px-8">
                Shop Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center backdrop-blur-sm">
                Bulk Inquiry
              </button>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 text-green-400 hover:text-green-300 font-medium py-3 px-4">
                <MessageCircle size={20} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            {/* Abstract visual representing premium oil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-primary-light)] rounded-full opacity-20 blur-3xl mix-blend-screen"></div>
            
            <div className="relative h-full w-full flex items-center justify-center">
              {/* Main floating card */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="glass-card p-6 w-72 bg-white/10 border-white/20 absolute z-20"
              >
                <div className="w-full h-48 bg-white/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-amber-600/40"></div>
                   <span className="text-white font-bold text-xl drop-shadow-md z-10">Premium Mustard Oil</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">15L Wholesale Tin</h3>
                <div className="flex justify-between items-center text-gray-200">
                  <span className="text-[var(--color-accent)] font-bold text-lg">Live Price</span>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">In Stock</span>
                </div>
              </motion.div>

              {/* Background floating card */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="glass-card p-4 w-56 bg-white/5 border-white/10 absolute -right-4 top-10 -z-10 blur-[1px]"
              >
                <div className="w-full h-32 bg-white/10 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-white/70 font-bold">Soybean Refined</span>
                </div>
                <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeHero;
