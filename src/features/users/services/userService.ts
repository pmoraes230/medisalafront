/* eslint-disable @typescript-eslint/no-explicit-any */
import { Usuario } from '../types/user';
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true,
});

export interface CreateUsuarioResponse {
  success: boolean;
  message: string;
  usuario?: Usuario;
  errors?: string[];
}

export interface UsuarioError {
  error?: string | string[];
  non_field_errors?: string[];
  CPF_usuario?: string[];
  email_usuario?: string[];
  senha_usuario?: string[];
  id_perfil?: string[];
}

const extractErrorMessage = (errorData: any): string => {
  const errorPaths = [
    'error',
    'non_field_errors[0]',
    'CPF_usuario[0]',
    'email_usuario[0]',
    'senha_usuario[0]',
    'id_perfil[0]',
  ] as const;

  for (const path of errorPaths) {
    const [key, indexStr] = path.split('[');
    const index = indexStr ? parseInt(indexStr.replace(']', '')) : 0;

    if (errorData[key]) {
      const errorArray = Array.isArray(errorData[key]) ? errorData[key] : [errorData[key]];
      const message = errorArray[index] || errorArray[0];
      if (message) return message;
    }
  }

  return typeof errorData === 'string' ? errorData : 'Erro desconhecido'
}

export const usuarioService = {
  create: async (data: FormData): Promise<CreateUsuarioResponse> => {
    try {
      const response = await api.post('/usuarios/', data);
      return {
        success: true,
        message: response.data.message || 'Usuário criado com sucesso!',
        usuario: response.data.usuario || response.data,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError<UsuarioError>;
      const responseData = axiosError.response?.data;

      return {
        success: false,
        message: extractErrorMessage(responseData),
        errors: responseData ? Object.values(responseData).flat() as string[] : [],
      };
    }
  },

  getAll: async (): Promise<Usuario[]> => {
    const response = await api.get('/usuarios/');
    return response.data
  },
  updateStatus: async (id: number, status: string) => {
    await api.patch(`/usuarios/${id}/`, { status });
  },
  delete: async (id: number) => {
    await api.delete(`/usuarios/${id}/`);
  },
}