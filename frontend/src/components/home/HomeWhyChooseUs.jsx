import React from 'react';
import { ShieldCheck, TrendingDown, Clock, ThumbsUp, Package, BadgePercent, Shield, Anchor } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  { id: 1, title: 'Premium Quality Oils', desc: '100% pure and unadulterated edible oils tested in certified labs.', icon: ShieldCheck },
  { id: 2, title: 'Bulk Supply Available', desc: 'We cater to large-scale requirements for factories and restaurants.', icon: Package },
  { id: 3, title: 'Competitive Pricing', desc: 'Direct from factory pricing ensuring the best margins for dealers.', icon: TrendingDown },
  { id: 4, title: 'Fast Distribution', desc: 'Optimized logistics network for timely deliveries across India.', icon: Clock },
  { id: 5, title: 'Trusted by Retailers', desc: 'Over 5,000+ retail partners trust our brand for daily supply.', icon: ThumbsUp },
  { id: 6, title: 'COD Available', desc: 'Cash on Delivery options for verified wholesale partners.', icon: BadgePercent },
];

const HomeWhyChooseUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why Choose Premium Oils?
          </h2>
          <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-[var(--color-primary)] group transition-colors duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChooseUs;
