/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { authApi, CheckAuthResponse } from '@/features/auth/services/authApi';
import { useAuth } from '@/features/auth/hooks/useAuth';  // Ajuste o caminho se necessário
import React from 'react';

interface ApiAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  
  checkAuth: () => Promise<boolean>;
  
  login: (creds: { identifier: string; password: string }) => Promise<boolean>;
  
  logout: () => Promise<void>;
}

export const useApiAuth = create<ApiAuthState>((set, get) => ({
  // Inicialize com o estado persistido do useAuth (se disponível)
  isAuthenticated: false,  // Será atualizado via checkAuth ou login
  isLoading: false,
  user: null,

  checkAuth: async () => {
    const { isLoading } = get();
    if (isLoading) return get().isAuthenticated;

    set({ isLoading: true });
    try {
      const response = await authApi.checkAuth();
      
      if (response.isLoggedIn && response.usuario) {
        set({ 
          isAuthenticated: true, 
          user: response.usuario, 
          isLoading: false 
        });
        console.log('✅ useApiAuth: AUTENTICADO!');
        return true;
      }
      
      set({ isAuthenticated: false, isLoading: false });
      return false;
    } catch (error) {
      console.log('❌ useApiAuth: NÃO AUTENTICADO');
      set({ isAuthenticated: false, isLoading: false });
      return false;
    }
  },

  login: async (creds) => {
    try {
      const response = await authApi.login(creds);
      if (response.success && response.usuario) {
        set({ 
          isAuthenticated: true, 
          user: response.usuario 
        });
        console.log('✅ useApiAuth: LOGIN OK!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ useApiAuth: LOGIN FALHOU');
      return false;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.log('⚠️ Logout falhou, limpando local...');
    } finally {
      set({ isAuthenticated: false, user: null });
    }
  }
}));

export const useSyncedApiAuth = () => {
  const apiAuth = useApiAuth();
  const auth = useAuth();

  // Se useAuth estiver logado, force uma verificação inicial no useApiAuth
  React.useEffect(() => {
    if (auth.isLoggedIn && !apiAuth.isAuthenticated) {
      apiAuth.checkAuth();
    }
  }, [auth.isLoggedIn, apiAuth.isAuthenticated, apiAuth]);

  return apiAuth;
};