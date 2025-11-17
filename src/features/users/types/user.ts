export type Perfil = 1 | 2 | 3;

export interface User {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  senha_usuario?: string; // só no cadastro
  CPF_usuario: string;
  id_perfil: Perfil;
  foto_usuario?: string;
  status: "ativo" | "inativo";
  data_cadastro: string;
}

export interface UserDraft {
  nome_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  CPF_usuario: string;
  id_perfil: string;
  foto_usuario?: string;
}