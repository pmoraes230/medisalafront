import { Sidebar } from '@/components/ui/SideBar';
import { Header } from '@/components/ui/header';
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle';

export default function UsuariosPage() {
    

    return (
        <div className="container flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="main-content flex-1 p-6">
                <Header />
                <div className="content-row grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                </div>
            </main>
            <AccessibilityToggle />
        </div>
    );
}