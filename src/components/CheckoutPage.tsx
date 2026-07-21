import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, Address } from '../types';
import { ArrowLeft, Lock, CreditCard, Truck, MapPin } from 'lucide-react';

interface CheckoutPageProps {
  cart: (Product & { quantity: number })[];
  onBack: () => void;
  onComplete: () => void;
  onSaveAddress: (address: Omit<Address, 'id'>) => void;
}

export default function CheckoutPage({ cart, onBack, onComplete, onSaveAddress }: CheckoutPageProps) {
  const [saveThisAddress, setSaveThisAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleFinalize = () => {
    if (saveThisAddress && addressData.name && addressData.street) {
      onSaveAddress({
        ...addressData,
        type: 'Home',
        isDefault: false
      });
    }
    onComplete();
  };

  return (
    <div className="pt-32 pb-24 px-10 max-w-7xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 hover:text-gold transition-colors mb-12"
      >
        <ArrowLeft size={14} /> Back to Curation
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: Forms */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold">1</span>
              <h2 className="text-2xl font-serif">Delivery Address</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Full Recipient Name" 
                className="checkout-input col-span-2" 
                value={addressData.name}
                onChange={(e) => setAddressData(prev => ({ ...prev, name: e.target.value }))}
              />
              <input 
                type="text" 
                placeholder="Street Address" 
                className="checkout-input col-span-2" 
                value={addressData.street}
                onChange={(e) => setAddressData(prev => ({ ...prev, street: e.target.value }))}
              />
              <input 
                type="text" 
                placeholder="City" 
                className="checkout-input" 
                value={addressData.city}
                onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
              />
              <input 
                type="text" 
                placeholder="Postal Code" 
                className="checkout-input" 
                value={addressData.postalCode}
                onChange={(e) => setAddressData(prev => ({ ...prev, postalCode: e.target.value }))}
              />
            </div>
            
            <label className="flex items-center gap-3 pt-6 cursor-pointer group">
              <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                saveThisAddress ? 'bg-gold border-gold' : 'border-beige group-hover:border-gold/50'
              }`}>
                {saveThisAddress && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={saveThisAddress}
                onChange={(e) => setSaveThisAddress(e.target.checked)}
              />
              <span className="text-[10px] uppercase tracking-widest text-charcoal/60">Save to address book for future curations</span>
            </label>
          </section>

          <button 
            onClick={handleFinalize}
            className="w-full bg-charcoal text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold transition-all flex items-center justify-center gap-3"
          >
            <Lock size={14} /> Continue to Secure Payment — ${total.toFixed(2)}
          </button>
          
          <p className="text-[9px] text-center text-charcoal/40 uppercase tracking-widest mt-4">
            Secured by Paystack & Stripe
          </p>
        </div>

        {/* Right Side: Summary */}
        <div className="bg-ivory border border-beige p-10 rounded-[2.5rem] h-fit sticky top-32">
          <h3 className="text-xl font-serif mb-8 border-b border-beige pb-6">Your Selection</h3>
          <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="w-16 aspect-[3/4] bg-beige rounded-sm overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-1">{item.brand}</p>
                  <h4 className="font-serif text-sm mb-1">{item.name}</h4>
                  <p className="text-[10px] text-charcoal/40">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-serif">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-beige pt-8">
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/40">Subtotal</span>
              <span className="font-serif">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/40">Insured Shipping</span>
              <span className="font-serif">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/40">Estimated Tax</span>
              <span className="font-serif">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-serif pt-4 border-t border-beige">
              <span>Total</span>
              <span className="text-gold">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-white">
            <Truck size={18} className="text-gold" />
            <p className="text-[10px] leading-relaxed opacity-60">
              Orders placed before 2 PM CET will be dispatched same day via our White Glove express service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
