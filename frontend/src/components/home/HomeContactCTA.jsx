import React from 'react';
import { MessageCircle, PhoneCall, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeContactCTA = () => {
  return (
    <section id="contact" className="py-24 relative bg-[var(--color-primary)] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Need Bulk Oil Supply?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact our dedicated wholesale team today. We provide customized quotes, dedicated support, and unmatched factory prices.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              <MessageCircle size={24} />
              <span>Chat on WhatsApp</span>
            </a>
            
            <a href="tel:+919876543210" className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-[var(--color-primary)] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              <PhoneCall size={24} />
              <span>Call Us Now</span>
            </a>
          </div>

          <div className="mt-12 text-gray-400 flex items-center justify-center space-x-2">
             <Mail size={16} />
             <span>sales@premiumoils.com</span>
             <span className="mx-2">|</span>
             <span>Available 24/7 for support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeContactCTA;
