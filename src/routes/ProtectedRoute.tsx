import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth(); // use isLoading se tiver
  const location = useLocation();

  // Opcional: mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <div>Carregando...</div>; // ou um spinner bonitinho
  }

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};