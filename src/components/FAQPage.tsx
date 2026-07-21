import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping within the EU takes 3-5 business days. International shipping takes 7-14 business days depending on your location."
        },
        {
          q: "Can I track my order?",
          a: "Yes, once your order has been dispatched, you will receive a tracking link via email to follow your curated scent's journey."
        }
      ]
    },
    {
      category: 'Fragrance Care',
      questions: [
        {
          q: "How should I store my perfumes?",
          a: "To preserve the integrity of the ingredients, store your fragrances in a cool, dry place away from direct sunlight and extreme temperature fluctuations."
        },
        {
          q: "What is the shelf life of an AuraScent fragrance?",
          a: "When stored correctly, our fragrances maintain their full olfactive profile for 24-36 months after opening."
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#FDFCFB]">
      <div className="max-w-4xl mx-auto px-10">
        <header className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">Support & Guidance</p>
          <h1 className="text-5xl font-serif tracking-tight mb-8">Frequently Asked Questions</h1>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={18} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full pl-16 pr-8 py-5 bg-white border border-beige rounded-full text-sm focus:border-gold outline-none shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="space-y-16">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-8 ml-6">{group.category}</h3>
              <div className="space-y-4">
                {group.questions.map((faq, idx) => {
                  const globalIdx = groupIdx * 10 + idx;
                  const isOpen = openIndex === globalIdx;
                  
                  return (
                    <div 
                      key={idx}
                      className="bg-white border border-beige rounded-[2rem] overflow-hidden transition-all hover:border-gold/30"
                    >
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                      >
                        <span className="font-serif text-lg">{faq.q}</span>
                        {isOpen ? <Minus size={18} className="text-gold" /> : <Plus size={18} className="text-gold" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 pb-8"
                          >
                            <p className="text-sm text-charcoal/60 leading-relaxed font-light">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-charcoal text-white rounded-[3rem] text-center">
          <h3 className="text-2xl font-serif mb-4">Still seeking guidance?</h3>
          <p className="text-sm text-gray-400 font-light mb-8">Our concierge team is available for personalized consultations.</p>
          <button className="btn-outline border-white/20 text-white hover:bg-white hover:text-charcoal py-4 px-10">
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  );
}
