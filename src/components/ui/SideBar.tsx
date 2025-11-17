// src/features/dashboard/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/dashboard', icon: 'home', label: 'Dashboard' },
    { to: '/reservas', icon: 'calendar-plus', label: 'Agendar Salas' },
    { to: '/salas', icon: 'door-open', label: 'Cadastrar salas' },
    { to: '/insumos', icon: 'box', label: 'Insumos' },
    { to: '/usuarios', icon: 'users', label: 'Usuários' },
    { to: '/relatorio', icon: 'chart-line', label: 'Relatório' },
] as const;

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="logo">
                Gest<span>Sala</span>
            </div>

            {/* Navegação */}
            <nav>
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`.trim()
                        }
                        end
                    >
                        <i className={`fas fa-${item.icon}`}></i>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};