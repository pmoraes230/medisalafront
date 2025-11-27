export interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  CPF_usuario: string;
  foto_usuario?: string;
  data_cadastro?: string;
  id_perfil: number;
  nome_perfil?: string; // vem do serializer
  status: string;
}

export interface CreateUsuario {
  nome_usuario: string;
  email_usuario: string;
  CPF_usuario: string;
  senha_usuario: string;
  foto_usuario?: string | null;
  id_perfil: number;
}