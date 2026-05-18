import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { id: 1, name: 'Rajesh Sharma', role: 'Wholesale Dealer, Delhi', text: 'Premium Oils has transformed my distribution business. Their mustard oil is highly requested by my retail clients, and the COD option makes bulk buying risk-free.' },
  { id: 2, name: 'Anita Desai', role: 'Restaurant Owner, Mumbai', text: 'We use their refined soybean oil for our commercial kitchen. The quality is consistent, delivery is always on time, and the 15L tins are perfectly packed.' },
  { id: 3, name: 'Vikram Singh', role: 'Supermarket Manager, Pune', text: 'Live pricing helps us buy at the right time. The customer support is excellent and they always ensure our stock never runs empty.' },
];

const HomeTestimonials = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMXY0MEgweiIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgweiIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIvPjwvc3ZnPg==')] opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Trusted by Businesses
          </h2>
          <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">See what our B2B partners and retail clients have to say about our products and service.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-card p-8 relative mt-8"
            >
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                <Quote size={20} fill="currentColor" />
              </div>
              
              <div className="flex text-yellow-400 mb-4 mt-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{testimonial.name}</h4>
                <p className="text-sm text-[var(--color-accent)] font-medium">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
