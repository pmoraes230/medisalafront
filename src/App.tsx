/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // opcional, mas recomendado
import { Toaster } from 'react-hot-toast'; // ou sonner, ou seu toast preferido

// Fallback bonito para erros não tratados (evita tela branca)
function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-white p-4">
      <div className="text-center">
        <h1 className="display-4 mb-4">Ops! Algo deu errado</h1>
        <p className="mb-4 text-danger">{error.message}</p>
        <button onClick={resetErrorBoundary} className="btn btn-lg btn-light">
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

// Cliente do React Query (opcional, mas quase obrigatório em 2025)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => console.error('Erro capturado pelo ErrorBoundary:', error)}
      onReset={() => window.location.reload()}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />

          {/* Toast global (para mensagens de sucesso/erro) */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}