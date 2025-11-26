import type { LoginCredentials } from '../types/LoginCredentials';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  withCredentials: true,
});

export interface LoginResponse {
  sucess: boolean;
  message: string;
  usuario: {
    id_usuario: number;
    nome_usuario: string;
    email_usuario: string;
    cargo_usuario?: string;
    foto_usuario?: string;
  }
}

export const authApi = {
  login: async (creds: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login/', creds);
    return response.data;
  },

  logout: async () => {
    await api.post('/logout/');
  },
};