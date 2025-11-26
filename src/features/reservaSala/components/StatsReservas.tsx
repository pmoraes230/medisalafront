import { Reserva } from '../types/reserva';
import { Sala } from '@/features/classRegister/types/salas';

interface Props {
    reservas: Reserva[];
    salas: Sala[];
}

export default function StatsReservas({ reservas, salas }: Props) {
    const hoje = new Date().toISOString().split('T')[0];
    const agora = new Date();
    const em2h = new Date(agora.getTime() + 2 * 60 * 60 * 1000);

    // Reservas hoje
    const reservasHoje = reservas.filter(r => r.data_reserva === hoje).length;

    // Próximas 2 horas
    const proximas2h = reservas.filter(r => {
        const dataHoraInicio = new Date(`${r.data_reserva}T${r.hora_inicio_reserva}:00`);
        return dataHoraInicio > agora && dataHoraInicio <= em2h;
    }).length;

    // Salas livres hoje
    const salasReservadasHoje = new Set(
        reservas
            .filter(r => r.data_reserva === hoje)
            .map(r => r.id_sala)
    );
    const salasLivresHoje = salas.length - salasReservadasHoje.size;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon stat-total">
                    <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-value">{reservasHoje}</div>
                <div className="stat-label">Reservas Hoje</div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-warning">
                    <i className="fas fa-clock"></i>
                </div>
                <div className="stat-value">{proximas2h}</div>
                <div className="stat-label">Próximas 2h</div>
            </div>

            <div className="stat-card">
                <div className="stat-icon stat-success">
                    <i className="fas fa-check"></i>
                </div>
                <div className="stat-value">{salasLivresHoje}</div>
                <div className="stat-label">Salas Livres</div>
            </div>
        </div>
    );
}