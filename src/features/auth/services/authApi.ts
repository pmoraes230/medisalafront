/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vite/client" />
import type { LoginCredentials } from '../types/LoginCredentials';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Interceptor global (opcional, mas ajuda muito no debug)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  success: boolean;  // ← corrigido: era "sucess"
  message: string;
  usuario: {
    id_usuario: number;
    nome_usuario: string;
    email_usuario: string;
    cargo_usuario?: string;
    foto_usuario?: string;
  };
}

// Resposta do check-auth/
export interface CheckAuthResponse {
  isLoggedIn: boolean;
  usuario?: LoginResponse['usuario'];
}

export const authApi = {
  login: async (creds: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login/', creds);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/logout/');
    } catch (err) {
      // Mesmo se falhar, o frontend vai limpar o estado
      console.warn('Logout no backend falhou, continuando localmente...');
    }
  },

  checkAuth: async (): Promise<CheckAuthResponse> => {
    try {
      const response = await api.get<CheckAuthResponse>('/check-auth/');
      return response.data;
    } catch (err: any) {
      // Se der erro (rede, backend off, CORS, etc.) → considera deslogado
      if (err.response?.status === 401 || err.response?.status === 403) {
        return { isLoggedIn: false };
      }
      throw err;
    }
  },
};