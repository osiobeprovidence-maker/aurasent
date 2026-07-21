import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const { config } = useConfig();
  
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={config.heroImage}
          alt={config.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-500" 
          style={{ opacity: config.heroOverlay / 100 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-10 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] tracking-[0.4em] uppercase mb-6 text-gold font-bold"
          >
            {config.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] text-white"
          >
            {config.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg font-light mb-10 text-white/70 leading-relaxed max-w-lg"
          >
            {config.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onShopNow}
              className="btn-primary bg-white text-charcoal hover:bg-gold hover:text-white"
              style={{ borderRadius: config.borderRadius === 'Deep' ? '100px' : config.borderRadius === 'Soft' ? '2rem' : '0' }}
            >
              The Curation
            </button>
            <button
              className="btn-outline border-white/20 text-white hover:border-white"
              style={{ borderRadius: config.borderRadius === 'Deep' ? '100px' : config.borderRadius === 'Soft' ? '2rem' : '0' }}
            >
              Bespoke Samples
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/60 to-transparent" />
        <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
