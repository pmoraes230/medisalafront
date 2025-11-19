/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { Sidebar } from '@/components/ui/SideBar';
import { Header } from '@/components/ui/header';
import StatsCardsSalas from './components/StatsCardsSalas';
import FiltersAndButtonSalas from './components/FiltersAndButtonSalas';
import SalasTable from './components/SalasTable';
import AddSalaModal from './components/modals/AddSalaModal';
import DeleteSalaModal from './components/modals/DeleteSalaModal';
import SuccessModal from './components/modals/SuccessModal';

import { useSalas } from './hooks/useSalas';
import { useState, useEffect } from 'react';

export const SalasPage = () => {
  const { salas, addSala, removeSala, refresh } = useSalas();
  const [filteredSalas, setFilteredSalas] = useState(salas);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [salaToDelete, setSalaToDelete] = useState<any>(null);

  useEffect(() => setFilteredSalas(salas), [salas]);

  const handleSearch = (term: string) => {
    const filtered = salas.filter(s => s.nome_sala.toLowerCase().includes(term.toLowerCase()));
    setFilteredSalas(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (!status) setFilteredSalas(salas);
    else setFilteredSalas(salas.filter(s => s.status_sala === status));
  };

  const closeAll = () => {
    setShowAddModal(false);
    setShowDeleteModal(false);
    setShowSuccess(false);
  };

  const showSuccessMsg = (msg: string) => {
    setSuccessMsg(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1600);
  };

  return (
    <div className="container">
      <Sidebar />

      <main className="main-content">
        <Header title="Gestão de Salas" />

        <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
          Cadastre e gerencie as salas disponíveis para reserva.
        </p>

        <StatsCardsSalas />
        <FiltersAndButtonSalas
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onAddSala={() => setShowAddModal(true)}
        />
        <SalasTable
          salas={filteredSalas}
          onDelete={(id) => {
            const sala = salas.find(s => s.id_sala === id);
            setSalaToDelete(sala);
            setShowDeleteModal(true);
          }}
        />

        <AddSalaModal
          isOpen={showAddModal}
          onClose={closeAll}
          onSave={(sala) => {
            addSala(sala);
            closeAll();
            showSuccessMsg('Sala cadastrada com sucesso!');
          }}
        />

        <DeleteSalaModal
          isOpen={showDeleteModal}
          onClose={closeAll}
          sala={salaToDelete}
          onConfirm={() => {
            removeSala(salaToDelete.id_sala);
            closeAll();
            showSuccessMsg('Sala excluída com sucesso!');
          }}
        />

        <SuccessModal isOpen={showSuccess} message={successMsg} />
      </main>
    </div>
  );
};