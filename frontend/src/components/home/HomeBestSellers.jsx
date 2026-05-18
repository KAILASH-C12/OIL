import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeBestSellers = () => {
  const [bestSellers, setBestSellers] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (data.success) {
            // Get up to 4 published products
            const published = data.data.filter(p => p.status === 'Published').slice(0, 4);
            setBestSellers(published);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Best Selling Products
            </h2>
            <p className="text-gray-600">Top choices for homes and commercial kitchens.</p>
          </div>
          <Link to="/products" className="hidden sm:flex text-[var(--color-accent)] font-semibold hover:text-[var(--color-accent-light)] transition-colors">
            View Full Catalog &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => {
            const firstVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
            const sizes = product.variants ? product.variants.map(v => v.size).join(', ') : '';
            const price = firstVariant ? `From ₹${firstVariant.price}` : 'Price TBA';
            const stock = firstVariant && firstVariant.stockQuantity > 0 ? 'In Stock' : 'Out of Stock';
            const imageUrl = product.image?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api/v1', '')}${product.image}` : (product.image || 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=400');

            return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-[var(--color-primary)]">
                  {stock}
                </div>
                <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                  <Heart size={16} />
                </button>
                <img 
                  src={imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay for quick action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Link to="/products" className="bg-white text-[var(--color-primary)] px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                      Quick View
                   </Link>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{sizes}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-extrabold text-[var(--color-primary)]">{price}</span>
                  <Link to="/products" className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center hover:bg-[var(--color-accent-light)] transition-colors shadow-md">
                    <ShoppingCart size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="btn-accent inline-block">
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBestSellers;
