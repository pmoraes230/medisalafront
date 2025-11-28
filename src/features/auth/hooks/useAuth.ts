/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

  checkAuth: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,

      checkAuth: async () => {
        const { isLoading } = get();
        if (isLoading) return;
        
        set({ isLoading: true });
        try {
          const response = await authApi.checkAuth();
          
          if (response.isLoggedIn && response.usuario) {
            set({
              user: response.usuario,
              isLoggedIn: true,
              isLoading: false,
            });
            console.log('ZUSTAND: Usuário autenticado via backend');
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.log('ZUSTAND: Não autenticado');
          set({ 
            user: null, 
            isLoggedIn: false, 
            isLoading: false 
          });
        }
      },

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
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);