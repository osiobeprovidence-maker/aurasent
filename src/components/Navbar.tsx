import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConfig } from '../context/ConfigContext';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onNavigate: (view: string) => void;
}

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenSearch, 
  onOpenProfile,
  onNavigate 
}: NavbarProps) {
  const { config } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Men', view: 'category-Men' },
    { name: 'Women', view: 'category-Women' },
    { name: 'Unisex', view: 'category-Unisex' },
    { name: 'Niche', view: 'category-Niche' },
    { name: 'Atelier', view: 'about' },
  ];

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-ivory/95 backdrop-blur-md border-b border-beige py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
        <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-medium">
          {navLinks.slice(0, 3).map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.view)}
              className="hover:text-gold transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="text-2xl font-serif tracking-[0.4em] uppercase text-charcoal"
        >
          {config.name}
        </button>

        <div className="flex items-center space-x-8">
          <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-medium">
            {navLinks.slice(3).map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.view)}
                className="hover:text-gold transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-5">
            <button 
              onClick={onOpenSearch}
              className="p-1 hover:text-gold transition-colors opacity-70 hover:opacity-100"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onOpenProfile}
              className="p-1 hover:text-gold transition-colors opacity-70 hover:opacity-100 hidden sm:block"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onOpenWishlist}
              className="p-1 hover:text-gold transition-colors opacity-70 hover:opacity-100 relative"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={onOpenCart}
              className="p-1 hover:text-gold transition-colors opacity-70 hover:opacity-100 relative"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-charcoal text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-ivory border-t border-beige shadow-xl py-8 px-6 space-y-6 flex flex-col items-center"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className="text-lg tracking-widest uppercase hover:text-gold transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenProfile();
                setIsMobileMenuOpen(false);
              }}
              className="text-lg tracking-widest uppercase hover:text-gold transition-colors"
            >
              Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
