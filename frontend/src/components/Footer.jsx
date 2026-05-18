import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-[var(--color-accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Premium <span className="text-[var(--color-accent)]">Oils</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              India's most trusted edible oil distribution platform. Supplying premium quality mustard, refined, and sunflower oils to retailers, hotels, and businesses nationwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors"><MessageCircle size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[var(--color-accent)] transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-[var(--color-accent)] transition-colors">All Products</Link></li>
              <li><Link to="/products" className="hover:text-[var(--color-accent)] transition-colors">Categories</Link></li>
              <li><Link to="/products" className="hover:text-[var(--color-accent)] transition-colors">Wholesale Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-accent)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Policies</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Refund Policy</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Shipping Information</Link></li>
              <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Distributor Terms</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[var(--color-accent)] flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Industrial Area, Phase 2, New Delhi, India 110020</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[var(--color-accent)] flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[var(--color-accent)] flex-shrink-0" />
                <span className="text-gray-400">sales@premiumoils.com</span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
               <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">GSTIN</p>
               <p className="text-sm font-mono text-white">07AABCT1234F1Z5</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 Premium Oils. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/800px-Rupay-Logo.png" alt="RuPay" className="h-6 opacity-50 grayscale hover:grayscale-0" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/UPI-Logo.png/1200px-UPI-Logo.png" alt="UPI" className="h-6 opacity-50 grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
