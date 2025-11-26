import { AccessibilityToggle } from "@/components/ui/AccessibilityToggle";
import { Calendar } from "./components/calendar";
import { Chart } from "./components/chart";
import { Header } from "@/components/ui/header";
import { MetricsGrid } from "./components/MetricsGrid";
import { RoomsGrid } from "./components/RoomGrid";
import { Sidebar } from "@/components/ui/SideBar";
import { useUserProfile } from "../profilePage/hooks/useUserProfile";

import './styles/dashboard.css'

export const DashboardPage = () => {
    const { foto } = useUserProfile();
    return (
        <div className="container flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="main-content flex-1 p-6">
                <Header
                    userPhoto={foto}
                    userName="Patrick Nascimento"
                    userRole="Cep Belém"
                />
                <MetricsGrid />
                <div className="content-row grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Calendar />
                    <Chart />
                </div>
                <RoomsGrid />
            </main>
            <AccessibilityToggle />
        </div>
    )
}

