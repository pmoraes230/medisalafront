/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    setLoading(true);
    const data = userService.getAll();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = (draft: any, foto?: string) => {
    userService.create(draft, foto);
    loadUsers();
  };

  const toggleStatus = (id: number) => {
    const user = users.find(u => u.id_usuario === id);
    if (user) {
      const newStatus = user.status === 'ativo' ? 'inativo' : 'ativo';
      userService.updateStatus(id, newStatus);
      loadUsers();
    }
  };

  const removeUser = (id: number) => {
    userService.delete(id);
    loadUsers();
  };

  return {
    users,
    loading,
    addUser,
    toggleStatus,
    removeUser,
    refresh: loadUsers
  };
};