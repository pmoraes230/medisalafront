/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authApi } from '@/features/auth/services/authApi';

export const useAuthInit = () => {
  const { isLoggedIn, isLoading, login } = useAuth();
  const setAuth = useAuth.setState;

  useEffect(() => {
    // Só roda uma vez, quando o app inicia
    if (isLoading) return;

    const initAuth = async () => {
      try {
        const response = await authApi.checkAuth();
        if (response.isLoggedIn) {
          setAuth({
            isLoggedIn: true,
            user: response.usuario,
            isLoading: false,
          });
        } else {
          setAuth({ isLoading: false });
        }
      } catch (err) {
        // Se falhar (offline, backend down), mantém o que tem no localStorage
        setAuth({ isLoading: false });
      }
    };

    initAuth();
  }, []);
};