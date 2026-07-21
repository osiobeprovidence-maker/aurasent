import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Mail } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function PromoPopup() {
  const { config } = useConfig();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (config.enablePopup) {
      const timer = setTimeout(() => {
        const hasSeenPopup = localStorage.getItem('has_seen_popup');
        if (!hasSeenPopup) {
          setIsOpen(true);
        }
      }, 3000); // 3 second delay for better UX
      return () => clearTimeout(timer);
    }
  }, [config.enablePopup]);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('has_seen_popup', 'true');
  };

  const getRadius = (radius: string) => {
    if (radius === 'Deep') return 'rounded-[3rem]';
    if (radius === 'Soft') return 'rounded-2xl';
    return 'rounded-none';
  };

  if (!config.enablePopup) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-4xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row ${getRadius(config.borderRadius)}`}
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-charcoal transition-all"
            >
              <X size={18} />
            </button>

            {/* Visual Side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={config.popupImage} 
                alt="Promo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent flex items-end p-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/60 uppercase tracking-[0.4em] font-bold">Limited Heritage</p>
                  <p className="text-xl text-white font-serif italic">Curated Excellence</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl font-serif tracking-tight text-charcoal">
                  {config.popupTitle}
                </h3>
                <p className="text-sm text-charcoal/60 font-light leading-relaxed">
                  {config.popupSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex border-b border-charcoal/10 pb-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-transparent text-xs outline-none font-light"
                  />
                  <ArrowRight size={18} className="text-gold" />
                </div>
                <button 
                  onClick={closePopup}
                  className="w-full py-5 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all"
                  style={{ borderRadius: config.borderRadius === 'Deep' ? '100px' : config.borderRadius === 'Soft' ? '1rem' : '0' }}
                >
                  Join the Circle
                </button>
              </div>

              <button 
                onClick={closePopup}
                className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold hover:text-charcoal transition-colors self-center"
              >
                No, I prefer standard curations
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
