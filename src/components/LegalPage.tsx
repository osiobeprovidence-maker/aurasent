import React from 'react';
import { motion } from 'motion/react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export default function LegalPage({ type }: LegalPageProps) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Transparency and protection of your personal scent profile.',
      sections: [
        {
          heading: 'Information We Collect',
          body: 'We collect information you provide directly to us when you create an account, make a purchase, or communicate with our concierge. This includes your name, email, shipping address, and fragrance preferences.'
        },
        {
          heading: 'How We Use Your Data',
          body: 'AuraScent uses your data to personalize your shopping experience, process transactions, and send you curated scent recommendations if you have opted into our newsletter.'
        },
        {
          heading: 'Data Security',
          body: 'We implement industry-standard encryption and security measures to protect your personal information from unauthorized access or disclosure.'
        }
      ]
    },
    terms: {
      title: 'Terms of Use',
      subtitle: 'Guidelines for engaging with the AuraScent digital atelier.',
      sections: [
        {
          heading: 'Acceptance of Terms',
          body: 'By accessing or using the AuraScent website, you agree to be bound by these Terms of Use and all applicable laws and regulations.'
        },
        {
          heading: 'Intellectual Property',
          body: 'All content, including fragrance descriptions, photography, and brand design, is the exclusive property of AuraScent Parfums and is protected by international copyright laws.'
        },
        {
          heading: 'Order Acceptance',
          body: 'AuraScent reserves the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase or inaccuracies in product information.'
        }
      ]
    }
  };

  const currentContent = content[type];

  return (
    <div className="pt-32 pb-24 bg-[#FDFCFB]">
      <div className="max-w-3xl mx-auto px-10">
        <header className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">Legal & Ethics</p>
          <h1 className="text-5xl font-serif tracking-tight mb-6">{currentContent.title}</h1>
          <p className="text-sm text-charcoal/40 uppercase tracking-widest font-medium italic">{currentContent.subtitle}</p>
        </header>

        <div className="space-y-16">
          {currentContent.sections.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-xl font-serif mb-6 border-b border-beige pb-4">{section.heading}</h2>
              <p className="text-sm text-charcoal/60 leading-relaxed font-light">
                {section.body}
              </p>
            </motion.section>
          ))}
        </div>

        <footer className="mt-24 pt-12 border-t border-beige text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/30">
            Last Updated: July 15, 2024
          </p>
        </footer>
      </div>
    </div>
  );
}
