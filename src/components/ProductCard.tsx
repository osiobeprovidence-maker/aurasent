import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { useConfig } from '../context/ConfigContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
  key?: string | number;
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist, onViewDetails, isWishlisted }: ProductCardProps) {
  const { config } = useConfig();

  const getRadius = (radius: string) => {
    if (radius === 'Deep') return 'rounded-[2rem]';
    if (radius === 'Soft') return 'rounded-xl';
    return 'rounded-none';
  };

  const getShadow = (shadow: string) => {
    if (shadow === 'Elevated') return 'shadow-2xl';
    if (shadow === 'Subtle') return 'shadow-md';
    return 'shadow-none';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className={`relative aspect-[3/4] overflow-hidden bg-beige mb-5 transition-all duration-500 ${getRadius(config.borderRadius)} ${getShadow(config.shadowStyle)} group-hover:shadow-2xl`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-charcoal text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 shadow-sm">
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-charcoal text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 shadow-sm">
              Culte
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-ivory/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <button 
            onClick={() => onAddToWishlist(product)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isWishlisted ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => onViewDetails(product)}
            className="w-10 h-10 bg-white text-charcoal rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300"
          >
            <Eye size={16} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 bg-white text-charcoal rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold mb-2">{product.brand}</p>
        <h3 
          onClick={() => onViewDetails(product)}
          className="text-lg font-serif mb-1 cursor-pointer hover:text-gold transition-colors tracking-tight"
        >
          {product.name}
        </h3>
        <p className="text-sm font-light tracking-widest text-charcoal/60">${product.price}</p>
      </div>
    </motion.div>
  );
}
