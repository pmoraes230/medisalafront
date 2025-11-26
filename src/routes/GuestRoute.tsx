// src/routes/GuestRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { ReactNode } from 'react';

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // Enquanto carrega, mostra loading (evita flash)
  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Se já está logado → redireciona pra dashboard (ou pra onde veio)
  if (isLoggedIn) {
    const redirectTo = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  // Se não está logado → permite ver a página (login, etc.)
  return <>{children}</>;
};