import { useInsumos } from '../hooks/useInsumos';

export default function StatsCardsInsumos() {
  const { insumos } = useInsumos();

  const total = insumos.length;
  const totalEstoque = insumos.reduce((s, i) => s + parseFloat(i.quantidade_estoq_insumo), 0).toFixed(3);
  const vencidos = insumos.filter(i => new Date(i.validade_insumo) < new Date()).length;
  const baixos = insumos.filter(i => parseFloat(i.quantidade_estoq_insumo) < 5).length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon stat-total"><i className="fas fa-boxes-stacked"></i></div>
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total de Insumos</div>
        <div className="stat-subtitle">{totalEstoque} itens</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-warning"><i className="fas fa-exclamation-triangle"></i></div>
        <div className="stat-value">{baixos}</div>
        <div className="stat-label">Baixo Estoque</div>
        <div className="stat-subtitle">&lt; 5 unidades</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-danger"><i className="fas fa-calendar-times"></i></div>
        <div className="stat-value">{vencidos}</div>
        <div className="stat-label">Vencidos</div>
        <div className="stat-subtitle">Validade expirada</div>
      </div>
    </div>
  );
}