import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-10">
        <header className="max-w-2xl mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">Concierge Services</p>
          <h1 className="text-5xl font-serif tracking-tight mb-8">How may we assist your discovery?</h1>
          <p className="text-lg text-charcoal/60 font-light leading-relaxed">
            Our master curators are available to guide you through our collection or assist with private commissions and gift services.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Methods */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-6">Direct Channels</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white border border-beige rounded-full flex items-center justify-center text-gold shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mb-1">Inquiries</p>
                    <p className="text-sm font-medium">+33 (0)1 40 70 30 00</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white border border-beige rounded-full flex items-center justify-center text-gold shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mb-1">Email</p>
                    <p className="text-sm font-medium">concierge@aurascent.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-6">Global Headquarters</h3>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white border border-beige rounded-full flex items-center justify-center text-gold shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-relaxed">
                    30 Avenue Montaigne,<br />
                    75008 Paris,<br />
                    France
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-charcoal text-white rounded-[2.5rem] relative overflow-hidden">
              <Clock className="absolute -bottom-4 -right-4 opacity-5" size={120} />
              <h4 className="text-lg font-serif mb-4">Service Hours</h4>
              <ul className="space-y-3 text-xs text-gray-400 font-light">
                <li className="flex justify-between">
                  <span>Mon — Fri</span>
                  <span className="text-white">09:00 — 19:00 CET</span>
                </li>
                <li className="flex justify-between">
                  <span>Sat</span>
                  <span className="text-white">10:00 — 17:00 CET</span>
                </li>
                <li className="flex justify-between">
                  <span>Sun</span>
                  <span className="text-white italic">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-12 md:p-16 rounded-[3rem] border border-beige shadow-sm"
            >
              <h2 className="text-3xl font-serif mb-10">Send a Message</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-4">Full Name</label>
                  <input type="text" className="w-full bg-beige/30 border border-transparent focus:border-gold outline-none px-6 py-4 rounded-full text-sm transition-all" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-4">Email Address</label>
                  <input type="email" className="w-full bg-beige/30 border border-transparent focus:border-gold outline-none px-6 py-4 rounded-full text-sm transition-all" placeholder="Enter your email" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-4">Inquiry Type</label>
                  <select className="w-full bg-beige/30 border border-transparent focus:border-gold outline-none px-6 py-4 rounded-full text-sm transition-all appearance-none cursor-pointer">
                    <option>Product Information</option>
                    <option>Order Assistance</option>
                    <option>Private Commission</option>
                    <option>Wholesale Inquiries</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-4">Message</label>
                  <textarea rows={6} className="w-full bg-beige/30 border border-transparent focus:border-gold outline-none px-8 py-6 rounded-[2rem] text-sm transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button className="w-full bg-charcoal text-white py-6 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all flex items-center justify-center gap-4">
                    Send Inquiry <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
