import { useUsers } from "../hooks/useUsers";

export default function StatsCards() {
  const { users } = useUsers();

  const total = users.length;
  const activate = users.filter(u => u.status !== 'inativo').length;
  const teachers = users.filter(u => u.id_perfil === 2).length;
  const admin = users.filter(u => u.id_perfil === 1).length;

  const teachersPercent = total > 0 ? Math.round((teachers / total) * 100) : 0;
  const adminPercent = total > 0 ? Math.round((admin / total) * 100) : 0;

  const cards = [
    {
      icon: 'fa-users',
      value: total,
      label: 'Total de Usuários',
      subtitle: `${activate} ativos`,
      color: 'bg-primary',        // azul
    },
    {
      icon: 'fa-chalkboard-teacher',
      value: teachers,
      label: 'Professores',
      subtitle: `${teachersPercent}% do total`,
      color: 'stat-teacher',          // amarelo
    },
    {
      icon: 'fa-user-shield',
      value: admin,
      label: 'Administradores',
      subtitle: `${adminPercent}% do total`,
      color: 'bg-purple',           // roxo customizado (vamos criar)
    },
  ];

  return (
    <div className="row g-4 mb-5">
      {cards.map((card, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4">
          <div className="stat-card">
              {/* Ícone pequeno com cor */}
              <div
                className={`stat-icon ${card.color}`}
                style={{ width: '40px', height: '40px', fontSize: '15px' }}
              >
                <i className={`fas ${card.icon}`}></i>
              </div>

              {/* Valor principal */}
              <h2 className="stat-value"
                  style={{
                    color:
                      card.color === 'bg-primary' ? '#0d6efd' :
                      card.color === 'stat-teacher' ? '#ffc107' :
                      '#8b5cf6'
                  }}>
                {card.value}
              </h2>

              {/* Título */}
              <h5 className="stat-label">{card.label}</h5>

              {/* Subtítulo */}
              <p className="stat-subtitle">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}