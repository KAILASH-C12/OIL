import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const HomeDeliveryAreas = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl relative h-96 bg-gray-200"
          >
            {/* Using a placeholder gradient/graphic for the map */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center">
               <div className="text-center">
                  <MapPin size={64} className="text-[var(--color-primary)] mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-bold text-gray-400">Interactive Delivery Map</p>
               </div>
            </div>
            
            {/* Map points overlay */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[var(--color-accent)] rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[var(--color-primary)] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[var(--color-accent)] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Serving Retailers & Businesses Across India
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our robust logistics network ensures that whether you are a small retailer in a tier-3 city or a massive warehouse in a metro, your stock reaches you safely and on time.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Primary Zones</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✔ Maharashtra</li>
                  <li>✔ Gujarat</li>
                  <li>✔ Delhi NCR</li>
                  <li>✔ Karnataka</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Expanding Into</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✔ Madhya Pradesh</li>
                  <li>✔ Rajasthan</li>
                  <li>✔ Uttar Pradesh</li>
                  <li>✔ Tamil Nadu</li>
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HomeDeliveryAreas;
