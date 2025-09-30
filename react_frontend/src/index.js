import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FavoritesProvider } from './state/FavoritesContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  const el = document.createElement('div');
  el.id = 'root';
  document.body.appendChild(el);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);
