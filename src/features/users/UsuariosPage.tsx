/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar } from '@/components/ui/SideBar';
import { Header } from '@/components/ui/header';
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle';
import StatsCards from './components/StatsCard';
import FiltersAndButton from './components/FiltersAndButton';
import UsersTable from './components/UsersTable';

// === MODAIS SEPARADOS ===
import AddUserModal from './components/modals/AddUserModal';
import ConfirmUserModal from './components/modals/ConfirmUserModal';
import DeleteUserModal from './components/modals/DeleteUserModal';
import SuccessModal from './components/modals/SuccessModal';

import { useUsers } from './hooks/useUsers';
import { useState, useEffect } from 'react';

import './styles/userPage.css';

export const UsuariosPage = () => {
  const { users, addUser, toggleStatus, removeUser, refresh } = useUsers();

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [tempUserDraft, setTempUserDraft] = useState<any>(null); // dados temporários do novo usuário

  // Estados dos modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Atualiza lista filtrada sempre que users mudar
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // === FILTROS ===
  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    const filtered = users.filter(u =>
      u.nome_usuario.toLowerCase().includes(lower) ||
      u.email_usuario.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  };

  const handleRoleFilter = (role: string) => {
    if (!role) setFilteredUsers(users);
    else setFilteredUsers(users.filter(u => u.id_perfil === Number(role)));
  };

  const handleStatusFilter = (status: string) => {
    if (!status) setFilteredUsers(users);
    else setFilteredUsers(users.filter(u => u.status === status));
  };

  // === FUNÇÕES DOS MODAIS ===
  const openAddModal = () => setShowAddModal(true);
  const closeAllModals = () => {
    setShowAddModal(false);
    setShowConfirmModal(false);
    setShowDeleteModal(false);
    setShowSuccessModal(false);
    setTempUserDraft(null);
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 1600);
  };

  const handleConfirmAdd = () => {
    if (!tempUserDraft) return;

    // Salva no localStorage (ou API)
    addUser({
      ...tempUserDraft,
      senha_usuario: btoa(tempUserDraft.senha_usuario), // criptografa senha
      data_cadastro: new Date().toLocaleDateString('pt-BR'),
      status: 'ativo',
    });

    closeAllModals();
    showSuccess('Usuário cadastrado com sucesso!');
    refresh();
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    removeUser(userToDelete.id_usuario);
    closeAllModals();
    showSuccess('Usuário excluído com sucesso!');
    refresh();
  };

  return (
    <div className="container d-flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="main-content flex-1 p-6">
        <Header title="Usuarios" />

        <div className="d-flex flex-column gap-6 mb-6">
          <p style={{ marginBottom: '1.5rem', color: "var(--text-light)" }} className="text-slate-600 mb-6">
            Gerencie e visualize todos os usuários cadastrados no sistema.
          </p>

          <StatsCards />

          <FiltersAndButton
            onSearch={handleSearch}
            onRoleFilter={handleRoleFilter}
            onStatusFilter={handleStatusFilter}
            onAddUser={openAddModal}
          />

          <UsersTable
            users={filteredUsers}
            onEdit={(user) => alert(`Editar ${user.nome_usuario} (em desenvolvimento)`)}
            onToggleStatus={(id) => {
              toggleStatus(id);
              refresh();
            }}
            onDelete={(id) => {
              const user = users.find(u => u.id_usuario === id);
              setUserToDelete(user || null);
              setShowDeleteModal(true);
            }}
          />
        </div>
      </main>

      <AccessibilityToggle />

      {/* === TODOS OS MODAIS SEPARADOS === */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={closeAllModals}
        onNext={(draft) => {
          setTempUserDraft(draft);
          setShowAddModal(false);
          setShowConfirmModal(true);
        }}
      />

      <ConfirmUserModal
        isOpen={showConfirmModal}
        onClose={closeAllModals}
        user={tempUserDraft}
        onConfirm={handleConfirmAdd}
      />

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={closeAllModals}
        user={userToDelete}
        onConfirm={handleConfirmDelete}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        message={successMessage}
      />
    </div>
  );
};