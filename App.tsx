
import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, Category } from './types';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { ChatAssistant } from './components/ChatAssistant';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: Open cart on add
    // setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">LUXEMART<span className="text-indigo-600">.</span></h1>
              <div className="hidden md:flex gap-6">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-medium transition-colors ${activeCategory === cat ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative w-full hidden sm:block">
                <input 
                  type="text" 
                  placeholder="Search curated collection..." 
                  className="w-full bg-slate-100 border-none rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section */}
        <section className="mb-12 relative rounded-3xl overflow-hidden bg-slate-900 aspect-[21/9] flex items-center px-12">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80" 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10 max-w-lg">
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">Summer 2024</span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">Redefining the standard of living.</h2>
            <p className="text-slate-300 text-lg mb-8">Discover a carefully curated collection of minimalist essentials and high-tech novelties.</p>
            <Button size="lg" variant="secondary">Explore Now</Button>
          </div>
        </section>

        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Premium Catalog</h3>
            <p className="text-slate-500">Showing {filteredProducts.length} results</p>
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {setActiveCategory('All'); setSearchQuery('');}}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tighter">LUXEMART<span className="text-indigo-600">.</span></h4>
              <p className="text-slate-500 max-w-sm mb-6">Elevating everyday life through meticulously designed products and intelligent AI shopping assistance.</p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-100 transition-colors cursor-pointer"></div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Shop</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>All Products</li>
                <li>New Arrivals</li>
                <li>Limited Editions</li>
                <li>Sustainability</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Contact Us</li>
                <li>Shipping Policy</li>
                <li>Returns & Exchanges</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2024 LuxeMart AI. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <ChatAssistant />
    </div>
  );
};

export default App;
