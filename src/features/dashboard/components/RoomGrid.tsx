import { useDashboardData } from '../hooks/useDashboardData';

export const RoomsGrid = () => {
    const { data, isLoading } = useDashboardData();

    return (
        <div className="card bg-white p-6 rounded-xl shadow-md">
            <h3 className="card-title text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <i className="bi bi-hospital"></i> Salas Disponíveis Hoje
            </h3>
            <div className="rooms-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading
                    ? [...Array(4)].map((_, i) => (
                        <div key={i} className="room-card bg-slate-100 p-4 rounded-lg animate-pulse">
                            <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                        </div>
                    ))
                    : data?.salas.map(sala => (
                        <div key={sala.id} className="room-card bg-slate-50 p-4 rounded-lg flex items-center gap-3 hover:bg-slate-100 transition">
                            <div className="room-icon bg-teal-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
                                <i className="bi bi-door-open"></i>
                            </div>
                            <div>
                                <div className="room-name font-semibold text-slate-800">{sala.name}</div>
                                <div className={`room-status text-sm font-medium ${sala.status === 'disponivel' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {sala.status === 'disponivel' ? 'Disponível' : 'Ocupada'}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};