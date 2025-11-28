/* eslint-disable react-hooks/exhaustive-deps */
import { useSyncedApiAuth } from '@/hooks/useApiAuth';  // Mude aqui: importe useSyncedApiAuth em vez de useApiAuth
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useSyncedApiAuth();  // Mude aqui: use useSyncedApiAuth em vez de useApiAuth

  // 🔍 VERIFICA na primeira vez
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      checkAuth();
    }
  }, []);

  if (isLoading) return <div>Carregando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};
