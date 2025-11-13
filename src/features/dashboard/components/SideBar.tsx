import { NavLink } from "react-router-dom";

const navItems = [
    { to: '/dashboard', icon: 'tachometer-alt', label: 'Dashboard' },
    { to: '/reservas', icon: 'calendar-plus', label: 'Agendar Salas' },
    { to: '/salas', icon: 'door-open', label: 'Cadastrar salas' },
    { to: '/insumos', icon: 'box', label: 'Insumos' },
    { to: '/usuarios', icon: 'users', label: 'Usuários' },
    { to: '/relatorio', icon: 'chart-bar', label: 'Relatório' },
];

export const SideBar = () => {
    return (
        <aside className="sidebar bg-gradient-to-b from-teal-700 to-teal-800 text-white p-6 shadow-lg sticky top-0 h-screen">
            <h3 className="logo text-center mb-8 text-2xl font-bold">
                <div className="logo">Gest<span>Sala</span></div>
            </h3>

            <nav className="nav-menu space-y-2">
                {navItems.map(item => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `nav-link flex items-center gap-3 px-6 py-3 rounded-r-full mr-4 transition-all font-medium ${isActive ? 'bg-orange-500 text-white' : 'text-white/85 hover:bg-white/15'
                                }`
                            }
                        >
                            <i className={`bi bi-${item.icon} w-6`}></i>
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </nav>
        </aside>
    )
}