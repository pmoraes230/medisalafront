import { useState, useRef, useEffect, FC } from "react";
import { useClock } from "@/hooks/useClock";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Definindo as props do componente
interface HeaderProps {
  title?: string;           // opcional
  titleClassName?: string;  // opcional, caso queira personalizar ainda mais a classe
}

export const Header: FC<HeaderProps> = ({ 
  title = "Dashboard", 
  titleClassName = "" 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const time = useClock();
  const { logout } = useAuth();

  // === FECHA AO CLICAR FORA ===
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(prev => !prev);
  };

  return (
    <header className="header bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md flex justify-between items-center mb-6 sticky top-0 z-10">
      {/* Lado esquerdo */}
      <div className="header-left">
        {/* Aqui usamos a prop title */}
        <h1 className={`page-title text-2xl font-semibold text-teal-800 dark:text-teal-400 ${titleClassName}`}>
          {title}
        </h1>
        <div className="live-clock flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
          <i className="bi bi-clock text-emerald-500"></i>
          <span>{time}</span>
          <span className="badge bg-teal-700 text-white px-2 py-0.5 rounded text-xs font-bold bg_primary">
            BR
          </span>
        </div>
      </div>

      {/* User Dropdown (mantido exatamente igual) */}
      <div className="relative" ref={dropdownRef}>
        <div
          className={`
            user-info flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 select-none
            ${dropdownOpen 
              ? "bg-slate-100 dark:bg-slate-800" 
              : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }
          `}
          onClick={toggleDropdown}
        >
          <div className="user-avatar w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
            NU
          </div>

          <div className="user-details text-left hidden sm:block">
            <div className="user-name font-semibold text-slate-800 dark:text-slate-100">
              Name User
            </div>
            <div className="user-role text-xs text-slate-600 dark:text-slate-400">
              Cep Belém
            </div>
          </div>

          <i className={`bi bi-chevron-down text-slate-600 dark:text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}></i>
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu show absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <a
              href="/perfil"
              className="dropdown-item d-flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <i className="fas fa-user-edit text-lg"></i>
              Editar Perfil
            </a>

            <button
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              className="dropdown-item w-full text-left d-flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <i className="fas fa-sign-out-alt text-lg"></i>
              Sair do Sistema
            </button>
          </div>
        )}
      </div>
    </header>
  );
};