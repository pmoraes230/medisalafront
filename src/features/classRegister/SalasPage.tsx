/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/SideBar";
import StateCardsSalas from "./components/StatsCardsSalas";
import FiltersAndButtonSalas from "./components/FiltersAndButtonSalas";
import SalasTable from "./components/SalasTable";
import { useSalas } from "./hooks/useSalas";
import AddSalaModal from "./components/modals/AddSalaModal";
import DeleteSalaModal from "./components/modals/DeleteSalaModal";
import { useUserProfile } from "../profilePage/hooks/useUserProfile";

import './styles/salas.css'
import { Sala } from "./types/salas";
import SuccessModal from "../../components/ui/SuccessModal";

export const RegisterRoom = () => {
  const { salas, addSala, removeSala, refresh } = useSalas(); // ← addSala vem daqui!

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [salaToDelete, setSalaToDelete] = useState<Sala | null>(null);
  const { foto } = useUserProfile()

  const salasFiltradas = useMemo(() => {
    return salas.filter((sala) => {
      const matchSearch = sala.nome_sala.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = !statusFilter || sala.status_sala === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [salas, searchTerm, statusFilter]);

  return (
    <div className="container flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="main-content flex-1 p-6">
        <Header
                    title="Gestão de Salas"
                    userPhoto={foto}
                    userName="Patrick Nascimento"
                    userRole="Cep Belém"
                />
        <p style={{ marginBottom: '1.5rem', color: "var(--text-light)" }} className="text-slate-600 mb-6">
          Cadastre e gerencie as salas disponíveis para reserva.
        </p>
        <StateCardsSalas />
        <FiltersAndButtonSalas
          onSearch={setSearchTerm}
          onStatusFilter={setStatusFilter}
          onAddSala={() => setShowAddModal(true)}
        />

        <SalasTable
          salas={salasFiltradas}
          onDelete={(id) => {
            const sala = salas.find(s => s.id_sala === id);
            setSalaToDelete(sala || null);
            setShowDeleteModal(true);
          }}
        />

        {/* Modais aqui */}
        <AddSalaModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(novaSala) => {
            addSala({
              nome_sala: novaSala.nome_sala,
              capacidade_sala: novaSala.capacidade_sala,
              status_sala: novaSala.status_sala as 'Livre' | 'Reservado' | 'Manutenção'
            });
            setShowAddModal(false)
          }
          }
        />
        < DeleteSalaModal 
          isOpen={showDeleteModal}
          sala={salaToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (salaToDelete) {
              removeSala(salaToDelete.id_sala);
              setShowDeleteModal(false)
            }
          }}
        />

        {/* <SuccessModal 
          isOpen={showSuccessModal}
          message={SuccessModal}
        /> */}
      </main>
      <AccessibilityToggle />
    </div>
  )
}