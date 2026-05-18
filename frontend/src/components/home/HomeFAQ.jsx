import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { question: 'Do you support bulk wholesale orders?', answer: 'Yes! We specialize in bulk B2B orders for retailers, distributors, and commercial kitchens. You can order 15L tins or large barrels at wholesale prices.' },
  { question: 'Is Cash on Delivery (COD) available?', answer: 'Absolutely. We support COD for all verified orders to build trust and ensure you only pay when your stock arrives safely.' },
  { question: 'What packaging sizes do you offer?', answer: 'Our products are available in 500ml pouches, 1L bottles, 5L cans, 15L tins, and custom bulk containers for industrial use.' },
  { question: 'How long does delivery take?', answer: 'Delivery typically takes 2-4 business days depending on your zone in India. We have a fast logistics network for major distribution zones.' },
  { question: 'How can I become a verified distributor?', answer: 'You can submit an inquiry through our Contact page or WhatsApp us directly. Our team will verify your GST details and set up your wholesale account.' },
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">Everything you need to know about ordering bulk oil.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-[var(--color-accent)]" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 bg-gray-50 border-t border-gray-100 pt-4">
                  <p leading-relaxed>{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
