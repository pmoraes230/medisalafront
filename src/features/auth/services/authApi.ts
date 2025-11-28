/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/services/api'; 
import type { LoginCredentials } from '../types/LoginCredentials';

export interface LoginResponse {
  success: boolean; 
  message: string;
  usuario: {
    nome_perfil: string;
    id_usuario: number;
    nome_usuario: string;
    email_usuario: string;
    cargo_usuario?: string;
    foto_usuario?: string;
  };
}

export interface CheckAuthResponse {
  isLoggedIn: boolean;
  usuario?: LoginResponse['usuario'];
}

export const authApi = {
  login: async (creds: LoginCredentials): Promise<LoginResponse> => {
    console.log('🔑 LOGIN:', creds.identifier);
    const response = await api.post<LoginResponse>('/login/', creds);  // 👈 MESMA API!
    console.log('✅ LOGIN OK! Cookies:', document.cookie ? 'SIM' : 'NÃO');
    return response.data;
  },

  logout: async (): Promise<void> => {
    console.log('🚪 LOGOUT...');
    try {
      await api.post('/logout/');  // 👈 MESMA API!
    } catch (err) {
      console.warn('⚠️ Logout backend falhou, limpando local...');
    }
  },

  checkAuth: async (): Promise<CheckAuthResponse> => {
    console.log('🔍 CHECK AUTH...');
    const response = await api.get('/check-auth');  // 👈 MESMA API!
    console.log('✅ CHECK AUTH:', response.data);
    return response.data;
  },
};