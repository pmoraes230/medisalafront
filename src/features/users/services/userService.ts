/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api';
import { Usuario } from '../types/user';
import { AxiosError } from 'axios';

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

  return typeof errorData === 'string' ? errorData : 'Erro desconhecido';
};

export const usuarioService = {
  getAll: async (): Promise<Usuario[]> => { 
    const response = await api.get('/usuarios/');
    return response.data;
  },

  // CRIAR
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
      
      console.error('❌ ERRO CRIAR:', responseData);
      
      return {
        success: false,
        message: extractErrorMessage(responseData),
        errors: responseData ? Object.values(responseData).flat() as string[] : [],
      };
    }
  },

  updateStatus: async (id: number, status: string) => {
    console.log(`🔄 STATUS ${id}: ${status}`);
    await api.patch(`/usuarios/${id}/`, { status });
    console.log('✅ STATUS ATUALIZADO!');
  },

  // 🗑️ DELETAR
  delete: async (id: number) => {
    console.log(`🗑️ DELETANDO ${id}...`);
    await api.delete(`/usuarios/${id}/`);
    console.log('✅ USUÁRIO DELETADO!');
  },
};