import { AccessibilityToggle } from "../../components/ui/AccessibilityToggle";
import { Calendar } from "./components/calendar";
import { Chart } from "./components/chart";
import { Header } from "./components/header";
import { MetricsGrid } from "./components/MetricsGrid";
import { RoomsGrid } from "./components/RoomGrid";
import { Sidebar } from "./components/SideBar";

import './styles/dashboard.css'

export const DashboardPage = () => {
    return (
        <div className="container flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="main-content flex-1 p-6">
                <Header />
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

