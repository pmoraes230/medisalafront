/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { authApi, LoginResponse } from "../services/authApi";

interface AuthState {
  user: LoginResponse['usuario'] | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (creds: { identifier: string; password: string }, callbacks?: {
    onSuccess?: () => void;
    onError?: (msg: string) => void;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
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

  logout: () => {
      set({ user: null, isLoggedIn: false });
      localStorage.removeItem('token');
      
      // Força o redirecionamento SEM reload
      // Só funciona se o app estiver montado com <BrowserRouter>
      const navigate = (window as any).navigate as ((to: string) => void) | undefined;
      if (navigate) {
        navigate('/login');
      } else {
        // fallback seguro
        window.location.href = '/login';
      }
    },
}));
