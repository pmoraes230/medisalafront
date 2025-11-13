import { useState } from "react";
import { useClock } from "../../../hooks/useClock";
import { useAuth } from "../../auth/hooks/useAuth";

export const Header = () => {
    const [ dropdownOpen, setDropdownOpen ] = useState(false);
    const time = useClock();
    const { logout } = useAuth()

    return (
        <header className="header bg-white p-4 rounded-xl shadow-md flex justify-between items-center mb-6 sticky top-0 z-10">
      <div className="header-left">
        <h1 className="page-title text-2xl font-semibold text-teal-800">Dashboard</h1>
        <div className="live-clock flex items-center gap-2 text-sm text-slate-600">
          <i className="bi bi-clock text-emerald-500"></i>
          <span>{time}</span>
          <span className="badge bg-teal-700 text-white px-2 py-0.5 rounded text-xs font-bold">BR</span>
        </div>
      </div>

      <div
        className={`user-info relative flex items-center gap-3 cursor-pointer p-2 rounded-lg transition ${dropdownOpen ? 'bg-slate-100' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="user-avatar w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold">
          NU
        </div>
        <div className="user-details text-left">
          <div className="user-name font-semibold text-slate-800">Name User</div>
          <div className="user-role text-xs text-slate-600">Cep Belém</div>
        </div>
        <i className={`bi bi-chevron-down text-slate-600 transition ${dropdownOpen ? 'rotate-180' : ''}`}></i>

        {dropdownOpen && (
          <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl w-56 z-50">
            <a href="/perfil" className="dropdown-item flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50">
              <i className="bi bi-person-circle"></i> Editar Perfil
            </a>
            <button
              onClick={logout}
              className="dropdown-item w-full text-left flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <i className="bi bi-box-arrow-right"></i> Sair do Sistema
            </button>
          </div>
        )}
      </div>
    </header>
    )
}
