import { useDashboardData } from "./useDashboardData";

const metrics = [
    { label: 'Salas Disponíveis', icon: 'door-open', color: 'bg-blue-500', key: 'salasDisponiveis' },
    { label: 'Agendamentos Hoje', icon: 'calendar-check', color: 'bg-emerald-500', key: 'agendamentosHoje' },
    { label: 'Insumos em Estoque', icon: 'medkit', color: 'bg-amber-500', key: 'percentInsumos', suffix: '%' },
    { label: 'Usuários Ativos', icon: 'user-check', color: 'bg-violet-500', key: 'usuariosAtivos' },
];

export const MetricsGrid = () => {
    const { data, isLoading } = useDashboardData();

    return (
        <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map(metric => (
                <div key={metric.key} className="metric-card bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:-translate-y-1 transition">
                    <div className={`${metric.color} text-white w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <i className={`bi bi-${metric.icon}`}></i>
                    </div>
                    <div>
                        <div className="metric-value text-3xl font-bold text-teal-800">
                            {isLoading
                                ? '0'
                                : `${data?.[metric.key as keyof typeof data] ?? 0}`
                            }{metric.suffix}
                        </div>
                        <div className="metric-label text-sm text-slate-600">{metric.label}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}