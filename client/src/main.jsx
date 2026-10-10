import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <App />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(16,19,42,0.92)',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
                fontSize: '14px',
              },
            }}
          />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
