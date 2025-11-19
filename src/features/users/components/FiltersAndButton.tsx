// src/components/FiltersAndButton.tsx
import { useState } from 'react';

interface FiltersAndButtonProps {
  onSearch: (term: string) => void;
  onRoleFilter: (role: string) => void;
  onStatusFilter?: (status: string) => void;
  onAddUser: () => void;
}

export default function FiltersAndButton({
  onSearch,
  onRoleFilter,
  onStatusFilter,
  onAddUser,
}: FiltersAndButtonProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const handleAddClick = () => {
    console.log('Botão "Adicionar Usuário" clicado!'); // ← veja no console
    onAddUser(); // ← aqui que abre o modal
  };

  return (
    <div className="filters">
      {/* Campo de busca */}
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por nome, email ou departamento..."
        value={searchTerm}
        name='teste'
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />

      {/* Filtro por Perfil */}
      <select
        className="select-filter"
        name='teste'
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          onRoleFilter(e.target.value);
        }}
      >
        <option value="">Todos os perfis</option>
        <option value="1">Administrador</option>
        <option value="2">Professor</option>
      </select>

      {/* Filtro por Status */}
      <select
        className="select-filter"
        value={status}
        name='teste'
        onChange={(e) => {
          setStatus(e.target.value);
          onStatusFilter?.(e.target.value);
        }}
      >
        <option value="">Todos os status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>

      {/* Botão Adicionar */}
      <button className="btn-add" onClick={handleAddClick}>
        <i className="fas fa-plus"></i> Adicionar Usuário
      </button>
    </div>
  );
}