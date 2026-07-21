import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export function Newsletter() {
  const { config } = useConfig();
  
  const getRadius = (radius: string) => {
    if (radius === 'Deep') return 'rounded-[3rem]';
    if (radius === 'Soft') return 'rounded-2xl';
    return 'rounded-none';
  };

  return (
    <section className="py-24 bg-beige relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-charcoal rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-charcoal rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight text-charcoal">Join the Inner Circle</h2>
        <p className="text-charcoal/60 font-light mb-10 leading-relaxed max-w-lg mx-auto">
          Experience our new collection launches and receive expert fragrance 
          curations tailored just for you.
        </p>
        
        <div className={`max-w-md mx-auto bg-charcoal text-white p-10 shadow-2xl relative ${getRadius(config.borderRadius)}`}>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
            <Mail size={20} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-6 text-left">L'Atelier Newsletter</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-white/20 py-4 text-sm focus:outline-none focus:border-gold transition-all"
            />
            <button className="absolute right-0 bottom-4 text-[10px] uppercase tracking-[0.2em] text-gold hover:text-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
          By subscribing, you agree to our Privacy Policy.
        </p>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    {
      text: "AuraScent has completely redefined what I expect from a luxury fragrance. The depth and longevity of Midnight Obsidian is unlike anything else.",
      author: "Eleanor Vance",
      role: "Fragrance Connoisseur"
    },
    {
      text: "The presentation, the scent, the service—everything is impeccable. It feels more like a piece of art than just a perfume.",
      author: "Sebastian Thorne",
      role: "Creative Director"
    },
    {
      text: "Their discovery set is the perfect way to explore the collection. I've found three new signature scents I can't live without.",
      author: "Maya Lin",
      role: "Vogue Contributor"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">A Legacy of Scent</h2>
        <p className="text-gold tracking-[0.2em] uppercase text-xs">Echoes from our Circle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {reviews.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="text-center"
          >
            <div className="text-gold mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <span key={i} className="text-xl">★</span>)}
            </div>
            <p className="text-gray-600 font-light italic mb-8 leading-relaxed">
              "{item.text}"
            </p>
            <p className="font-serif text-lg text-charcoal">{item.author}</p>
            <p className="text-[10px] tracking-widest uppercase text-gray-400">{item.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
