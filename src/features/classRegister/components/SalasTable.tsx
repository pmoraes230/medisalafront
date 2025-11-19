import { Sala } from '../types/salas';
import { useState } from 'react';

interface Props {
    salas: Sala[];
    onDelete: (id: number) => void;
}

export default function SalasTable({ salas, onDelete }: Props) {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Sala</th>
                        <th>Capacidade</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {salas.map(sala => (
                        <tr key={sala.id_sala}>
                            <td><strong>{sala.nome_sala}</strong></td>
                            <td><i className="fas fa-users"></i> {sala.capacidade_sala}</td>
                            <td>
                                <span className={`badge badge-${sala.status_sala.toLowerCase()}`}>
                                    {sala.status_sala}
                                </span>
                            </td>
                            <td className="actions" onClick={(e) => e.stopPropagation()}>
                                <button
                                    className="action-btn"
                                    onClick={() => setOpenMenuId(openMenuId === sala.id_sala ? null : sala.id_sala)}
                                >
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                                <div className={`action-menu ${openMenuId === sala.id_sala ? 'show' : ''}`}>
                                    <button onClick={() => alert(`Editar sala ${sala.nome_sala} (em desenvolvimento)`)}>
                                        <i className="fas fa-edit"></i> Editar
                                    </button>
                                    <button onClick={() => onDelete(sala.id_sala)} className="delete">
                                        <i className="fas fa-trash-alt"></i> Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}