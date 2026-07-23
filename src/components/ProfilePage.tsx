import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Package, Heart, Settings, LogOut, ChevronRight, MapPin, Store, Plus, Trash2, ShieldCheck, Mail, Bell } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Address, Product } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProfilePageProps {
  onLogout: () => void;
  userRole: string | null;
  onNavigate: (view: string) => void;
  wishlist: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (id: string) => void;
  userProfile: { name: string; email: string; image: string | null };
  onUpdateProfile: (updates: Partial<{ name: string; email: string; image: string | null }>) => void;
  addresses: Address[];
  onRemoveAddress: (id: string) => void;
}

type Section = 'orders' | 'favorites' | 'addresses' | 'preferences';

export default function ProfilePage({ 
  onLogout, 
  userRole, 
  onNavigate, 
  wishlist, 
  onAddToCart,
  onRemoveFromWishlist,
  userProfile,
  onUpdateProfile,
  addresses,
  onRemoveAddress
}: ProfilePageProps) {
  const [activeSection, setActiveSection] = useState<Section>('orders');
  const { user } = useAuth();
  const orders = (useQuery(api.orders.list) ?? []) as any[];
  const convexUser = useQuery(api.users.getByUid, user ? { firebaseUid: user.uid } : "skip");

  const userOrders = user ? orders.filter(o => o.customerEmail === user.email) : [];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const membershipLabel = convexUser?.role === 'owner' ? 'Super Admin' : 'Standard Member';

  const navItems = [
    { id: 'orders', icon: Package, label: 'Order History' },
    { id: 'favorites', icon: Heart, label: 'My Favorites' },
    ...(userRole === 'owner' ? [{ id: 'owner', icon: Store, label: 'Owner Dashboard', action: () => onNavigate('owner-dashboard') }] : []),
    { id: 'addresses', icon: MapPin, label: 'Address Book' },
    { id: 'preferences', icon: Settings, label: 'Preferences' },
    { id: 'logout', icon: LogOut, label: 'Sign Out', color: 'text-red-400', action: onLogout }
  ];

  return (
    <div className="pt-32 pb-24 px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="relative group">
              <div className="w-24 h-24 bg-beige rounded-full flex items-center justify-center text-charcoal/20 mb-6 border border-charcoal/5 overflow-hidden">
                {userProfile.image ? (
                  <img src={userProfile.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} strokeWidth={1} />
                )}
              </div>
              <label className="absolute bottom-6 right-0 p-2 bg-charcoal text-white rounded-full cursor-pointer hover:bg-gold transition-all shadow-lg">
                <Plus size={14} />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <h2 className="text-2xl font-serif mb-1">{userProfile.name}</h2>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
              {membershipLabel}
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={item.action || (() => setActiveSection(item.id as Section))}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all ${
                  activeSection === item.id ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/40 hover:text-charcoal'
                } ${item.color || ''}`}
              >
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest font-medium">
                  <item.icon size={16} strokeWidth={1.5} />
                  {item.label}
                </div>
                {activeSection === item.id && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {activeSection === 'orders' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-16"
            >
              <div className="flex justify-between items-end mb-8 border-b border-beige pb-6">
                <h3 className="text-3xl font-serif tracking-tight">Recent Orders</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40">Total {userOrders.length} Orders</p>
              </div>

              {userOrders.length > 0 ? (
                <div className="space-y-6">
                  {userOrders.map((order, idx) => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 group hover:shadow-xl transition-all border border-transparent hover:border-beige"
                    >
                      <div className="flex gap-6 items-center">
                        <div className="w-16 aspect-[3/4] bg-beige rounded-sm overflow-hidden border border-charcoal/5 flex items-center justify-center text-gold/20">
                           <Package size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">{order.id}</p>
                          <h4 className="font-serif text-xl">{order.items} item{order.items !== 1 ? 's' : ''}</h4>
                          <p className="text-xs text-charcoal/40">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-serif mb-1">${order.total}</p>
                        <span className="text-[9px] uppercase tracking-[0.2em] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold">
                          {order.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-beige">
                  <Package size={48} className="mx-auto text-gold/20 mb-6" strokeWidth={1} />
                  <p className="text-lg font-serif mb-2">No orders yet</p>
                  <p className="text-sm text-charcoal/40 mb-8">You haven't placed your first order.</p>
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="btn-primary"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </motion.section>
          )}

          {activeSection === 'favorites' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-16"
            >
              <div className="flex justify-between items-end mb-8 border-b border-beige pb-6">
                <h3 className="text-3xl font-serif tracking-tight">My Favorites</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40">{wishlist.length} Curations</p>
              </div>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {wishlist.map((product) => (
                    <motion.div 
                      key={product.id}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-beige transition-all group"
                    >
                      <div className="flex gap-6">
                        <div className="w-24 aspect-[3/4] bg-beige rounded-lg overflow-hidden shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="flex flex-col justify-between py-2">
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-1">{product.brand}</p>
                            <h4 className="font-serif text-lg leading-tight mb-2">{product.name}</h4>
                            <p className="text-sm font-serif text-charcoal/60">${product.price}</p>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <button 
                              onClick={() => onAddToCart(product)}
                              className="btn-primary py-2 px-4 text-[9px]"
                            >
                              Add to Curation
                            </button>
                            <button 
                              onClick={() => onRemoveFromWishlist(product.id)}
                              className="p-2 text-charcoal/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-beige">
                  <Heart size={48} className="mx-auto text-gold/20 mb-6" strokeWidth={1} />
                  <p className="text-lg font-serif mb-2">No favorites yet</p>
                  <p className="text-sm text-charcoal/40 mb-8">Save products you love here.</p>
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="btn-primary"
                  >
                    Browse Collection
                  </button>
                </div>
              )}
            </motion.section>
          )}

          {activeSection === 'addresses' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-16"
            >
              <div className="flex justify-between items-end mb-8 border-b border-beige pb-6">
                <h3 className="text-3xl font-serif tracking-tight">Address Book</h3>
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gold hover:text-charcoal transition-colors">
                  <Plus size={14} /> Add New Address
                </button>
              </div>

              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-white p-8 rounded-2xl border border-beige shadow-sm relative group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <MapPin size={20} className="text-gold" />
                          <h4 className="font-serif text-xl">{address.type}</h4>
                        </div>
                        {address.isDefault && (
                          <span className="text-[8px] uppercase tracking-[0.2em] bg-gold/10 text-gold px-2 py-1 rounded-full font-bold">Default</span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-charcoal/60 font-light leading-relaxed">
                        <p className="font-medium text-charcoal">{address.name}</p>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.postalCode}</p>
                        <p>{address.country}</p>
                      </div>
                      <div className="mt-8 pt-6 border-t border-beige flex gap-6">
                        <button className="text-[9px] uppercase tracking-[0.1em] font-bold text-charcoal/40 hover:text-gold transition-colors">Edit</button>
                        <button 
                          onClick={() => onRemoveAddress(address.id)}
                          className="text-[9px] uppercase tracking-[0.1em] font-bold text-charcoal/40 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-beige">
                  <MapPin size={48} className="mx-auto text-gold/20 mb-6" strokeWidth={1} />
                  <p className="text-lg font-serif mb-2">No saved addresses</p>
                  <p className="text-sm text-charcoal/40 mb-8">Add your first delivery address.</p>
                  <button className="btn-primary">
                    Add Address
                  </button>
                </div>
              )}
            </motion.section>
          )}

          {activeSection === 'preferences' && (
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-16"
            >
              <div className="mb-8 border-b border-beige pb-6">
                <h3 className="text-3xl font-serif tracking-tight">Preferences</h3>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6 flex items-center gap-2">
                        <Mail size={12} /> Communication
                      </h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Newsletter', desc: 'Curated scent stories and new arrivals' },
                          { label: 'Order Updates', desc: 'Notifications about your delivery status' },
                          { label: 'Early Access', desc: 'Be the first to know about private sales' }
                        ].map((pref, i) => (
                          <label key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-beige hover:border-gold/30 transition-all cursor-pointer group">
                            <div>
                              <p className="text-xs font-medium">{pref.label}</p>
                              <p className="text-[10px] text-charcoal/40">{pref.desc}</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold" />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6 flex items-center gap-2">
                        <Bell size={12} /> App Notifications
                      </h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Push Notifications', desc: 'Real-time alerts on your device' },
                          { label: 'Scent Reminders', desc: 'Daily ritual reminders' }
                        ].map((pref, i) => (
                          <label key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-beige hover:border-gold/30 transition-all cursor-pointer">
                            <div>
                              <p className="text-xs font-medium">{pref.label}</p>
                              <p className="text-[10px] text-charcoal/40">{pref.desc}</p>
                            </div>
                            <input type="checkbox" className="w-4 h-4 accent-gold" />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-beige">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck size={12} /> Privacy & Security
                  </h4>
                  <div className="bg-white p-8 rounded-2xl border border-beige">
                    <p className="text-xs text-charcoal/60 mb-8 leading-relaxed">
                      Your data is secured with industry-standard encryption. We never share your personal information with third parties.
                    </p>
                    <div className="flex gap-4">
                      <button className="btn-outline py-2 px-6 text-[9px]">Change Password</button>
                      <button className="btn-outline py-2 px-6 text-[9px] text-red-400 hover:text-red-500 border-red-100 hover:border-red-200">Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Privileges Banner */}
          {activeSection === 'orders' && (
            <section>
              <h3 className="text-3xl font-serif tracking-tight mb-8 border-b border-beige pb-6">Inner Circle Privileges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gold text-white p-10 rounded-[2.5rem] relative overflow-hidden group col-span-2 md:col-span-1">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                     <Settings size={80} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-4">Private Concierge</p>
                  <h4 className="text-2xl font-serif mb-4 leading-tight">24/7 Scent <br />Consultations</h4>
                  <p className="text-xs opacity-60 font-light leading-relaxed">
                    Direct access to our master perfumers for personalized advice and private commissions.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
