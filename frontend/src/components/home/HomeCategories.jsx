import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'mustard', name: 'Mustard Oil', color: 'from-amber-400 to-amber-600' },
  { id: 'refined', name: 'Refined Oil', color: 'from-yellow-200 to-yellow-400' },
  { id: 'sunflower', name: 'Sunflower Oil', color: 'from-yellow-400 to-orange-400' },
  { id: 'soybean', name: 'Soybean Oil', color: 'from-orange-200 to-amber-500' },
  { id: 'groundnut', name: 'Groundnut Oil', color: 'from-amber-600 to-orange-700' },
  { id: 'palm', name: 'Palm Oil', color: 'from-orange-500 to-red-500' },
];

const HomeCategories = () => {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Featured Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our wide range of premium quality edible oils tailored for every culinary need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to="/products" className="group block h-full">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center h-full text-center group-hover:-translate-y-2">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${cat.color} mb-4 flex items-center justify-center shadow-inner opacity-80 group-hover:opacity-100 transition-opacity`}>
                    {/* Placeholder for actual oil drop/bottle icon */}
                    <span className="text-white font-bold text-2xl drop-shadow-md">
                      {cat.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center text-[var(--color-accent)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    Explore <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
