import { useState, useMemo, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Product, CartItem, Category, Address } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchOverlay from './components/SearchOverlay';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import CheckoutPage from './components/CheckoutPage';
import LoginPage from './components/LoginPage';
import OwnerDashboard from './components/OwnerDashboard';
import ContactPage from './components/ContactPage';
import LegalPage from './components/LegalPage';
import FAQPage from './components/FAQPage';
import Footer from './components/Footer';
import { Newsletter, Testimonials } from './components/Sections';
import PromoPopup from './components/PromoPopup';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, Users, Sparkles, Map, Sparkle } from 'lucide-react';
import { useConfig } from './context/ConfigContext';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { config } = useConfig();
  const { user, isOwner, logout } = useAuth();
  const products = (useQuery(api.products.list) ?? []) as Product[];
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    image: null as string | null
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        image: user.photoURL || null,
      });
    }
  }, [user]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const handleNavigate = (view: string) => {
    if (view.startsWith('category-')) {
      const cat = view.replace('category-', '') as Category;
      setCategoryFilter(cat);
      setCurrentView('shop');
    } else if (view === 'home') {
      setCurrentView('home');
      setCategoryFilter('All');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: Date.now().toString()
    };
    setAddresses(prev => [...prev, newAddress]);
  };

  const completeOrder = () => {
    alert(`Thank you for your curation. Your ${config.name} experience begins now.`);
    setCart([]);
    setCurrentView('home');
  };

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'owner' || isOwner) {
      setUserProfile(prev => ({
        ...prev,
        name: 'Riderezzy',
        email: 'riderezzy@gmail.com'
      }));
      setUserRole('owner');
    }
    if (user) {
      setUserProfile(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
        image: user.photoURL || prev.image
      }));
    }
    setCurrentView('profile');
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentView('home');
  };

  const filteredProducts = useMemo(() => {
    if (categoryFilter === 'All') return products;
    return products.filter(p => p.category === categoryFilter);
  }, [categoryFilter]);

  const bestSellers = useMemo(() => products.filter(p => p.isBestSeller), []);
  const newArrivals = useMemo(() => products.filter(p => p.isNew), []);

  return (
    <div className={`min-h-screen bg-ivory text-charcoal selection:bg-gold/20 selection:text-gold ${config.fontVibe === 'Serif' ? 'font-serif' : config.fontVibe === 'Mono' ? 'font-mono' : 'font-sans'}`}>
      <PromoPopup />
      <AnimatePresence mode="wait">
        {config.enableAnnouncement && currentView === 'home' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-charcoal text-white py-2 px-4 text-center relative z-[60]"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
              {config.announcementText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar 
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => handleNavigate(isAuthenticated ? 'profile' : 'login')}
        onNavigate={handleNavigate}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onViewProduct={viewDetails}
      />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onShopNow={() => handleNavigate('shop')} />
            
            {/* Featured Collection */}
            <section className="py-24 px-10 max-w-7xl mx-auto">
              <div className="mb-16">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-bold">The Classics</h3>
                <div className="flex justify-between items-end">
                  <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Essential Showcase</h2>
                  <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">12 Curations</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.slice(0, 3).map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onAddToWishlist={toggleWishlist}
                    onViewDetails={viewDetails}
                    isWishlisted={wishlist.some(w => w.id === product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Promotional Banner */}
            <section className="h-[70vh] relative overflow-hidden flex items-center px-10">
              <img 
                src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2070&auto=format&fit=crop" 
                alt="Promotion" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
              <div className="relative z-10 text-white max-w-xl">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-bold text-gold">Limitée</p>
                <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">Nocturnal <br /><span className="italic">Oud</span></h2>
                <button 
                  onClick={() => handleNavigate('category-Niche')}
                  className="btn-primary bg-white text-charcoal hover:bg-gold hover:text-white"
                >
                  Reserve Reserve
                </button>
              </div>
            </section>

            {/* Ticker from Design */}
            <div className="h-12 bg-beige border-t border-charcoal/5 flex items-center px-10 overflow-hidden">
              <div className="text-[9px] uppercase tracking-[0.4em] text-charcoal opacity-40 whitespace-nowrap animate-marquee">
                Complimentary Shipping on all orders over $150 • Bespoke Sample sets now available • Visit our Paris Atelier • New Spring Collection Arriving Soon •
              </div>
            </div>

            {/* Best Sellers */}
            <section className="py-24 px-10 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-16 border-b border-beige pb-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-bold">Highly Coveted</h3>
                  <h2 className="text-4xl font-serif tracking-tight">Best Sellers</h2>
                </div>
                <button 
                  onClick={() => handleNavigate('shop')}
                  className="text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-all border-b border-charcoal/20 pb-1"
                >
                  The Full Collection
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {bestSellers.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onAddToWishlist={toggleWishlist}
                    onViewDetails={viewDetails}
                    isWishlisted={wishlist.some(w => w.id === product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  {(config.stats || []).map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-center text-gold">
                        {stat.icon === 'Users' && <Users size={32} strokeWidth={1} />}
                        {stat.icon === 'Sparkles' && <Sparkles size={32} strokeWidth={1} />}
                        {stat.icon === 'Map' && <Map size={32} strokeWidth={1} />}
                      </div>
                      <h3 className="text-4xl font-serif tracking-tight">{stat.value}</h3>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Promotional Ad Section */}
            {(config.promotions || []).filter(p => p.isActive).map((promo) => (
              <section key={promo.id} className="py-24">
                <div className="max-w-7xl mx-auto px-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`relative aspect-[21/9] overflow-hidden group ${config.borderRadius === 'Deep' ? 'rounded-[3rem]' : config.borderRadius === 'Soft' ? 'rounded-3xl' : 'rounded-none'}`}
                  >
                    <img 
                      src={promo.image} 
                      alt={promo.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-12">
                      <div className="max-w-xl space-y-6">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">{promo.subtitle}</p>
                        <h2 className="text-4xl md:text-6xl text-white font-serif tracking-tight">{promo.title}</h2>
                        <button 
                          className="px-10 py-4 bg-white text-charcoal text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all"
                          style={{ borderRadius: config.borderRadius === 'Deep' ? '100px' : config.borderRadius === 'Soft' ? '1.5rem' : '0' }}
                        >
                          Explore Essence
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            ))}

            {/* New Arrivals Atmospheric Section */}
            <section className="py-24 relative overflow-hidden bg-ivory">
              {config.enablePromoBanner && (
                <div className="absolute top-0 left-0 w-full bg-gold/5 py-4 border-y border-gold/10 backdrop-blur-sm overflow-hidden z-10">
                  <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-12"
                  >
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Sparkle size={14} className="text-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">{config.promoBannerText}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
              
              <div className="max-w-7xl mx-auto px-10 pt-12">
                <div className="flex flex-col items-center mb-20 text-center space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold"
                  >
                    <Sparkle size={20} />
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-serif tracking-tight">The New Extract</h2>
                  <p className="text-xs text-charcoal/40 uppercase tracking-[0.3em] font-bold">Curated seasonal releases</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                  {newArrivals.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onAddToWishlist={toggleWishlist}
                      onViewDetails={viewDetails}
                      isWishlisted={wishlist.some(item => item.id === product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {config.enableTestimonials && <Testimonials />}
            {config.enableNewsletter && <Newsletter />}
          </motion.div>
        )}

        {currentView === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 px-6 max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif mb-4">
                {categoryFilter === 'All' ? 'The Collection' : `${categoryFilter} Collection`}
              </h1>
              <p className="text-gray-500 font-light max-w-2xl mx-auto">
                Explore our meticulously crafted fragrances, each telling a unique story of 
                emotion, memory, and sophistication.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
              <div className="flex items-center gap-6 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto">
                {['All', 'Men', 'Women', 'Unisex', 'Niche', 'Gift Sets'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat as any)}
                    className={`text-xs tracking-widest uppercase whitespace-nowrap pb-1 border-b-2 transition-all ${
                      categoryFilter === cat ? 'border-gold text-gold' : 'border-transparent text-gray-400 hover:text-charcoal'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">{filteredProducts.length} Results</span>
                <button className="flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 border border-beige hover:border-gold transition-colors">
                  <Filter size={14} /> Sort & Filter
                </button>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onAddToWishlist={toggleWishlist}
                    onViewDetails={viewDetails}
                    isWishlisted={wishlist.some(w => w.id === product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-gray-400 italic">No products found in this category.</p>
              </div>
            )}
          </motion.div>
        )}

        {currentView === 'product-details' && selectedProduct && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductDetails 
              product={selectedProduct}
              allProducts={products}
              onAddToCart={addToCart}
              onAddToWishlist={toggleWishlist}
              isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
              onBack={() => setCurrentView('shop')}
              onViewDetails={viewDetails}
              wishlist={wishlist}
            />
          </motion.div>
        )}

        {currentView === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfilePage 
              onLogout={handleLogout} 
              userRole={userRole}
              onNavigate={handleNavigate}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(w => w.id !== id))}
              userProfile={userProfile}
              onUpdateProfile={(updates) => setUserProfile(prev => ({ ...prev, ...updates }))}
              addresses={addresses}
              onRemoveAddress={(id) => setAddresses(prev => prev.filter(a => a.id !== id))}
            />
          </motion.div>
        )}

        {currentView === 'owner-dashboard' && (
          <motion.div
            key="owner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OwnerDashboard />
          </motion.div>
        )}

        {currentView === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AboutPage />
          </motion.div>
        )}

        {currentView === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckoutPage 
              cart={cart}
              onBack={() => setIsCartOpen(true)}
              onComplete={completeOrder}
              onSaveAddress={saveAddress}
            />
          </motion.div>
        )}

        {currentView === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ContactPage />
          </motion.div>
        )}

        {currentView === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FAQPage />
          </motion.div>
        )}

        {currentView === 'privacy' && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LegalPage type="privacy" />
          </motion.div>
        )}

        {currentView === 'terms' && (
          <motion.div
            key="terms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LegalPage type="terms" />
          </motion.div>
        )}

        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginPage onLogin={handleLogin} onCancel={() => handleNavigate('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={(id) => setWishlist(prev => prev.filter(w => w.id !== id))}
        onMoveToCart={moveToCartFromWishlist}
      />
    </div>
  );
}
