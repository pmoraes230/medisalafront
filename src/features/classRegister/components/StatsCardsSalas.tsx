import { useSalas } from "../hooks/useSalas";

export default function StateCardsSalas() {
  const { salas } = useSalas();

  const total = salas.length;
  const capacidadeTotal = salas.reduce((acc, sala) => acc + sala.capacidade_sala, 0);
  const livres = salas.filter(s => s.status_sala === 'Livre').length;
  const reservado = salas.filter(s => s.status_sala === 'Reservado').length;
  const manutencao = salas.filter(s => s.status_sala === 'Manutenção').length;

  return (
    <div className="stats-grid">
      {/* TOTAL DE SALAS */}
      <div className="stat-card">
        <div className="stat-icon stat-total">
          <i className="fas fa-door-open"></i>
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total de Salas</div>
        <div className="stat-subtitle">{capacidadeTotal} lugares</div>
      </div>

      {/* SALAS LIVRES */}
      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#10b981' }}>
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stat-value">{livres}</div>
        <div className="stat-label">Salas Livres</div>
      </div>

      {/* RESERVADAS */}
      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#f59e0b' }}>
          <i className="fas fa-clock"></i>
        </div>
        <div className="stat-value">{reservado}</div>
        <div className="stat-label">Reservadas</div>
      </div>

      {/* EM MANUTENÇÃO */}
      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#6b7280' }}>
          <i className="fas fa-wrench"></i>
        </div>
        <div className="stat-value">{manutencao}</div>
        <div className="stat-label">Em Manutenção</div>
      </div>
    </div>
  )
}