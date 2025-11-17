// src/services/userService.ts
import { User, UserDraft } from '../types/user';
import { Perfil } from '../types/user';

const STORAGE_KEY = 'usuarios';

export const userService = {
  getAll: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  create: (draft: UserDraft, fotoBase64?: string): User => {
    const users = userService.getAll();
    const newUser: User = {
      id_usuario: Date.now(),
      nome_usuario: draft.nome_usuario,
      email_usuario: draft.email_usuario,
      senha_usuario: btoa(draft.senha_usuario), // simples, só para não deixar em texto puro
      CPF_usuario: draft.CPF_usuario,
      id_perfil: Number(draft.id_perfil) as Perfil,
      foto_usuario: fotoBase64,
      status: 'ativo',
      data_cadastro: new Date().toLocaleDateString('pt-BR')
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return newUser;
  },

  updateStatus: (id: number, status: 'ativo' | 'inativo') => {
    const users = userService.getAll();
    const index = users.findIndex(u => u.id_usuario === id);
    if (index !== -1) {
      users[index].status = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  },

  delete: (id: number) => {
    const users = userService.getAll().filter(u => u.id_usuario !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
};