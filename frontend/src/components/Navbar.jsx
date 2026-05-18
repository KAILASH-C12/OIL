import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Handle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40); // Banner height is roughly 40px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link to="/" className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition-colors">Home</Link>
      <Link to="/products" className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition-colors">Products</Link>
      <a href="/#about" className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition-colors">About</a>
      <a href="/#contact" className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition-colors">Contact</a>
    </>
  );

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-md' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-[var(--color-primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Premium <span className="text-[var(--color-accent)]">Oils</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:flex items-center">
              {showSearch && (
                <form onSubmit={handleSearchSubmit} className="absolute right-8 mr-2 z-50">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-primary)] shadow-sm bg-white"
                  />
                </form>
              )}
              <button onClick={() => setShowSearch(!showSearch)} className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                <Search size={22} />
              </button>
            </div>
            
            <Link to="/profile" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors hidden sm:block">
              <User size={22} />
            </Link>

            <Link to="/cart" className="text-gray-600 hover:text-[var(--color-primary)] relative transition-colors">
              <ShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <Link to="/admin/login" className="hidden lg:block text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider ml-4">
              Admin Login
            </Link>

            <div className="md:hidden flex items-center ml-4">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-md">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-md">Products</Link>
            <a href="/#about" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-md">About</a>
            <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-md">Contact</a>
            <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-[var(--color-primary)] hover:bg-gray-50 rounded-md">My Account / Login</Link>
            <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm font-medium text-gray-400 hover:bg-gray-50 rounded-md">Admin Area</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
