import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="h-[80vh] relative overflow-hidden flex items-center px-10">
        <img 
          src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=1974&auto=format&fit=crop" 
          alt="Atelier Background" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative z-10 max-w-3xl text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.4em] uppercase font-bold text-gold mb-6"
          >
            Since 1924
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
          >
            A Century of <br /><span className="italic">Pure Sillage</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl font-light opacity-80 leading-relaxed max-w-xl"
          >
            Founded in the heart of Paris, AuraScent has remained a family-owned atelier 
            dedicated to the preservation of traditional French perfumery.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] bg-beige overflow-hidden rounded-sm shadow-2xl">
             <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop" 
              alt="Ingredients" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
             />
             <div className="absolute top-10 -right-10 w-40 h-40 border border-gold opacity-20" />
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8">Our Philosophy</h3>
            <h2 className="text-5xl font-serif mb-10 tracking-tight leading-tight">Authenticity in every molecule.</h2>
            <div className="space-y-8 text-charcoal/70 font-light leading-relaxed">
              <p>
                We believe that a fragrance is more than just a scent—it is an invisible garment, 
                a memory captured in a bottle, and a statement of one's inner aura.
              </p>
              <p>
                Our master perfumers travel the world to source the rarest raw materials. From the 
                jasmine fields of Grasse to the sandalwood forests of Mysore, we only accept 
                the absolute pinnacle of quality.
              </p>
              <p className="italic font-serif text-2xl text-charcoal pt-4 border-t border-beige">
                "We don't just blend oils; we weave emotions."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Atelier */}
      <section className="bg-charcoal text-white py-32 px-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-8 font-bold text-gold">The Atelier</p>
          <h2 className="text-5xl md:text-7xl font-serif mb-20 italic">30 Avenue Montaigne</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <h4 className="text-lg font-serif mb-4 text-gold">The Laboratory</h4>
              <p className="text-xs opacity-60 font-light leading-relaxed">
                Where over 2,000 individual essences are meticulously organized, waiting to be 
                transformed into the next masterpiece.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-serif mb-4 text-gold">The Curing Room</h4>
              <p className="text-xs opacity-60 font-light leading-relaxed">
                Our fragrances are aged for a minimum of six months, allowing the notes to marry 
                and develop the characteristic AuraScent longevity.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-serif mb-4 text-gold">The Private Suite</h4>
              <p className="text-xs opacity-60 font-light leading-relaxed">
                A dedicated space for bespoke commissions, where clients can collaborate directly 
                with our chief nose to create a truly unique scent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-32 px-10 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-8">Conscious Luxury</h3>
          <h2 className="text-5xl font-serif mb-10 tracking-tight">Preserving the planet's flora.</h2>
          <p className="text-charcoal/60 font-light leading-relaxed mb-12">
            Luxury should not come at the cost of our environment. We are committed to 
            reforestation projects and sustainable farming practices for all our 
            botanical ingredients. Our glass bottles are designed to be kept forever 
            and refilled at any of our global boutiques.
          </p>
          <div className="flex justify-center gap-12">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold">Refillable Design</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold">Vegan Formulations</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold">Plastic Free Shipping</div>
          </div>
        </div>
      </section>
    </div>
  );
}
