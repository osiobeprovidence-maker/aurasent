import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLink = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        <div>
          <h2 className="text-2xl font-serif tracking-[0.2em] uppercase mb-8">AuraScent</h2>
          <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
            Experience the art of luxury perfumery. Crafted with the finest ingredients 
            from around the world, AuraScent brings the spirit of Paris to your senses.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase mb-8 text-gold">Shop</h3>
          <ul className="space-y-4 text-sm font-light text-gray-400">
            <li><button onClick={(e) => handleLink(e, 'home')} className="hover:text-gold transition-colors text-left">The Atelier</button></li>
            <li><button onClick={(e) => handleLink(e, 'shop')} className="hover:text-gold transition-colors text-left">Women's Fragrance</button></li>
            <li><button onClick={(e) => handleLink(e, 'shop')} className="hover:text-gold transition-colors text-left">Men's Fragrance</button></li>
            <li><button onClick={(e) => handleLink(e, 'shop')} className="hover:text-gold transition-colors text-left">Unisex Collection</button></li>
            <li><button onClick={(e) => handleLink(e, 'shop')} className="hover:text-gold transition-colors text-left">Gift Sets</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase mb-8 text-gold">Client Service</h3>
          <ul className="space-y-4 text-sm font-light text-gray-400">
            <li><button onClick={(e) => handleLink(e, 'contact')} className="hover:text-gold transition-colors text-left">Contact Us</button></li>
            <li><button onClick={(e) => handleLink(e, 'faq')} className="hover:text-gold transition-colors text-left">Shipping & Returns</button></li>
            <li><button onClick={(e) => handleLink(e, 'faq')} className="hover:text-gold transition-colors text-left">FAQs</button></li>
            <li><button onClick={(e) => handleLink(e, 'home')} className="hover:text-gold transition-colors text-left">Store Locator</button></li>
            <li><button onClick={(e) => handleLink(e, 'home')} className="hover:text-gold transition-colors text-left">Fragrance Finder</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase mb-8 text-gold">Boutique</h3>
          <ul className="space-y-4 text-sm font-light text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0" />
              <span>30 Avenue Montaigne, <br />75008 Paris, France</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span>+33 (0)1 40 70 30 00</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <span>concierge@aurascent.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
          © {currentYear} AuraScent Parfums. All Rights Reserved.
        </p>
        <div className="flex gap-8 grayscale opacity-40">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
        </div>
        <div className="flex gap-6 text-[10px] tracking-[0.2em] uppercase text-gray-500">
          <button onClick={(e) => handleLink(e, 'privacy')} className="hover:text-gold">Privacy Policy</button>
          <button onClick={(e) => handleLink(e, 'terms')} className="hover:text-gold">Terms of Use</button>
        </div>
      </div>
    </footer>
  );
}
