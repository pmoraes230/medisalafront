/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, LoginResponse } from '../services/authApi';

interface AuthState {
  user: LoginResponse['usuario'] | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  login: (
    creds: { identifier: string; password: string },
    callbacks?: {
      onSuccess?: () => void;
      onError?: (msg: string) => void;
    }
  ) => Promise<void>;

  /** APENAS limpa o estado local – NÃO faz navegação aqui! */
  clearAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,

      login: async (creds, callbacks) => {
        set({ isLoading: true });
        try {
          const data = await authApi.login(creds);
          set({
            user: data.usuario,
            isLoggedIn: true,
            isLoading: false,
          });
          callbacks?.onSuccess?.();
        } catch (err: any) {
          set({ isLoading: false });
          const msg = err.response?.data?.error || 'Erro ao fazer login';
          callbacks?.onError?.(msg);
        }
      },

      clearAuth: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage', // chave no localStorage
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);