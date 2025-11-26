/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/SideBar";
import ReservaForm from "./components/ReservaForm";
import { useReservas } from "./hooks/useReservas";
import { useSalas } from "../classRegister/hooks/useSalas";
import StatsReservas from "./components/StatsReservas";
import ReservasTable from "./components/ReservasTable";
import { useUserProfile } from "../profilePage/hooks/useUserProfile";

import './styles/reservaSala.css'
import '@/features/users/styles/userPage.css'

export const ReservaPage = () => {
    const { reservas, addReserva, cancelarReserva, refresh } = useReservas();
    const { salas } = useSalas();
    const { foto } = useUserProfile();

    const handleSubmit = (data: any, insumos: any[]) => {
        const novaReserva = {
            ...data,
            id_usuario: 1,
            insumos: insumos.map(i => ({
                id_insumo: i.id_insumo,
                quantidade_utilizada: i.quantidade_utilizada,
            }))
        }
        addReserva(novaReserva);
        alert('Reserva realizada com sucesso!')
        refresh()
    }
    return (
        <div className="container">
            <Sidebar />
            <main className="main-content">
                <Header
                    title="Agendar Salas"
                    userPhoto={foto}
                    userName="Patrick Nascimento"
                    userRole="Cep Belém"
                />
                <div className="d-flex flex-column gap-6 mb-6">
                    <p style={{ marginBottom: '1.5rem', color: "var(--text-light)" }} className="text-slate-600 mb-6">
                        Reserve uma sala e selecione os insumos necessários para sua atividade.
                    </p>
                </div>
                <ReservaForm onSubmit={handleSubmit} onReset={() => window.location.reload()}/>
                <StatsReservas reservas={reservas} salas={salas}/>
                <ReservasTable reservas={reservas} onCancel={cancelarReserva}/>
            </main>
            <AccessibilityToggle />
        </div>
    )
}