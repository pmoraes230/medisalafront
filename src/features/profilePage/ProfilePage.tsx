import { Header } from "@/components/ui/header";
import PerfilCard from "./components/PerfilCard";
import { useUserProfile } from "./hooks/useUserProfile";
import { Sidebar } from "@/components/ui/SideBar";

import './style/profileStyle.css'

export default function ProfilePage() {
    const { foto } = useUserProfile();

    return (
        <div className="container d-flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="main-content flex-1 p-6">
                <div className="d-flex flex-column gap-6 mb-6">
                    <Header
                        title="Meu Perfil"
                        userPhoto={foto}
                        userName="Name User"
                        userRole="Cep Belém"
                    />

                    <PerfilCard />
                </div>
            </main>
        </div>
    )
}