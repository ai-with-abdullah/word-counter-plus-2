import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root')!;

// Remove SSR content for SEO crawlers before React renders
// SSR content is hidden and purely for search engine indexing
const ssrContent = document.getElementById('ssr-content');
if (ssrContent) {
  // Keep SSR content in DOM but outside root for SEO
  document.body.appendChild(ssrContent);
}

// Always use createRoot for React rendering
// SSR content is separate and hidden for SEO only
createRoot(rootElement).render(<App />);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
