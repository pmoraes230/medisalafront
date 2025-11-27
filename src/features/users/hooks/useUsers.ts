import { useState, useEffect } from 'react';
import { Usuario } from '../types/user';
import { usuarioService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    setLoading(true);
    setError(null)
    try {
      const data = await usuarioService.getAll();
      setUsers(data);
    } catch (err) {
      setError("Error ao carregar usuarios");
      console.error(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async (formData: FormData) => {
    try {
      const res = await usuarioService.create(formData);
      if (res.success) {
        loadUsers();
        return res
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      setError("Erro ao adicionar usuário");
      console.error(err)
      throw err
    }
  };

  const toggleStatus = (id: number) => { 
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id_usuario === id
          ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' } 
          : user 
      )
    );
  };

  const removeUser = async (id: number) => { // Ajustado: assíncrono
    try {
      await usuarioService.delete(id); // Assumindo que existe esse método no service
      loadUsers();
    } catch (err) {
      setError('Erro ao remover usuário.');
      console.error(err);
    }
  };
  return {
    users,
    loading,
    error, // Novo: retorna erro para exibir no UI
    addUser,
    toggleStatus,
    removeUser,
    refresh: loadUsers
  };
};