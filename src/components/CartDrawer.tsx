import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ivory z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-beige flex items-center justify-between">
              <h2 className="text-xl font-serif tracking-widest uppercase">Shopping Bag ({items.length})</h2>
              <button onClick={onClose} className="p-2 hover:text-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full border border-beige flex items-center justify-center">
                    <ShoppingBag size={32} className="text-beige" />
                  </div>
                  <div>
                    <p className="text-charcoal font-serif text-xl mb-2">Empty Bag</p>
                    <p className="text-charcoal/40 text-xs tracking-widest uppercase mb-8">Begin your curation</p>
                    <button 
                      onClick={onClose}
                      className="btn-outline"
                    >
                      Collections
                    </button>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-6 border-b border-beige last:border-0">
                    <div className="w-24 aspect-[3/4] bg-white border border-beige p-1 rounded-sm shrink-0">
                      <div className="w-full h-full bg-beige overflow-hidden">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-bold mb-1">{item.brand}</p>
                        <h3 className="font-serif text-lg truncate mb-1">{item.name}</h3>
                        <p className="text-sm font-light tracking-widest text-charcoal/60">${item.price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-beige rounded-full px-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 px-2 hover:text-gold transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 px-2 hover:text-gold transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-beige hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-beige bg-white/50 backdrop-blur-md space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold">Subtotal</span>
                  <span className="font-serif text-2xl">${total.toFixed(2)}</span>
                </div>
                <div className="bg-charcoal text-white p-6 rounded-2xl">
                  <p className="text-[10px] uppercase tracking-[0.1em] opacity-60 mb-2">Shipping</p>
                  <p className="text-xs leading-relaxed opacity-80">Complimentary on orders above $150. Delivery within 3-5 business days.</p>
                </div>
                <button 
                  onClick={onCheckout}
                  className="btn-primary w-full shadow-xl"
                >
                  Finalize Curation
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
