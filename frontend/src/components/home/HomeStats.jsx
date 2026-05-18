import React from 'react';
import { Users, Truck, PackageCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { id: 1, label: 'Happy Customers', value: '5,000+', icon: Users },
  { id: 2, label: 'Active Dealers', value: '100+', icon: Award },
  { id: 3, label: 'Products', value: '50+', icon: PackageCheck },
  { id: 4, label: 'Fast Delivery', value: '24/7', icon: Truck },
];

const HomeStats = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 text-[var(--color-accent)]">
                  <Icon size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
