/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reserva } from '../types/reserva';
import { useUsers } from '@/features/users/hooks/useUsers';
import { useSalas } from '@/features/classRegister/hooks/useSalas';

interface Props {
    reservas: Reserva[];
    onCancel: (id: number) => void;
}

export default function ReservasTable({ reservas, onCancel }: Props) {
    const { salas } = useSalas();
    // Simulação de usuário logado (ou use contexto real)
    const usuarios = [{ id_usuario: 1, nome_usuario: 'Admin' }];
    const currentUser = usuarios[0];

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Sala</th>
                        <th>Usuário</th>
                        <th>Insumos</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                                Nenhuma reserva realizada ainda.
                            </td>
                        </tr>
                    ) : (
                        reservas.map((reserva) => {
                            const sala = salas.find(s => s.id_sala === reserva.id_sala);
                            const usuario = usuarios.find(u => u.id_usuario === reserva.id_usuario) || { nome_usuario: 'Desconhecido' };

                            const insumosText = reserva.insumos.length > 0
                                ? reserva.insumos.map(i => `${i.quantidade_utilizada}`).join(', ')
                                : 'Nenhum';

                            const dataFormatada = new Date(reserva.data_reserva).toLocaleDateString('pt-BR');

                            return (
                                <tr key={reserva.id_reserva}>
                                    <td>
                                        {dataFormatada}<br />
                                        <small>{reserva.hora_inicio_reserva} - {reserva.hora_termino_reserva}</small>
                                    </td>
                                    <td><strong>{sala?.nome_sala || 'Sala não encontrada'}</strong></td>
                                    <td>{usuario.nome_usuario}</td>
                                    <td><small>{insumosText}</small></td>
                                    <td>
                                        <span className="badge badge-reservado">Reservado</span>
                                    </td>
                                    <td className="actions">
                                        <button
                                            className="action-btn"
                                            onClick={() => onCancel(reserva.id_reserva)}
                                            title="Cancelar reserva"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}