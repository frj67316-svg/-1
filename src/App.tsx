import { useState } from 'react';
import { Palette, Droplet, Hexagon, Globe } from 'lucide-react';
import PaletteGenerator from './components/PaletteGenerator';
import GradientGenerator from './components/GradientGenerator';
import { useLanguage } from './context/LanguageContext';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'palettes' | 'gradients'>('palettes');
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans flex flex-col selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-cyan-400 flex items-center justify-center shadow-[0_8px_16px_rgba(16,185,129,0.2)]">
              <Hexagon size={24} className="text-white fill-white/20" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-500 italic" style={{ fontFamily: '"Inter", sans-serif' }}>Hexo<span className="text-gray-900">Sip</span></h1>
              <p className="text-xs font-medium text-gray-400 tracking-wide mt-0.5">{t('subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center bg-gray-50/50 p-1 rounded-full border border-gray-100 shadow-sm">
              <button
                onClick={() => setActiveTab('palettes')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === 'palettes'
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5'
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Palette size={18} className={activeTab === 'palettes' ? 'text-brand-primary' : ''} />
                {t('palettes')}
              </button>
              <button
                onClick={() => setActiveTab('gradients')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === 'gradients'
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/5'
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Droplet size={18} className={activeTab === 'gradients' ? 'text-brand-primary' : ''} />
                {t('gradients')}
              </button>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 text-gray-700 transition-all font-bold text-xs sm:text-sm"
              title="Toggle Language"
            >
              <Globe size={16} className="text-brand-primary" />
              <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8 flex flex-col h-full">
        {activeTab === 'palettes' ? <PaletteGenerator /> : <GradientGenerator />}
      </main>
      <SpeedInsights />
    </div>
  );
}
