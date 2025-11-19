import { useSalas } from '../hooks/useSalas';

export default function StatsCardsSalas() {
  const { salas } = useSalas();

  const total = salas.length;
  const capacidadeTotal = salas.reduce((acc, s) => acc + s.capacidade_sala, 0);
  const livres = salas.filter(s => s.status_sala === 'Livre').length;
  const reservadas = salas.filter(s => s.status_sala === 'Reservado').length;
  const manutencao = salas.filter(s => s.status_sala === 'Manutenção').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon stat-total"><i className="fas fa-door-open"></i></div>
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total de Salas</div>
        <div className="stat-subtitle">{capacidadeTotal} lugares</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-success"><i className="fas fa-check-circle"></i></div>
        <div className="stat-value">{livres}</div>
        <div className="stat-label">Salas Livres</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-warning"><i className="fas fa-clock"></i></div>
        <div className="stat-value">{reservadas}</div>
        <div className="stat-label">Reservadas</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-danger"><i className="fas fa-wrench"></i></div>
        <div className="stat-value">{manutencao}</div>
        <div className="stat-label">Em Manutenção</div>
      </div>
    </div>
  );
}