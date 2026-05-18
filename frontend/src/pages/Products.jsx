import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [products, setLocalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    // Fetch real products
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (data.success) {
            // Only show published products
            setLocalProducts(data.data.filter(p => p.status === 'Published'));
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();

    // Setup Socket.io connection
    const socket = io(import.meta.env.VITE_API_URL.replace('/api/v1', ''));
    
    socket.on('priceUpdate', (data) => {
      console.log('Real-time price update received:', data);
      
      setLocalProducts(prevProducts => {
        return prevProducts.map(p => {
          if (p._id === data.productId) {
            const newVariants = p.variants.map(v => {
              if (v._id === data.variantId) {
                return { ...v, price: Number(data.newPrice) };
              }
              return v;
            });
            return { ...p, variants: newVariants };
          }
          return p;
        });
      });
    });

    return () => socket.disconnect();
  }, []);

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variantId }));
  };

  const handleAddToCart = (product) => {
    const selectedVariantId = selectedVariants[product._id] || product.variants[0]._id;
    const variant = product.variants.find(v => v._id === selectedVariantId);
    
    if (variant.stockStatus === 'Out of Stock') return;

    dispatch(addToCart({
      product: product._id,
      variantId: variant._id,
      name: product.name,
      size: variant.size,
      price: variant.price,
      image: product.image
    }));
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen py-12">
      <Helmet>
        <title>Wholesale Edible Oils | Premium Mustard & Refined Oils</title>
        <meta name="description" content="Browse our catalog of pure mustard oil, refined soybean oil, and sunflower oil. Live factory prices and COD available." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Our Products</h2>
          <p className="mt-4 text-gray-600">Premium quality oils for every need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => 
            p.name.toLowerCase().includes(searchQuery) || 
            (p.brand && p.brand.toLowerCase().includes(searchQuery))
          ).map((product) => {
            const currentVariantId = selectedVariants[product._id] || product.variants[0]._id;
            const currentVariant = product.variants.find(v => v._id === currentVariantId);

            return (
              <motion.div 
                key={product._id}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden flex flex-col"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={product.image?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api/v1', '')}${product.image}` : (product.image || 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=400')} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  {currentVariant && currentVariant.stockStatus === 'Out of Stock' && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</div>
                  )}
                  {currentVariant && currentVariant.stockStatus === 'Low Stock' && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">Low Stock</div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{product.description}</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
                    <select 
                      className="input-field"
                      value={currentVariantId}
                      onChange={(e) => handleVariantChange(product._id, e.target.value)}
                    >
                      {product.variants.map(v => (
                        <option key={v._id} value={v._id}>{v.size} - ₹{v.price}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">₹{currentVariant.price}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={currentVariant.stockStatus === 'Out of Stock'}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentVariant.stockStatus === 'Out of Stock' 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)]'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
