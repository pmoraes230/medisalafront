// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'; // ou use sonner se preferir
import { AppRoutes } from './routes/AppRoutes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/fontawesome-free/css/all.css';

// Seus estilos globais
import './style/global.css';
import './style/bootstrap-override.css';
import './style/sidebar.css';

// Opcional: se usar react-hot-toast (recomendado!)
import 'react-hot-toast';
import { AuthInitializer } from './AuthInitializer';

// Configuração do React Query (com boas práticas 2025)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

// Renderização com tratamento de erro global (EVITA TELA BRANCA!)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInitializer />
        <AppRoutes />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              fontSize: '1rem',
            },
            success: {
              icon: 'Success',
              style: { background: '#10b981' },
            },
            error: {
              icon: 'Error',
              style: { background: '#ef4444' },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);