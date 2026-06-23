import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['ar']) => string;
}

const translations = {
  ar: {
    title: 'HexoSip',
    subtitle: 'أدوات إبداعية للمصممين',
    palettes: 'لوحات الألوان',
    gradients: 'تدرجات CSS',
    generateColors: 'توليد ألوان جديدة',
    orPress: 'أو اضغط',
    copied: 'تم النسخ!',
    analogous: 'متماثل (Analogous)',
    complementary: 'متكامل (Complementary)',
    monochromatic: 'أحادي (Monochromatic)',
    warm: 'دافئ (Warm)',
    cool: 'بارد (Cool)',
    pastel: 'باستيل (Pastel)',
    neon: 'نيون (Neon)',
    gradientSettings: 'إعدادات التدرج',
    firstColor: 'اللون الأول',
    secondColor: 'اللون الثاني',
    gradientAngle: 'زاوية التدرج',
    cssCode: 'كود CSS الجاهز',
    copyCode: 'نسخ الكود',
    randomGradient: 'تدرج عشوائي',
  },
  en: {
    title: 'HexoSip',
    subtitle: 'Creative Tools for Designers',
    palettes: 'Color Palettes',
    gradients: 'CSS Gradients',
    generateColors: 'Generate Colors',
    orPress: 'Or press',
    copied: 'Copied!',
    analogous: 'Analogous',
    complementary: 'Complementary',
    monochromatic: 'Monochromatic',
    warm: 'Warm',
    cool: 'Cool',
    pastel: 'Pastel',
    neon: 'Neon',
    gradientSettings: 'Gradient Settings',
    firstColor: 'First Color',
    secondColor: 'Second Color',
    gradientAngle: 'Gradient Angle',
    cssCode: 'Generated CSS Code',
    copyCode: 'Copy Code',
    randomGradient: 'Random Gradient',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations['ar']) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
