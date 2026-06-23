import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, Settings2 } from 'lucide-react';
import { popularGradients } from '../utils/colorUtils';
import { useLanguage } from '../context/LanguageContext';

export default function GradientGenerator() {
  const { language, t } = useLanguage();
  const [color1, setColor1] = useState('#12c2e9');
  const [color2, setColor2] = useState('#c471ed');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const randomizeGradient = () => {
    const randomGrad = popularGradients[Math.floor(Math.random() * popularGradients.length)];
    setColor1(randomGrad.color1);
    setColor2(randomGrad.color2);
    setAngle(randomGrad.angle);
  };

  useEffect(() => {
    randomizeGradient();
  }, []);

  const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full gap-8 animate-in fade-in duration-500">
      
      {/* Gradient Preview Area */}
      <div 
        className="flex-1 w-full rounded-[2.5rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-gray-100/50 flex items-center justify-center min-h-[350px] transition-all duration-700 ease-in-out relative overflow-hidden"
        style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }}
      >
        <button
          onClick={randomizeGradient}
          className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'} bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95`}
          title={t('randomGradient')}
        >
          <RefreshCw size={24} />
        </button>
      </div>

      {/* Controls & Output */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col lg:flex-row gap-10">
        
        {/* Controls Section */}
        <div className="flex-[1.2] flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Settings2 size={16} className="text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">{t('gradientSettings')}</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 space-y-3 w-full">
              <label className="text-sm font-semibold text-gray-500">{t('firstColor')}</label>
              <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-2xl border border-gray-100 focus-within:border-brand-primary/30 focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all">
                <input 
                  type="color" 
                  value={color1} 
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0 shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: 'transparent' }}
                />
                <input 
                  type="text" 
                  value={color1.toUpperCase()} 
                  onChange={(e) => setColor1(e.target.value)}
                  className={`bg-transparent border-none w-full text-base font-mono text-gray-700 outline-none px-2 ${language === 'ar' ? 'text-left' : ''}`}
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex-1 space-y-3 w-full">
              <label className="text-sm font-semibold text-gray-500">{t('secondColor')}</label>
              <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-2xl border border-gray-100 focus-within:border-brand-primary/30 focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all">
                <input 
                  type="color" 
                  value={color2} 
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0 shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: 'transparent' }}
                />
                <input 
                  type="text" 
                  value={color2.toUpperCase()} 
                  onChange={(e) => setColor2(e.target.value)}
                  className={`bg-transparent border-none w-full text-base font-mono text-gray-700 outline-none px-2 ${language === 'ar' ? 'text-left' : ''}`}
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <label className="text-sm font-semibold text-gray-700">{t('gradientAngle')}</label>
              <div className={`flex items-center gap-2 ${language === 'en' ? 'flex-row-reverse' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="w-0.5 h-3 bg-brand-primary rounded-full transform -translate-y-1"></div>
                </div>
                <span className="text-base font-bold text-gray-900 font-mono w-12 text-center">{angle}°</span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className={`w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-brand-primary hover:accent-emerald-400 transition-all ${language === 'ar' ? 'direction-rtl' : 'direction-ltr'}`}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col gap-6 justify-center bg-gray-50/30 p-8 rounded-[2rem] border border-gray-100/50">
          <label className="text-sm font-semibold text-gray-500">{t('cssCode')}</label>
          <div className="relative group">
            <pre className="bg-white border border-gray-200 rounded-2xl p-6 text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-sm hover:shadow-md transition-shadow" dir="ltr">
              {cssCode}
            </pre>
            <button
              onClick={copyToClipboard}
              className={`absolute top-1/2 ${language === 'ar' ? 'left-4' : 'right-4'} -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${
                copied 
                  ? 'bg-brand-primary text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] scale-105' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>{t('copied')}</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>{t('copyCode')}</span>
                </>
              )}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
