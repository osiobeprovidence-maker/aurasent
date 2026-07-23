import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, Users, Package, ShoppingBag, BarChart3, 
  Plus, Trash2, Edit3, Search, Filter, 
  ChevronRight, DollarSign, Clock,
  ShieldCheck, UserPlus, Settings, LogOut, Palette
} from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Order, Customer, Product, Staff } from '../types';
import ProductForm from './ProductForm';
import StoreCustomizer from './StoreCustomizer';

type DashboardTab = 'overview' | 'orders' | 'products' | 'customers' | 'staff' | 'appearance';

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const products = (useQuery(api.products.list) ?? []) as Product[];
  const orders = (useQuery(api.orders.list) ?? []) as Order[];
  const customers = (useQuery(api.customers.list) ?? []) as Customer[];
  const staffMembers = (useQuery(api.staff.list) ?? []) as Staff[];
  const createProduct = useMutation(api.products.create);
  const removeProductMutation = useMutation(api.products.remove);
  const updateOrderStatusMutation = useMutation(api.orders.updateStatus);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  const saveNewProduct = async (productData: any) => {
    await createProduct({
      id: Date.now().toString(),
      name: productData.name,
      brand: productData.brand || 'AuraScent',
      price: productData.price || 0,
      rating: 5,
      category: productData.category || 'Unisex',
      description: productData.description || '',
      images: productData.images || [],
      notes: productData.notes || { top: [], middle: [], base: [] },
      ingredients: productData.ingredients || [],
      reviews: [],
    });
    setIsAddingProduct(false);
  };
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  
  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '', icon: DollarSign, color: 'text-green-500' },
    { label: 'Active Orders', value: activeOrders.toString(), change: '', icon: ShoppingBag, color: 'text-gold' },
    { label: 'Total Customers', value: customers.length.toString(), change: '', icon: Users, color: 'text-blue-500' },
    { label: 'Products', value: products.length.toString(), change: '', icon: Package, color: 'text-purple-500' },
  ];

  const updateOrderStatus = async (id: string, newStatus: string) => {
    await updateOrderStatusMutation({ id, status: newStatus });
  };

  const removeProduct = async (id: string) => {
    await removeProductMutation({ id });
  };

  const navItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'products', icon: Package, label: 'Inventory' },
    { id: 'appearance', icon: Palette, label: 'Aesthetics' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'staff', icon: ShieldCheck, label: 'Management' },
  ];

  return (
    <div className="pt-24 flex min-h-screen bg-[#FDFCFB]">
      {/* Mini Sidebar */}
      <aside className="w-24 border-r border-beige bg-white flex flex-col items-center py-10 gap-8">
        <div className="w-12 h-12 bg-charcoal rounded-2xl flex items-center justify-center text-white mb-8">
          <Store size={24} />
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as DashboardTab)}
            className={`p-4 rounded-2xl transition-all group relative ${
              activeTab === item.id ? 'bg-beige text-gold' : 'text-charcoal/30 hover:text-charcoal'
            }`}
          >
            <item.icon size={20} />
            <span className="absolute left-full ml-4 px-3 py-1 bg-charcoal text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">Boutique Command</p>
            <h1 className="text-4xl font-serif tracking-tight capitalize">{activeTab} Control</h1>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-12 pr-6 py-3 bg-white border border-beige rounded-full text-xs focus:border-gold outline-none w-64"
              />
            </div>
            <button className="p-3 bg-white border border-beige rounded-full text-charcoal/40 hover:text-gold transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-beige shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl bg-beige/50 ${stat.color}`}>
                          <stat.icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-green-500">{stat.change}</span>
                      </div>
                      <h3 className="text-3xl font-serif mb-1">{stat.value}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div className="bg-white p-10 rounded-[2.5rem] border border-beige shadow-sm">
                    <h3 className="text-xl font-serif mb-8 flex items-center gap-3">
                      <Clock size={20} className="text-gold" />
                      Live Order Stream
                    </h3>
                    <div className="space-y-6">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 hover:bg-beige/30 rounded-2xl transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center text-[10px] font-bold text-gold">
                              {order.customerName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{order.customerName}</p>
                              <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">{order.id} • {order.items} items</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-serif mb-1">${order.total}</p>
                            <span className="text-[8px] uppercase tracking-widest bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="w-full mt-8 py-4 border border-beige rounded-full text-[10px] uppercase tracking-widest font-bold text-charcoal/40 hover:text-gold hover:border-gold transition-all"
                    >
                      View All Shipments
                    </button>
                  </div>

                  {/* Growth Chart Placeholder */}
                  <div className="bg-charcoal text-white p-10 rounded-[2.5rem] relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-xl font-serif mb-2">Quarterly Projection</h3>
                      <p className="text-xs opacity-60 font-light mb-8">Estimated 15% increase in seasonal floral curations.</p>
                      <div className="h-48 flex items-end gap-3">
                        {[40, 65, 45, 90, 75, 55, 85].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-gold/20 rounded-t-lg transition-all duration-1000 hover:bg-gold cursor-pointer"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <BarChart3 size={150} className="absolute -bottom-10 -right-10 opacity-5" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-[2.5rem] border border-beige shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-beige">
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Order ID</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Customer</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Items</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Total</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Status</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige">
                    {orders.map((order) => (
                      <tr key={order.id} className="group hover:bg-beige/10 transition-colors">
                        <td className="px-8 py-6 text-xs font-bold text-gold">{order.id}</td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-medium">{order.customerName}</p>
                          <p className="text-[10px] text-charcoal/40">{order.date}</p>
                        </td>
                        <td className="px-8 py-6 text-xs">{order.items} Units</td>
                        <td className="px-8 py-6 text-sm font-serif">${order.total}</td>
                        <td className="px-8 py-6">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="bg-transparent text-[9px] uppercase tracking-widest font-bold outline-none cursor-pointer"
                          >
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-charcoal/20 hover:text-gold transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-8">
                {isAddingProduct ? (
                  <ProductForm 
                    onBack={() => setIsAddingProduct(false)} 
                    onSave={saveNewProduct} 
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-serif">Inventory Catalog</h3>
                      <button 
                        onClick={() => setIsAddingProduct(true)}
                        className="btn-primary py-3 px-8 text-[10px] flex items-center gap-2"
                      >
                        <Plus size={14} /> New Fragrance
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {products.map((product) => (
                        <div key={product.id} className="bg-white p-6 rounded-3xl border border-beige shadow-sm group">
                          <div className="aspect-[3/4] bg-beige rounded-2xl mb-6 overflow-hidden relative">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                              <button className="p-3 bg-white rounded-full text-charcoal shadow-lg hover:text-gold">
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => removeProduct(product.id)}
                                className="p-3 bg-white rounded-full text-charcoal shadow-lg hover:text-red-400"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-1">{product.brand}</p>
                              <h4 className="font-serif text-lg leading-tight mb-2">{product.name}</h4>
                              <p className="text-sm font-serif text-charcoal/60">${product.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mb-1">Stock</p>
                              <p className="text-xs font-bold">128 Units</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-white rounded-[2.5rem] border border-beige shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-beige">
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Client</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Orders</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Total Spent</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">Last Active</th>
                      <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="group hover:bg-beige/10 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center text-[10px] font-bold text-gold">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{customer.name}</p>
                              <p className="text-[10px] text-charcoal/40">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs">{customer.orders} Curations</td>
                        <td className="px-8 py-6 text-sm font-serif">${customer.spent.toLocaleString()}</td>
                        <td className="px-8 py-6 text-xs text-charcoal/40">{customer.lastOrder}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="btn-outline py-2 px-4 text-[8px]">View Profile</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'staff' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-beige shadow-sm">
                    <h3 className="text-xl font-serif mb-8 flex items-center gap-3">
                      <ShieldCheck size={20} className="text-gold" />
                      Team Authorization
                    </h3>
                    <div className="space-y-6">
                      {staffMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 hover:bg-beige/30 rounded-2xl transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center text-xs font-bold text-gold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">{member.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-charcoal/20 hover:text-gold"><Edit3 size={16} /></button>
                            <button className="p-2 text-charcoal/20 hover:text-red-400"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-charcoal text-white p-10 rounded-[2.5rem] relative overflow-hidden">
                    <h4 className="text-lg font-serif mb-6 relative z-10">Invite Member</h4>
                    <div className="space-y-4 relative z-10">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs outline-none focus:border-gold"
                      />
                      <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs outline-none focus:border-gold appearance-none">
                        <option className="bg-charcoal">Role: Manager</option>
                        <option className="bg-charcoal">Role: Staff</option>
                        <option className="bg-charcoal">Role: Perfumer</option>
                      </select>
                      <button className="w-full bg-gold py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all flex items-center justify-center gap-2">
                        <UserPlus size={14} /> Send Invite
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-beige">
                    <div className="flex items-center gap-3 mb-6">
                      <Settings size={20} className="text-gold" />
                      <h4 className="text-lg font-serif">Global Settings</h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        'Boutique Visibility',
                        'Inventory Alerts',
                        'Automatic Invoicing',
                        'Live Chat Support'
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <span className="text-xs text-charcoal/60">{setting}</span>
                          <div className="w-8 h-4 bg-beige rounded-full relative cursor-pointer">
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'appearance' && (
              <StoreCustomizer />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
