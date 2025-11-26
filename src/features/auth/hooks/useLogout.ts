/* eslint-disable @typescript-eslint/no-unused-vars */
// src/hooks/useLogout.ts
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authApi } from '../services/authApi';

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  return async () => {
    try {
      // Tenta destruir a sessão no backend (Django Session)
      await authApi.logout();
    } catch (err) {
      // Se o backend estiver fora ou der erro → não trava o logout!
      console.warn('Logout no backend falhou, continuando localmente...');
    } finally {
      // Sempre limpa o frontend e redireciona (SEM reload!)
      clearAuth();
      navigate('/login', { replace: true });
    }
  };
};