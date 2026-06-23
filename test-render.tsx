import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';
import { LanguageProvider } from './src/context/LanguageContext.tsx';

try {
  renderToString(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  console.log('SSR Render Successful');
} catch (e) {
  console.error('SSR Render Error:', e);
}
