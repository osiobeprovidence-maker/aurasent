import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Product } from '../types';
import { products } from '../data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (product: Product) => void;
}

export default function SearchOverlay({ isOpen, onClose, onViewProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  const trends = ['Oud', 'Summer Florals', 'Bespoke Sets', 'Midnight Collection'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ivory flex flex-col"
        >
          <div className="h-20 border-b border-beige flex items-center px-10 justify-between">
            <div className="flex-1 flex items-center">
              <SearchIcon size={20} className="text-gold mr-4" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search the collection..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xl font-serif tracking-tight placeholder:text-charcoal/20"
              />
            </div>
            <button onClick={onClose} className="p-2 hover:text-gold transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-10 py-12">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left Side: Trends or Results */}
              <div>
                {query.trim() === '' ? (
                  <>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8">Trending Searches</h3>
                    <ul className="space-y-6">
                      {trends.map(trend => (
                        <li key={trend}>
                          <button 
                            onClick={() => setQuery(trend)}
                            className="text-2xl font-serif hover:text-gold transition-colors flex items-center gap-4 group"
                          >
                            {trend} <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8">Results ({results.length})</h3>
                    {results.length > 0 ? (
                      <ul className="space-y-8">
                        {results.map(product => (
                          <li 
                            key={product.id}
                            onClick={() => {
                              onViewProduct(product);
                              onClose();
                            }}
                            className="flex gap-6 cursor-pointer group"
                          >
                            <div className="w-20 aspect-[3/4] bg-beige overflow-hidden rounded-sm">
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold">{product.brand}</p>
                              <h4 className="font-serif text-lg group-hover:text-gold transition-colors">{product.name}</h4>
                              <p className="text-xs font-light text-charcoal/40">${product.price}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-charcoal/40 italic">No matches found for "{query}"</p>
                    )}
                  </>
                )}
              </div>

              {/* Right Side: Suggestions */}
              <div className="hidden md:block">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8">The Atelier Story</h3>
                <div className="aspect-square bg-beige relative overflow-hidden rounded-sm mb-6">
                   <img 
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2053&auto=format&fit=crop" 
                    alt="Atelier" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="absolute bottom-6 left-6 text-white">
                     <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Heritage</p>
                     <p className="font-serif text-xl italic">A Century of Scent</p>
                   </div>
                </div>
                <p className="text-xs font-light leading-relaxed text-charcoal/60">
                  Discover the secrets of our Paris workshop. Every bottle of AuraScent is hand-curated 
                  following traditions established in 1924.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
