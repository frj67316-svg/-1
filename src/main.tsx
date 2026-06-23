import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from 'react-error-boundary';

function fallbackRender({ error }: { error: any }) {
  return (
    <div role="alert" style={{ padding: 20, color: 'red', background: '#fee', zIndex: 9999, position: 'absolute', inset: 0 }}>
      <h2>Something went wrong.</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);
