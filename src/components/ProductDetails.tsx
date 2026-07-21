import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, Star, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';
import ProductCard from './ProductCard';

interface ProductDetailsProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onBack: () => void;
  onViewDetails: (product: Product) => void;
  wishlist: Product[];
}

export default function ProductDetails({ 
  product, 
  allProducts, 
  onAddToCart, 
  onAddToWishlist, 
  isWishlisted, 
  onBack, 
  onViewDetails,
  wishlist
}: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm tracking-widest uppercase mb-12 hover:text-gold transition-colors"
      >
        <ChevronLeft size={16} /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <motion.div 
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] bg-beige rounded-sm overflow-hidden"
          >
            <img 
              src={product.images[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${idx}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="border-b border-beige pb-10 mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold mb-4">{product.brand}</p>
            <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-8 mb-8">
              <span className="text-3xl font-light tracking-tighter">${product.price}</span>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-beige'} 
                    />
                  ))}
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-charcoal/40">{product.reviews.length} Avis</span>
              </div>
            </div>
            <p className="text-charcoal/70 leading-relaxed font-light mb-10 text-lg">
              {product.description}
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => onAddToCart(product)}
                className="btn-primary flex-1 flex items-center justify-center gap-3"
              >
                Add to Curation
              </button>
              <button
                onClick={() => onAddToWishlist(product)}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                  isWishlisted ? 'border-gold bg-gold text-white shadow-lg' : 'border-beige hover:border-gold hover:text-gold'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Olfactory Pyramid */}
          <div className="mb-12">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8">The Olfactory Pyramid</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-tighter">Top Notes</span>
                  <span className="text-[9px] tracking-widest text-charcoal/40 uppercase">Ethereal</span>
                </div>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed border-l-2 border-beige pl-4">
                  {product.notes.top.join(', ')}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-tighter">Heart Notes</span>
                  <span className="text-[9px] tracking-widest text-charcoal/40 uppercase">Rich</span>
                </div>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed border-l-2 border-beige pl-4">
                  {product.notes.middle.join(', ')}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold uppercase tracking-tighter">Base Notes</span>
                  <span className="text-[9px] tracking-widest text-charcoal/40 uppercase">Sillage</span>
                </div>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed border-l-2 border-beige pl-4">
                  {product.notes.base.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info Tabs */}
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer py-4 border-b border-beige list-none">
                <span className="text-sm tracking-widest uppercase">Ingredients</span>
                <ChevronRight size={16} className="group-open:rotate-90 transition-transform" />
              </summary>
              <p className="py-4 text-sm text-gray-500 font-light leading-relaxed">
                {product.ingredients.join(', ')}
              </p>
            </details>
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer py-4 border-b border-beige list-none">
                <span className="text-sm tracking-widest uppercase">Sustainability</span>
                <ChevronRight size={16} className="group-open:rotate-90 transition-transform" />
              </summary>
              <div className="py-4 text-sm text-gray-500 font-light flex items-center gap-3">
                <Info size={16} />
                Our bottles are 100% recyclable and our fragrances are vegan and cruelty-free.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-24">
        <h2 className="text-3xl font-serif mb-12 text-center underline underline-offset-8 decoration-gold/30">Client Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.reviews.map(review => (
              <div key={review.id} className="bg-white p-8 border border-beige">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-serif text-lg">{review.user}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? 'text-gold fill-gold' : 'text-gray-200'} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 font-light italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 font-light italic">No reviews yet for this fragrance.</p>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <h2 className="text-3xl font-serif mb-12 text-center">Complementary Fragrances</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {relatedProducts.map(rp => (
              <ProductCard 
                key={rp.id}
                product={rp}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onViewDetails={onViewDetails}
                isWishlisted={wishlist.some(w => w.id === rp.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
