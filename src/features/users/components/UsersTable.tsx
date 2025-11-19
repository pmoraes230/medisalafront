import { useState } from 'react';

interface User {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  id_perfil: number;
  status: 'ativo' | 'inativo';
  data_cadastro: string;
  foto_usuario?: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleStatus: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export default function UsersTable({ users, onEdit, onToggleStatus, onDelete }: UsersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const perfis = { 1: 'Administrador', 2: 'Professor' };
  const badgeClasses = {
    1: 'badge-admin',
    2: 'badge-teacher',
  };

  const toggleMenu = (userId: number) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  // Fecha menu ao clicar fora
  const handleClickOutside = () => setOpenMenuId(null);

  return (
    <div className="table-container" onClick={handleClickOutside}>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const inicial = user.nome_usuario
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase();

            const isInactive = user.status === 'inativo';

            return (
              <tr key={user.id_usuario} style={{ opacity: isInactive ? 0.6 : 1 }}>
                {/* Coluna com avatar + nome */}
                <td className="user-cell">
                  {user.foto_usuario ? (
                    <img
                      src={user.foto_usuario}
                      alt={user.nome_usuario}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div className="user-avatar-small">{inicial}</div>
                  )}
                  <div>
                    <div className="user-name">{user.nome_usuario}</div>
                    <div className="user-email">{user.email_usuario}</div>
                  </div>
                </td>

                {/* Email */}
                <td>{user.email_usuario}</td>

                {/* Perfil */}
                <td>
                  <span className={`badge ${badgeClasses[user.id_perfil as 1 | 2 ]}`}>
                    {perfis[user.id_perfil]}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span className={isInactive ? 'status-inactive' : 'status-active'}>
                    {isInactive ? 'Inativo' : 'Ativo'}
                  </span>
                </td>

                {/* Data de cadastro */}
                <td className="date">{user.data_cadastro}</td>

                {/* Ações */}
                <td className="actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="action-btn"
                    onClick={() => toggleMenu(user.id_usuario)}
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </button>

                  {/* Menu de ações */}
                  <div
                    className={`action-menu ${openMenuId === user.id_usuario ? 'show' : ''}`}
                    id={`menu-${user.id_usuario}`}
                  >
                    <button onClick={() => onEdit(user)}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button
                      onClick={() => onToggleStatus(user.id_usuario)}
                      className={isInactive ? 'reactivate' : 'deactivate'}
                    >
                      <i className={`fas fa-${isInactive ? 'check' : 'ban'}`}></i>
                      {isInactive ? 'Reativar' : 'Desativar'}
                    </button>
                    <button onClick={() => onDelete(user.id_usuario)} className="delete">
                      <i className="fas fa-trash-alt"></i> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}