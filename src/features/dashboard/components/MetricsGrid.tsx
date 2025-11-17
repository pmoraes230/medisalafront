// src/features/dashboard/components/MetricsGrid.tsx
import { useDashboardData } from '../hooks/useDashboardData';

const metrics = [
  {
    label: 'Salas Disponíveis',
    icon: 'door-open',
    colorClass: 'metric-salas',      // usa a classe do seu CSS
    key: 'salasDisponiveis' as const,
  },
  {
    label: 'Agendamentos Hoje',
    icon: 'calendar-check',
    colorClass: 'metric-agenda',
    key: 'agendamentosHoje' as const,
  },
  {
    label: 'Insumos em Estoque',
    icon: 'medkit',
    colorClass: 'metric-insumos',
    key: 'percentInsumos' as const,
    suffix: '%',
  },
  {
    label: 'Usuários Ativos',
    icon: 'user-check',
    colorClass: 'metric-usuarios',
    key: 'usuariosAtivos' as const,
  },
] as const;

export const MetricsGrid = () => {
  const { data, isLoading } = useDashboardData();

  // Valor seguro com fallback
  const getValue = (key: typeof metrics[number]['key']) => {
    if (isLoading) return 0;
    return data?.[key] ?? 0;
  };

  return (
    <div className="dashboard-grid">
      {metrics.map((metric) => {
        const value = getValue(metric.key);

        return (
          <div key={metric.key} className="metric-card">
            {/* Ícone com a cor exata do seu CSS */}
            <div className={`metric-icon ${metric.colorClass}`}>
              <i className={`fas fa-${metric.icon}`}></i>
            </div>

            <div>
              {/* Valor + sufixo (se existir) */}
              <div className="metric-value">
                {value}
                {'suffix' in metric ? metric.suffix : null}
              </div>

              {/* Label */}
              <div className="metric-label">{metric.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};