import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, UtensilsCrossed, Hotel, ArrowRight } from 'lucide-react';

const HomeWholesale = () => {
  return (
    <section id="wholesale" className="py-24 bg-[var(--color-primary)] relative overflow-hidden text-white">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
         <div className="w-[800px] h-[800px] bg-white rounded-full absolute -top-[400px] -right-[400px] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-sm mb-2 block">Partner With Us</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Become a <span className="text-[var(--color-accent)]">Distributor</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We supply premium edible oils to retailers, restaurants, dealers, supermarkets, and hotels at unmatched wholesale prices. Enjoy dedicated support, recurring supply, and faster delivery.
            </p>

            <ul className="space-y-4 mb-10">
              {['Bulk Pricing Discounts', 'Dedicated Account Manager', 'Priority Logistics & Fast Delivery', 'Flexible COD & Credit Options'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-200">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="btn-accent flex items-center justify-center text-lg py-4 px-8 w-full sm:w-auto">
              Request Wholesale Pricing <ArrowRight className="ml-2" size={20} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Store, title: 'Retailers' },
              { icon: UtensilsCrossed, title: 'Restaurants' },
              { icon: Building2, title: 'Supermarkets' },
              { icon: Hotel, title: 'Hotels & Caterers' }
            ].map((box, i) => {
              const Icon = box.icon;
              return (
                <div key={i} className="glass-card bg-white/10 border-white/20 p-8 flex flex-col items-center justify-center text-center aspect-square rounded-2xl hover:bg-white/20 transition-all duration-300">
                  <Icon size={48} className="text-[var(--color-accent)] mb-4" />
                  <h4 className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{box.title}</h4>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeWholesale;
