import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, CreditCard, CheckCircle, Truck } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Browse Products', icon: Search, desc: 'Explore our catalog' },
  { id: 2, title: 'Add To Cart', icon: ShoppingCart, desc: 'Select variants & qty' },
  { id: 3, title: 'Place COD Order', icon: CreditCard, desc: 'Secure checkout' },
  { id: 4, title: 'Order Approval', icon: CheckCircle, desc: 'Verified by admin' },
  { id: 5, title: 'Fast Delivery', icon: Truck, desc: 'Dispatched & delivered' },
];

const HomeProcess = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Simple Ordering Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From browsing to delivery, our streamlined B2B/B2C process ensures you get your supply without any hassle.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-[var(--color-accent)] flex items-center justify-center text-[var(--color-primary)] mb-6 relative group">
                    <Icon size={32} className="group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold border-2 border-white">
                      {step.id}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;
