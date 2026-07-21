import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreConfig } from '../types';

interface ConfigContextType {
  config: StoreConfig;
  updateConfig: (updates: Partial<StoreConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: StoreConfig = {
  name: 'AuraScent',
  tagline: 'Artisanal Fragrance Atelier',
  logo: null,
  primaryColor: '#D4AF37',
  secondaryColor: '#1A1A1A',
  fontVibe: 'Serif',
  headingFont: 'Cormorant Garamond',
  bodyFont: 'Inter',
  borderRadius: 'Soft',
  shadowStyle: 'Subtle',
  heroTitle: 'Scents of Sublimity',
  heroSubtitle: 'Discover the latest additions to our private collection of rare extracts.',
  heroImage: 'https://images.unsplash.com/photo-1547634231-0ad157601b1a?auto=format&fit=crop&q=80&w=2000',
  heroOverlay: 40,
  enableNewsletter: true,
  enableTestimonials: true,
  enableInstagramFeed: true,
  announcementText: 'Grand Opening: Complimentary Sample Discovery Set with your first curation.',
  enableAnnouncement: true,
  enablePopup: true,
  popupTitle: 'The Collector\'s Edition',
  popupSubtitle: 'Join our inner circle to receive priority access to rare extracts and private atelier events.',
  popupImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000',
  promoBannerText: 'Limited Release: The Midnight Silk Collection has arrived.',
  enablePromoBanner: true,
  promotions: [
    {
      id: '1',
      title: 'Summer Solstice Collection',
      subtitle: 'Limited Edition Extracts',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000',
      link: '#',
      isActive: true
    }
  ],
  stats: [
    { label: 'Happy Curators', value: '12k+', icon: 'Users' },
    { label: 'Artisanal Blends', value: '48', icon: 'Sparkles' },
    { label: 'Global Ateliers', value: '5', icon: 'Map' }
  ]
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<StoreConfig>(() => {
    const saved = localStorage.getItem('store_config');
    if (!saved) return defaultConfig;
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultConfig, ...parsed };
    } catch (e) {
      return defaultConfig;
    }
  });

  useEffect(() => {
    localStorage.setItem('store_config', JSON.stringify(config));
    
    // Update CSS variables for colors
    document.documentElement.style.setProperty('--color-primary', config.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', config.secondaryColor);
    
    // Handle font vibes
    const root = document.documentElement;
    if (config.fontVibe === 'Serif') {
      root.style.setProperty('--font-main', '"Cormorant Garamond", serif');
      root.style.setProperty('--font-display', '"Cormorant Garamond", serif');
    } else if (config.fontVibe === 'Mono') {
      root.style.setProperty('--font-main', '"JetBrains Mono", monospace');
      root.style.setProperty('--font-display', '"JetBrains Mono", monospace');
    } else {
      root.style.setProperty('--font-main', '"Inter", sans-serif');
      root.style.setProperty('--font-display', '"Inter", sans-serif');
    }
  }, [config]);

  const updateConfig = (updates: Partial<StoreConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
