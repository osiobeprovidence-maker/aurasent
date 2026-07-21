import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, Layout, Image as ImageIcon, Type, 
  Sparkles, Save, Eye, RefreshCw, Smartphone, 
  Monitor, Check, Globe, Sliders, Layers, 
  Zap, MousePointer2, Box, Moon, Sun, 
  ChevronRight, ArrowRight, Instagram, RotateCcw,
  Megaphone, TrendingUp, Users, Map
} from 'lucide-react';
import { StoreConfig, StorePromotion, StoreStat } from '../types';
import { useConfig } from '../context/ConfigContext';

export default function StoreCustomizer() {
  const { config: globalConfig, updateConfig: updateGlobalConfig, resetConfig } = useConfig();
  const [config, setConfig] = useState<StoreConfig>(globalConfig);

  const [activePanel, setActivePanel] = useState<'branding' | 'atmosphere' | 'boutique' | 'marketing' | 'advanced'>('branding');

  const updatePromotion = (id: string, updates: Partial<StorePromotion>) => {
    setConfig(prev => ({
      ...prev,
      promotions: prev.promotions.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const updateStat = (index: number, updates: Partial<StoreStat>) => {
    setConfig(prev => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], ...updates };
      return { ...prev, stats: newStats };
    });
  };
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const updateConfigState = (key: keyof StoreConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateGlobalConfig(config);
    alert('Aesthetic choices preserved. The atelier has been updated.');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to revert to the original aesthetic heritage?')) {
      resetConfig();
      setConfig(globalConfig);
    }
  };

  const presets = [
    { 
      name: 'Midnight Atelier', 
      primary: '#D4AF37', 
      secondary: '#0A0A0A', 
      vibe: 'Serif' as const,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=2000'
    },
    { 
      name: 'Champagne Morning', 
      primary: '#B8860B', 
      secondary: '#FDFCFB', 
      vibe: 'Sans' as const,
      image: 'https://images.unsplash.com/photo-1547634231-0ad157601b1a?auto=format&fit=crop&q=80&w=2000'
    },
    { 
      name: 'Modernist Lab', 
      primary: '#1A1A1A', 
      secondary: '#F3F4F6', 
      vibe: 'Mono' as const,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=2000'
    }
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-serif tracking-tight">Atmosphere & Aesthetics</h2>
          <p className="text-sm text-charcoal/40 font-light max-w-lg">
            Sculpt the sensory experience of your digital boutique. Adjust typography, color stories, and atmospheric depth.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="px-6 py-4 bg-white border border-beige rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
          >
            <RotateCcw size={14} /> Revert
          </button>
          <button 
            onClick={handleSave}
            className="btn-primary px-10 py-4 text-[10px] flex items-center gap-3 shadow-xl shadow-gold/20"
          >
            <Save size={14} /> Preserve Atmosphere
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Settings Panel */}
        <div className="lg:col-span-5 space-y-8">
          {/* Preset Selector */}
          <section className="space-y-4">
            <h3 className="luxury-label !ml-0">Atmospheric Presets</h3>
            <div className="grid grid-cols-3 gap-4">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    updateConfigState('primaryColor', preset.primary);
                    updateConfigState('secondaryColor', preset.secondary);
                    updateConfigState('fontVibe', preset.vibe);
                    updateConfigState('heroImage', preset.image);
                  }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-beige hover:border-gold transition-all"
                >
                  <img src={preset.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                    <p className="text-[10px] text-white font-bold uppercase tracking-widest leading-tight">{preset.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="bg-white rounded-[3rem] border border-beige p-10 shadow-sm space-y-10">
            <nav className="flex gap-2 p-1 bg-beige/10 rounded-2xl">
              {[
                { id: 'branding', icon: Palette, label: 'Identity' },
                { id: 'atmosphere', icon: ImageIcon, label: 'Atmosphere' },
                { id: 'boutique', icon: Layout, label: 'Boutique' },
                { id: 'marketing', icon: Megaphone, label: 'Marketing' },
                { id: 'advanced', icon: Sliders, label: 'Studio' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id as any)}
                  className={`flex-1 py-4 rounded-xl text-[9px] font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-2 transition-all ${
                    activePanel === tab.id ? 'bg-white text-charcoal shadow-md' : 'text-charcoal/30 hover:text-charcoal'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {activePanel === 'branding' && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="luxury-label">Atelier Name</label>
                      <input 
                        type="text" 
                        value={config.name}
                        onChange={e => updateConfigState('name', e.target.value)}
                        className="checkout-input" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="luxury-label">Primary Tone</label>
                        <div className="flex items-center gap-4">
                          <input 
                            type="color" 
                            value={config.primaryColor}
                            onChange={e => updateConfigState('primaryColor', e.target.value)}
                            className="w-12 h-12 rounded-full border-none cursor-pointer bg-transparent"
                          />
                          <input 
                            type="text" 
                            value={config.primaryColor}
                            onChange={e => updateConfigState('primaryColor', e.target.value)}
                            className="checkout-input font-mono text-[10px] uppercase"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="luxury-label">Secondary Tone</label>
                        <div className="flex items-center gap-4">
                          <input 
                            type="color" 
                            value={config.secondaryColor}
                            onChange={e => updateConfigState('secondaryColor', e.target.value)}
                            className="w-12 h-12 rounded-full border-none cursor-pointer bg-transparent"
                          />
                          <input 
                            type="text" 
                            value={config.secondaryColor}
                            onChange={e => updateConfigState('secondaryColor', e.target.value)}
                            className="checkout-input font-mono text-[10px] uppercase"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="luxury-label">Typographic Heritage</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Serif', 'Sans', 'Mono'].map((vibe) => (
                          <button
                            key={vibe}
                            onClick={() => updateConfigState('fontVibe', vibe)}
                            className={`p-6 rounded-[2rem] border transition-all ${
                              config.fontVibe === vibe 
                                ? 'bg-charcoal text-white border-charcoal shadow-xl' 
                                : 'bg-white border-beige hover:border-gold text-charcoal/30'
                            }`}
                          >
                            <p className={`text-2xl mb-1 ${
                              vibe === 'Serif' ? 'font-serif' : vibe === 'Mono' ? 'font-mono' : 'font-sans'
                            }`}>Aa</p>
                            <p className="text-[9px] uppercase tracking-widest font-bold">{vibe}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === 'atmosphere' && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="luxury-label">Hero Narrative</label>
                      <input 
                        type="text" 
                        value={config.heroTitle}
                        onChange={e => updateConfigState('heroTitle', e.target.value)}
                        className="checkout-input" 
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-4">
                        <label className="luxury-label !m-0">Atmospheric Overlay</label>
                        <span className="text-[10px] font-mono font-bold text-gold">{config.heroOverlay}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="80"
                        value={config.heroOverlay}
                        onChange={e => updateConfigState('heroOverlay', parseInt(e.target.value))}
                        className="w-full h-1 bg-beige rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="luxury-label">Showcase Image</label>
                      <div className="aspect-[16/9] bg-beige/20 rounded-3xl border border-beige overflow-hidden relative group cursor-pointer">
                        <img src={config.heroImage} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="text-center text-white">
                            <RefreshCw size={24} className="mx-auto mb-2" />
                            <p className="text-[10px] uppercase tracking-widest font-bold">Replace Visual</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === 'boutique' && (
                  <div className="space-y-6">
                    {[
                      { id: 'enableNewsletter', label: 'Newsletter Studio', desc: 'Capture customer extracts for journals', icon: Globe },
                      { id: 'enableTestimonials', label: 'Curated Echoes', desc: 'Display rare customer testimonials', icon: Sparkles },
                      { id: 'enableInstagramFeed', label: 'Instagram Curation', desc: 'Mirror your visual diary', icon: Instagram },
                    ].map((toggle) => (
                      <button
                        key={toggle.id}
                        onClick={() => updateConfigState(toggle.id as any, !config[toggle.id as keyof StoreConfig])}
                        className={`w-full p-6 rounded-[2rem] border text-left transition-all flex items-center justify-between ${
                          config[toggle.id as keyof StoreConfig] 
                            ? 'bg-charcoal text-white border-charcoal shadow-lg' 
                            : 'bg-white border-beige hover:border-gold'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config[toggle.id as keyof StoreConfig] ? 'bg-white/10' : 'bg-beige/20 text-gold'}`}>
                            <toggle.icon size={20} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest">{toggle.label}</h4>
                            <p className={`text-[10px] font-light ${config[toggle.id as keyof StoreConfig] ? 'text-white/40' : 'text-charcoal/40'}`}>
                              {toggle.desc}
                            </p>
                          </div>
                        </div>
                        {config[toggle.id as keyof StoreConfig] && <Check size={20} className="text-gold" />}
                      </button>
                    ))}
                  </div>
                )}

                {activePanel === 'marketing' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="luxury-label !m-0">Global Announcement</label>
                        <button 
                          onClick={() => updateConfigState('enableAnnouncement', !config.enableAnnouncement)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${config.enableAnnouncement ? 'bg-gold' : 'bg-beige'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.enableAnnouncement ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                      <textarea 
                        value={config.announcementText}
                        onChange={e => updateConfigState('announcementText', e.target.value)}
                        rows={2}
                        className="checkout-input resize-none py-4"
                        placeholder="Announce your latest collection or offer..."
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <label className="luxury-label !m-0">New Arrival Banner</label>
                        <button 
                          onClick={() => updateConfigState('enablePromoBanner', !config.enablePromoBanner)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${config.enablePromoBanner ? 'bg-gold' : 'bg-beige'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.enablePromoBanner ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                      <input 
                        type="text" 
                        value={config.promoBannerText}
                        onChange={e => updateConfigState('promoBannerText', e.target.value)}
                        className="checkout-input"
                        placeholder="Ticker text for new arrivals..."
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <label className="luxury-label !m-0">Marketing Popup</label>
                        <button 
                          onClick={() => updateConfigState('enablePopup', !config.enablePopup)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${config.enablePopup ? 'bg-gold' : 'bg-beige'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.enablePopup ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                      
                      {config.enablePopup && (
                        <div className="p-6 bg-ivory border border-beige rounded-[2rem] space-y-4">
                          <input 
                            type="text" 
                            value={config.popupTitle}
                            onChange={e => updateConfigState('popupTitle', e.target.value)}
                            className="w-full bg-transparent border-b border-beige pb-2 text-sm font-serif outline-none focus:border-gold"
                            placeholder="Popup Title"
                          />
                          <textarea 
                            value={config.popupSubtitle}
                            onChange={e => updateConfigState('popupSubtitle', e.target.value)}
                            rows={3}
                            className="w-full bg-transparent border-b border-beige pb-2 text-xs font-light outline-none focus:border-gold resize-none"
                            placeholder="Popup Subtitle"
                          />
                          <div className="aspect-video rounded-2xl overflow-hidden border border-beige relative group cursor-pointer">
                            <img src={config.popupImage} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <RefreshCw size={18} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <label className="luxury-label">Featured Promotion (Ad)</label>
                      {(config.promotions || []).map((promo) => (
                        <div key={promo.id} className="p-6 bg-ivory border border-beige rounded-[2rem] space-y-4">
                          <input 
                            type="text" 
                            value={promo.title}
                            onChange={e => updatePromotion(promo.id, { title: e.target.value })}
                            className="w-full bg-transparent border-b border-beige pb-2 text-xs font-bold uppercase tracking-widest outline-none focus:border-gold"
                            placeholder="Promo Title"
                          />
                          <input 
                            type="text" 
                            value={promo.subtitle}
                            onChange={e => updatePromotion(promo.id, { subtitle: e.target.value })}
                            className="w-full bg-transparent border-b border-beige pb-2 text-[10px] font-light outline-none focus:border-gold"
                            placeholder="Promo Subtitle"
                          />
                          <div className="aspect-video rounded-2xl overflow-hidden border border-beige relative group cursor-pointer">
                            <img src={promo.image} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <RefreshCw size={18} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <label className="luxury-label">Boutique Statistics</label>
                      <div className="grid grid-cols-1 gap-4">
                        {(config.stats || []).map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-beige rounded-2xl shadow-sm">
                            <div className="w-10 h-10 bg-beige/20 rounded-xl flex items-center justify-center text-gold">
                              {stat.icon === 'Users' && <Users size={18} />}
                              {stat.icon === 'Sparkles' && <Sparkles size={18} />}
                              {stat.icon === 'Map' && <Map size={18} />}
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                value={stat.value}
                                onChange={e => updateStat(idx, { value: e.target.value })}
                                className="bg-transparent text-xs font-bold outline-none"
                              />
                              <input 
                                type="text" 
                                value={stat.label}
                                onChange={e => updateStat(idx, { label: e.target.value })}
                                className="bg-transparent text-[10px] text-charcoal/40 outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === 'advanced' && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <label className="luxury-label">Global Curvature</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['None', 'Soft', 'Deep'].map((radius) => (
                          <button
                            key={radius}
                            onClick={() => updateConfigState('borderRadius', radius)}
                            className={`py-6 rounded-2xl border transition-all ${
                              config.borderRadius === radius 
                                ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' 
                                : 'bg-white border-beige hover:border-gold text-charcoal/30'
                            }`}
                          >
                            <Box size={24} className="mx-auto mb-2" />
                            <p className="text-[9px] uppercase tracking-widest font-bold">{radius}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <label className="luxury-label">Shadow Architecture</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Flat', 'Subtle', 'Elevated'].map((style) => (
                          <button
                            key={style}
                            onClick={() => updateConfigState('shadowStyle', style)}
                            className={`py-6 rounded-2xl border transition-all ${
                              config.shadowStyle === style 
                                ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20' 
                                : 'bg-white border-beige hover:border-gold text-charcoal/30'
                            }`}
                          >
                            <Layers size={24} className="mx-auto mb-2" />
                            <p className="text-[9px] uppercase tracking-widest font-bold">{style}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Live Preview Console */}
        <div className="lg:col-span-7">
          <div className="sticky top-12 space-y-6">
            <div className="flex items-center justify-between px-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40">Studio Preview (Live)</span>
              </div>
              <div className="flex bg-beige/20 p-1 rounded-full">
                <button 
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded-full transition-all ${previewDevice === 'desktop' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal/30 hover:text-charcoal'}`}
                >
                  <Monitor size={14} />
                </button>
                <button 
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded-full transition-all ${previewDevice === 'mobile' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal/30 hover:text-charcoal'}`}
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>
            
            <div className={`mx-auto bg-white overflow-hidden shadow-2xl transition-all duration-500 border border-beige ${
              previewDevice === 'desktop' 
                ? 'w-full aspect-[16/10] rounded-[3rem]' 
                : 'w-[320px] aspect-[9/16] rounded-[2.5rem]'
            }`}>
              {/* Mock Store Container */}
              <div className={`h-full overflow-y-auto scroll-smooth custom-scrollbar ${
                config.fontVibe === 'Serif' ? 'font-serif' : config.fontVibe === 'Mono' ? 'font-mono' : 'font-sans'
              }`} style={{ backgroundColor: config.secondaryColor }}>
                
                {/* Header */}
                <header className="p-8 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md bg-transparent">
                  <h1 className="text-xl tracking-tight text-white mix-blend-difference">{config.name}</h1>
                  <div className="flex gap-6 text-[8px] uppercase tracking-[0.3em] font-bold text-white mix-blend-difference">
                    <span className="hidden md:block">Collections</span>
                    <span>Search</span>
                    <span>Atelier</span>
                  </div>
                </header>

                {/* Hero Section */}
                <div className="relative min-h-[80%] flex items-center justify-center px-12 pb-24 overflow-hidden">
                  <img src={config.heroImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div 
                    className="absolute inset-0 bg-black transition-opacity duration-300" 
                    style={{ opacity: config.heroOverlay / 100 }} 
                  />
                  
                  <div className="relative text-center max-w-2xl space-y-8">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                      <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 mb-6 font-bold">{config.tagline}</p>
                      <h2 className="text-5xl md:text-7xl text-white tracking-tight leading-none mb-10">
                        {config.heroTitle}
                      </h2>
                      <p className="text-white/60 text-sm font-light max-w-md mx-auto leading-relaxed mb-12">
                        {config.heroSubtitle}
                      </p>
                      <button 
                        className="px-12 py-5 bg-white text-charcoal text-[9px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-gold hover:text-white"
                        style={{ borderRadius: config.borderRadius === 'Deep' ? '100px' : config.borderRadius === 'Soft' ? '1rem' : '0' }}
                      >
                        Explore Essence
                      </button>
                    </motion.div>
                  </div>

                  {/* Scroll Indicator */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40">
                    <div className="w-px h-12 bg-white/20 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-dash" />
                    </div>
                  </div>
                </div>

                {/* Boutique Preview (Sections) */}
                <div className="p-12 space-y-24 bg-white rounded-t-[4rem] -mt-12 relative z-10 shadow-2xl">
                  {/* Category Filter */}
                  <div className="flex justify-center gap-12 text-[10px] uppercase tracking-[0.3em] text-charcoal/30 font-bold border-b border-beige pb-8">
                    <span className="text-gold border-b border-gold pb-8">All Extracts</span>
                    <span>Midnight Silk</span>
                    <span>Lunar Sand</span>
                    <span>Velvet Oudh</span>
                  </div>

                  {/* Product Grid Mockup */}
                  <div className="grid grid-cols-2 gap-8">
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-6">
                        <div className="aspect-[4/5] bg-beige/30 rounded-[2rem] overflow-hidden group">
                          <div className="w-full h-full bg-ivory flex items-center justify-center text-charcoal/10 transition-transform group-hover:scale-105">
                            <ImageIcon size={48} strokeWidth={1} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Private Atelier</p>
                          <h4 className="text-lg font-medium leading-none">Essence of Midnight {i}</h4>
                          <p className="text-sm text-charcoal/40">$240.00</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Newsletter Section */}
                  {config.enableNewsletter && (
                    <div className="py-24 px-12 bg-ivory rounded-[3rem] text-center space-y-8 border border-beige/50">
                      <h3 className="text-3xl tracking-tight">Stay within our orbit</h3>
                      <p className="text-xs text-charcoal/60 font-light leading-relaxed max-w-sm mx-auto">
                        Receive rare notifications about limited collections and private atelier events.
                      </p>
                      <div className="flex border-b border-charcoal pb-4 max-w-xs mx-auto">
                        <input type="text" placeholder="Your essence (email)" className="bg-transparent text-[10px] flex-1 outline-none font-light" />
                        <ArrowRight size={14} className="text-gold" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-4 bg-beige/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
              <Zap size={14} className="text-gold" />
              Direct visual rendering of your boutique configuration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
