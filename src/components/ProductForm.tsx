import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Upload, Plus, X, Sparkles, Droplets, Wind, 
  Image as ImageIcon, DollarSign, Package, Tag, Globe, 
  Eye, Save, Send, Clock, Trash2, ChevronRight, Info,
  CheckCircle2, AlertCircle, ShoppingBag, Layers
} from 'lucide-react';
import { Product, Category, ProductVariant } from '../types';

interface ProductFormProps {
  onBack: () => void;
  onSave: (product: Omit<Product, 'id' | 'rating' | 'reviews' | 'ingredients'>) => void;
}

type FormSection = 'info' | 'pricing' | 'media' | 'composition' | 'description' | 'variants' | 'seo' | 'visibility';

export default function ProductForm({ onBack, onSave }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<FormSection>('info');
  const [formData, setFormData] = useState({
    name: '',
    brand: 'AuraScent Private',
    collection: '',
    sku: '',
    productType: 'Eau de Parfum',
    gender: 'Unisex' as const,
    concentration: '20%',
    launchYear: new Date().getFullYear(),
    price: 0,
    compareAtPrice: 0,
    costPrice: 0,
    quantity: 100,
    lowStockAlert: 10,
    availability: 'In Stock' as const,
    category: 'Niche' as Category,
    description: '',
    shortDescription: '',
    usageInstructions: '',
    perfectFor: '',
    longevity: 'Long-lasting',
    projection: 'Moderate',
    season: 'All Seasons',
    occasion: 'Versatile',
    topNotes: [] as string[],
    middleNotes: [] as string[],
    baseNotes: [] as string[],
    images: [] as string[],
    isGiftReady: true,
    isLimitedEdition: false,
    isFeatured: false,
    isExclusive: false,
    isNewArrival: true,
    recommendedPairings: [] as string[],
    variants: [] as ProductVariant[],
    seoTitle: '',
    metaDescription: '',
    urlSlug: '',
    keywords: [] as string[],
    status: 'Draft' as const,
  });

  const [newNote, setNewNote] = useState({ top: '', middle: '', base: '' });
  const [newPairing, setNewPairing] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const addNote = (type: 'top' | 'middle' | 'base') => {
    const note = newNote[type].trim();
    if (note) {
      setFormData(prev => ({
        ...prev,
        [`${type}Notes`]: [...prev[`${type}Notes` as keyof typeof prev] as string[], note]
      }));
      setNewNote(prev => ({ ...prev, [type]: '' }));
    }
  };

  const removeNote = (type: 'top' | 'middle' | 'base', index: number) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Notes`]: (prev[`${type}Notes` as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      size: '100ml',
      price: formData.price,
      inventory: 50,
      sku: `${formData.sku}-100`,
      barcode: ''
    };
    setFormData(prev => ({ ...prev, variants: [...prev.variants, newVariant] }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSave({
      ...formData,
      notes: {
        top: formData.topNotes,
        middle: formData.middleNotes,
        base: formData.baseNotes
      },
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'],
    });
  };

  const sections = [
    { id: 'info', icon: Info, label: 'Product Info' },
    { id: 'pricing', icon: DollarSign, label: 'Commerce' },
    { id: 'media', icon: ImageIcon, label: 'Gallery' },
    { id: 'composition', icon: Wind, label: 'Composition' },
    { id: 'description', icon: Sparkles, label: 'The Narrative' },
    { id: 'variants', icon: Layers, label: 'Variants' },
    { id: 'seo', icon: Globe, label: 'SEO' },
    { id: 'visibility', icon: Eye, label: 'Visibility' },
  ];

  const statusBadges = [
    { label: 'Draft', color: 'bg-gray-100 text-gray-600' },
    { label: 'Ready for Review', color: 'bg-blue-50 text-blue-600' },
    { label: 'Published', color: 'bg-green-50 text-green-600' },
    { label: 'Featured Collection', color: 'bg-gold/10 text-gold' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-charcoal/40 hover:text-gold transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Boutique Inventory
          </button>
          <h1 className="text-4xl font-serif tracking-tight">Create Luxury Product Listing</h1>
          <p className="text-sm text-charcoal/60 font-light max-w-xl">
            Prepare a premium fragrance experience for your boutique. Everything you enter here will define how customers discover, explore and purchase this fragrance.
          </p>
          <div className="flex gap-2 pt-2">
            {statusBadges.map((badge, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${badge.color}`}>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id as FormSection)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-medium transition-all ${
                activeTab === section.id 
                  ? 'bg-charcoal text-white shadow-xl translate-x-2' 
                  : 'text-charcoal/40 hover:bg-beige/50 hover:text-charcoal'
              }`}
            >
              <section.icon size={16} />
              {section.label}
              {activeTab === section.id && <ChevronRight size={14} className="ml-auto opacity-40" />}
            </button>
          ))}
        </aside>

        {/* Form Content */}
        <div className="lg:col-span-3 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[3rem] border border-beige shadow-sm p-10 md:p-16"
            >
              {activeTab === 'info' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">Product Information</h2>
                    <p className="text-xs text-charcoal/40 font-light">The core identity and classification of the fragrance.</p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="luxury-label">Product Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="checkout-input" 
                        placeholder="e.g. Midnight Silk" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Brand / House</label>
                      <input 
                        type="text" 
                        value={formData.brand}
                        onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        className="checkout-input" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Collection</label>
                      <input 
                        type="text" 
                        value={formData.collection}
                        onChange={e => setFormData(prev => ({ ...prev, collection: e.target.value }))}
                        className="checkout-input" 
                        placeholder="Private Blend"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">SKU ID</label>
                      <input 
                        type="text" 
                        value={formData.sku}
                        onChange={e => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        className="checkout-input" 
                        placeholder="AS-MS-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Gender Olfactive</label>
                      <select 
                        value={formData.gender}
                        onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                        className="checkout-input appearance-none"
                      >
                        <option>Unisex</option>
                        <option>Women</option>
                        <option>Men</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Concentration</label>
                      <input 
                        type="text" 
                        value={formData.concentration}
                        onChange={e => setFormData(prev => ({ ...prev, concentration: e.target.value }))}
                        className="checkout-input" 
                        placeholder="e.g. Eau de Parfum (20%)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">Pricing & Inventory</h2>
                    <p className="text-xs text-charcoal/40 font-light">Commerce details and warehouse management.</p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="luxury-label">Selling Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">$</span>
                        <input 
                          type="number" 
                          value={formData.price}
                          onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                          className="checkout-input pl-8" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Compare-at Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">$</span>
                        <input 
                          type="number" 
                          value={formData.compareAtPrice}
                          onChange={e => setFormData(prev => ({ ...prev, compareAtPrice: parseFloat(e.target.value) }))}
                          className="checkout-input pl-8" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Cost Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">$</span>
                        <input 
                          type="number" 
                          value={formData.costPrice}
                          onChange={e => setFormData(prev => ({ ...prev, costPrice: parseFloat(e.target.value) }))}
                          className="checkout-input pl-8" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-beige/10 rounded-3xl border border-beige flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.quantity > 20 ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                      }`}>
                        <Package size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Inventory Management</h4>
                        <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">
                          {formData.quantity > 20 ? 'Sufficient Stock Levels' : 'Inventory Alert Triggered'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center px-4 border-r border-beige">
                        <p className="text-[9px] uppercase tracking-widest text-charcoal/40 mb-1">Available</p>
                        <input 
                          type="number" 
                          value={formData.quantity}
                          onChange={e => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                          className="w-16 bg-transparent text-center font-serif text-lg outline-none"
                        />
                      </div>
                      <div className="text-center px-4">
                        <p className="text-[9px] uppercase tracking-widest text-charcoal/40 mb-1">Low Alert</p>
                        <input 
                          type="number" 
                          value={formData.lowStockAlert}
                          onChange={e => setFormData(prev => ({ ...prev, lowStockAlert: parseInt(e.target.value) }))}
                          className="w-16 bg-transparent text-center font-serif text-lg outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">Product Gallery</h2>
                    <p className="text-xs text-charcoal/40 font-light">High-fidelity visual representations of the fragrance.</p>
                  </header>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {formData.images.map((img, i) => (
                      <div key={i} className="aspect-[3/4] bg-beige/20 rounded-2xl border border-beige overflow-hidden relative group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button className="aspect-[3/4] border-2 border-dashed border-beige rounded-2xl flex flex-col items-center justify-center gap-3 text-charcoal/20 hover:border-gold hover:text-gold transition-all group">
                      <div className="p-3 rounded-full bg-beige/30 group-hover:bg-gold/10 transition-colors">
                        <Plus size={20} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold">Add Visual</span>
                    </button>
                  </div>

                  <div className="p-8 border border-gold/20 bg-gold/[0.02] rounded-3xl space-y-4">
                    <div className="flex items-center gap-2 text-gold">
                      <Sparkles size={16} />
                      <h4 className="text-sm font-medium">Boutique Presentation</h4>
                    </div>
                    <p className="text-xs text-charcoal/60 leading-relaxed font-light">
                      We recommend a minimum of 4 studio shots including: 1 Hero Transparent, 1 Lifestyle Scene, 1 Texture/Liquid Macro, and 1 Packaging Shot.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'composition' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">Fragrance Composition</h2>
                    <p className="text-xs text-charcoal/40 font-light">The olfactive pyramid defining the scent's evolution.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { type: 'top', icon: Wind, label: 'Top Notes', color: 'text-blue-400' },
                      { type: 'middle', icon: Sparkles, label: 'Heart Notes', color: 'text-gold' },
                      { type: 'base', icon: Droplets, label: 'Base Notes', color: 'text-charcoal/60' }
                    ].map((pyramid) => (
                      <div key={pyramid.type} className="p-8 bg-white border border-beige rounded-[2.5rem] shadow-sm flex flex-col h-full">
                        <div className={`flex items-center gap-3 mb-6 ${pyramid.color}`}>
                          <pyramid.icon size={20} />
                          <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">{pyramid.label}</h4>
                        </div>
                        <div className="flex gap-2 mb-6">
                          <input 
                            type="text" 
                            value={newNote[pyramid.type as keyof typeof newNote]}
                            onChange={e => setNewNote(prev => ({ ...prev, [pyramid.type]: e.target.value }))}
                            className="flex-1 bg-beige/20 border border-transparent focus:border-gold px-4 py-2 text-[10px] rounded-full outline-none"
                            placeholder="Add note..."
                          />
                          <button 
                            type="button" 
                            onClick={() => addNote(pyramid.type as any)}
                            className="p-2 bg-charcoal text-white rounded-full hover:bg-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(formData[`${pyramid.type}Notes` as keyof typeof formData] as string[]).map((note, i) => (
                            <span key={i} className="px-3 py-1 bg-beige/30 rounded-full text-[9px] flex items-center gap-2 font-medium">
                              {note}
                              <button type="button" onClick={() => removeNote(pyramid.type as any, i)} className="text-charcoal/20 hover:text-red-400"><X size={10} /></button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'description' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">Product Narrative</h2>
                    <p className="text-xs text-charcoal/40 font-light">The artistic storytelling and technical performance details.</p>
                  </header>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="luxury-label">Short Description</label>
                      <input 
                        type="text" 
                        value={formData.shortDescription}
                        onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                        className="checkout-input" 
                        placeholder="A magnetic fusion of spice and silk."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="luxury-label">Luxury Story</label>
                      <textarea 
                        rows={6}
                        value={formData.description}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-beige/10 border border-beige focus:border-gold outline-none px-8 py-6 rounded-[2rem] text-sm transition-all resize-none font-light leading-relaxed" 
                        placeholder="Enter the artistic inspiration behind this creation..."
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="space-y-2">
                        <label className="luxury-label">Longevity</label>
                        <select 
                          value={formData.longevity}
                          onChange={e => setFormData(prev => ({ ...prev, longevity: e.target.value }))}
                          className="checkout-input text-xs"
                        >
                          <option>Short (2-4h)</option>
                          <option>Moderate (4-6h)</option>
                          <option>Long-lasting (8-12h)</option>
                          <option>Eternal (12h+)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="luxury-label">Projection</label>
                        <select 
                          value={formData.projection}
                          onChange={e => setFormData(prev => ({ ...prev, projection: e.target.value }))}
                          className="checkout-input text-xs"
                        >
                          <option>Skin Scent</option>
                          <option>Intimate</option>
                          <option>Moderate</option>
                          <option>Strong</option>
                          <option>Room-filling</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="luxury-label">Season</label>
                        <select 
                          value={formData.season}
                          onChange={e => setFormData(prev => ({ ...prev, season: e.target.value }))}
                          className="checkout-input text-xs"
                        >
                          <option>All Seasons</option>
                          <option>Spring / Summer</option>
                          <option>Autumn / Winter</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="luxury-label">Occasion</label>
                        <input 
                          type="text" 
                          value={formData.occasion}
                          onChange={e => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                          className="checkout-input text-xs" 
                          placeholder="Evening Gala"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'variants' && (
                <div className="space-y-12">
                  <header className="flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-serif mb-2">Product Variants</h2>
                      <p className="text-xs text-charcoal/40 font-light">Manage multiple sizes and limited configurations.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={addVariant}
                      className="p-4 bg-beige/30 rounded-2xl text-gold hover:bg-gold hover:text-white transition-all"
                    >
                      <Plus size={20} />
                    </button>
                  </header>

                  <div className="space-y-4">
                    {formData.variants.map((variant, i) => (
                      <div key={i} className="grid grid-cols-5 gap-4 p-6 bg-beige/10 rounded-[2rem] border border-beige items-end relative group">
                        <div className="space-y-2">
                          <label className="luxury-label">Size</label>
                          <input type="text" value={variant.size} className="checkout-input bg-white" placeholder="100ml" />
                        </div>
                        <div className="space-y-2">
                          <label className="luxury-label">Price</label>
                          <input type="number" value={variant.price} className="checkout-input bg-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="luxury-label">Inventory</label>
                          <input type="number" value={variant.inventory} className="checkout-input bg-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="luxury-label">SKU</label>
                          <input type="text" value={variant.sku} className="checkout-input bg-white" />
                        </div>
                        <div className="flex justify-end">
                          <button 
                            type="button" 
                            onClick={() => removeVariant(i)}
                            className="p-3 text-charcoal/20 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.variants.length === 0 && (
                      <div className="py-20 text-center border-2 border-dashed border-beige rounded-[3rem]">
                        <Package size={32} className="mx-auto mb-4 text-charcoal/10" />
                        <p className="text-xs text-charcoal/40 uppercase tracking-widest font-bold">No variants defined</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">SEO & Discoverability</h2>
                    <p className="text-xs text-charcoal/40 font-light">Optimize how your fragrance appears in global search engines.</p>
                  </header>

                  <div className="space-y-8">
                    <div className="p-8 bg-blue-50/30 rounded-3xl border border-blue-100 space-y-4">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Globe size={16} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Search Preview</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-blue-700 text-lg font-medium truncate">{formData.seoTitle || formData.name || 'Product Title'}</p>
                        <p className="text-green-700 text-xs">aurascent.com/fragrance/{formData.urlSlug || 'midnight-silk'}</p>
                        <p className="text-gray-600 text-xs line-clamp-2">{formData.metaDescription || 'A luxury fragrance curation from AuraScent Private.'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-2">
                        <label className="luxury-label">SEO Title Tag</label>
                        <input 
                          type="text" 
                          value={formData.seoTitle}
                          onChange={e => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                          className="checkout-input" 
                          maxLength={60}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="luxury-label">Meta Description</label>
                        <textarea 
                          rows={3}
                          value={formData.metaDescription}
                          onChange={e => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                          className="w-full bg-white border border-beige focus:border-gold outline-none px-6 py-4 rounded-2xl text-sm transition-all resize-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="luxury-label">URL Slug</label>
                        <div className="relative">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20 text-xs font-mono">fragrance/</span>
                          <input 
                            type="text" 
                            value={formData.urlSlug}
                            onChange={e => setFormData(prev => ({ ...prev, urlSlug: e.target.value }))}
                            className="checkout-input pl-24" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visibility' && (
                <div className="space-y-12">
                  <header>
                    <h2 className="text-2xl font-serif mb-2">Shopping Experience</h2>
                    <p className="text-xs text-charcoal/40 font-light">Custom badges and visibility triggers for customers.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: 'isNewArrival', label: 'New Arrival Badge', desc: 'Display "NEW" overlay on product card' },
                      { id: 'isFeatured', label: 'Featured Product', desc: 'Highlight in homepage boutique rows' },
                      { id: 'isExclusive', label: 'Exclusive Release', desc: 'Private atelier access only' },
                      { id: 'isLimitedEdition', label: 'Limited Edition', desc: 'Indicates restricted production volume' },
                      { id: 'isGiftReady', label: 'Gift Ready Packaging', desc: 'Include signature satin gift wrap' },
                    ].map((toggle) => (
                      <div 
                        key={toggle.id}
                        onClick={() => setFormData(prev => ({ ...prev, [toggle.id]: !prev[toggle.id as keyof typeof prev] }))}
                        className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between ${
                          formData[toggle.id as keyof typeof formData] 
                            ? 'bg-charcoal text-white border-charcoal' 
                            : 'bg-white border-beige hover:border-gold'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-widest">{toggle.label}</h4>
                          <p className={`text-[10px] ${formData[toggle.id as keyof typeof formData] ? 'text-white/60' : 'text-charcoal/40'}`}>
                            {toggle.desc}
                          </p>
                        </div>
                        {formData[toggle.id as keyof typeof formData] ? <CheckCircle2 size={20} className="text-gold" /> : <div className="w-5 h-5 rounded-full border border-beige" />}
                      </div>
                    ))}
                  </div>

                  <div className="p-10 bg-gold/5 rounded-[2.5rem] border border-gold/20 space-y-6">
                    <div className="flex items-center gap-3 text-gold">
                      <ShoppingBag size={20} />
                      <h3 className="text-lg font-serif">Recommended Pairings</h3>
                    </div>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={newPairing}
                        onChange={e => setNewPairing(e.target.value)}
                        className="flex-1 bg-white border border-beige rounded-full px-6 py-4 text-xs outline-none"
                        placeholder="e.g. Saffron Rose"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          if (newPairing) {
                            setFormData(prev => ({ ...prev, recommendedPairings: [...prev.recommendedPairings, newPairing] }));
                            setNewPairing('');
                          }
                        }}
                        className="px-8 py-4 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-colors"
                      >
                        Link Fragrance
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.recommendedPairings.map((p, i) => (
                        <span key={i} className="px-4 py-2 bg-white rounded-full text-[10px] font-medium border border-beige flex items-center gap-3">
                          {p}
                          <button type="button" onClick={() => setFormData(prev => ({ ...prev, recommendedPairings: prev.recommendedPairings.filter((_, idx) => idx !== i) }))} className="text-charcoal/20 hover:text-red-400"><X size={14} /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-beige z-50 py-6 px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/60">Draft Mode</p>
            </div>
            <div className="h-4 w-px bg-beige" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/30 flex items-center gap-2">
              <Save size={12} /> Last auto-saved at 14:02
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-4 rounded-full border border-beige text-[10px] uppercase tracking-widest font-bold text-charcoal/60 hover:bg-beige transition-all flex items-center gap-2">
              <Eye size={14} /> Preview
            </button>
            <button className="px-8 py-4 rounded-full border border-beige text-[10px] uppercase tracking-widest font-bold text-charcoal/60 hover:bg-beige transition-all flex items-center gap-2">
              <Save size={14} /> Save Draft
            </button>
            <button 
              onClick={() => handleSubmit()}
              className="px-10 py-4 rounded-full bg-charcoal text-white text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-all shadow-xl flex items-center gap-3 group"
            >
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
