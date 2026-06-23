import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, Copy, RefreshCw, Settings2, Check } from 'lucide-react';
import { ColorItem, PaletteHarmony } from '../types';
import { generateHarmoniousPalette, hexToHsl } from '../utils/colorUtils';
import { useLanguage } from '../context/LanguageContext';

export default function PaletteGenerator() {
  const { language, t } = useLanguage();
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [harmony, setHarmony] = useState<PaletteHarmony>('analogous');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateColors = useCallback(() => {
    setColors(prev => {
      // Pass existing colors so locked ones are retained
      return generateHarmoniousPalette(harmony, prev.length ? prev : undefined);
    });
  }, [harmony]);

  // Initial generation
  useEffect(() => {
    generateColors();
  }, [harmony]); 

  // Spacebar listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generateColors();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateColors]);

  const toggleLock = (index: number) => {
    setColors(prev => {
      const newColors = [...prev];
      newColors[index] = { ...newColors[index], locked: !newColors[index].locked };
      return newColors;
    });
  };

  const copyToClipboard = async (hex: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const harmonies: { value: PaletteHarmony; labelKey: string }[] = [
    { value: 'analogous', labelKey: 'analogous' },
    { value: 'complementary', labelKey: 'complementary' },
    { value: 'monochromatic', labelKey: 'monochromatic' },
    { value: 'warm', labelKey: 'warm' },
    { value: 'cool', labelKey: 'cool' },
    { value: 'pastel', labelKey: 'pastel' },
    { value: 'neon', labelKey: 'neon' },
  ];

  return (
    <div className="flex flex-col flex-1 h-full animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={generateColors}
            className="group flex items-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-black text-white rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-gray-900/20 active:scale-95 cursor-pointer"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-bold tracking-wide">{t('generateColors')}</span>
          </button>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 font-medium">
            <span>{t('orPress')}</span>
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-sm font-mono text-xs text-gray-500">Space</kbd>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
          <Settings2 size={18} className="text-brand-primary" />
          <select
            value={harmony}
            onChange={(e) => setHarmony(e.target.value as PaletteHarmony)}
            className="bg-transparent border-none outline-none text-sm font-bold text-gray-700 cursor-pointer focus:ring-0 appearance-none min-w-[120px]"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {harmonies.map(h => (
              <option key={h.value} value={h.value} className="font-medium text-gray-700">
                {t(h.labelKey as any)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 w-full gap-2 lg:gap-4">
        {colors.map((color, index) => {
          const hsl = hexToHsl(color.hex);
          const isLight = hsl.l > 70;
          const textColor = isLight ? 'text-gray-800' : 'text-white';
          
          return (
            <div
              key={index}
              className="group relative flex-1 flex lg:flex-col items-center justify-between lg:justify-end p-4 lg:p-8 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] min-h-[100px] lg:min-h-0 rounded-2xl lg:rounded-[2rem] hover:flex-[1.5] cursor-pointer shadow-sm hover:shadow-md"
              style={{ backgroundColor: color.hex }}
              onClick={(e) => {
                // Ignore click if clicking the lock icon so they don't both happen
                if ((e.target as HTMLElement).closest('button')) return;
                copyToClipboard(color.hex, index);
              }}
            >
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-opacity duration-300 z-10 rounded-2xl lg:rounded-[2rem] ${
                  copiedIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-xl flex items-center gap-2 text-[13px] transform scale-100 animate-in zoom-in duration-200">
                  <Check size={16} className="text-green-500" />
                  {t('copied')}
                </div>
              </div>

              <div className={`flex lg:flex-col items-center gap-4 lg:gap-6 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full lg:w-auto z-0 ${textColor}`}>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLock(index);
                  }}
                  className="p-3 rounded-full hover:bg-black/10 transition-colors backdrop-blur-sm"
                >
                  {color.locked ? <Lock size={22} /> : <Unlock size={22} className="opacity-70" />}
                </button>

                <div className={`flex-1 lg:flex-none ${language === 'ar' ? 'text-right' : 'text-left'} lg:text-center`}>
                  <h3 className={`font-bold text-lg lg:text-3xl tracking-wider mb-2 flex items-center ${language === 'ar' ? 'justify-end lg:justify-center' : 'justify-start lg:justify-center'}`}>
                    {color.hex.toUpperCase()}
                  </h3>
                  <p className="text-sm opacity-80 font-medium line-clamp-1">{language === 'ar' ? color.name.split(' / ')[0] : color.name.split(' / ')[1]}</p>
                  <p className="text-xs opacity-60 font-mono line-clamp-1 mt-1">{language === 'ar' ? color.name.split(' / ')[1] : color.name.split(' / ')[0]}</p>
                </div>
                
                <div className="p-3 rounded-full hover:bg-black/10 transition-colors lg:hidden inline-block backdrop-blur-sm">
                  <Copy size={20} />
                </div>
              </div>

              <div
                className={`hidden lg:flex mt-6 p-3 rounded-full hover:bg-black/10 transition-colors ${textColor} opacity-0 group-hover:opacity-100 backdrop-blur-sm`}
              >
                <Copy size={22} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
