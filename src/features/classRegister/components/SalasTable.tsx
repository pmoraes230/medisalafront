/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Sala } from '../types/salas';

interface Props {
    salas: Sala[];
    onDelete: (id: number) => void;
    onEdit?: (id: number) => void;
}

export default function SalasTable({ salas, onDelete, onEdit = () => { } }: Props) {
    const [menuAberto, setMenuAberto] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuAberto === null) return

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuAberto(null)
            }

            const timer = setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 0)

            return () => {
                clearTimeout(timer);
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [menuAberto])

    const toggleMenu = (id: number) => {
        setMenuAberto(prev => prev === id ? null : id)
    }

    return (
        <div className="table-container">
            <table>
                <thead className='thead_bg'>
                    <tr>
                        <th>Sala</th>
                        <th>Capacidade</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {salas.map((sala) => (
                        <tr key={sala.id_sala}>
                            <td><strong>{sala.nome_sala}</strong></td>
                            <td><i className="fas fa-users"></i> {sala.capacidade_sala}</td>
                            <td>
                                <span className={`badge badge-${sala.status_sala.toLowerCase()}`}>
                                    {sala.status_sala}
                                </span>
                            </td>
                            <td className="actions">
                                {/* Botão de menu */}
                                <button
                                    className="action-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMenu(sala.id_sala);
                                    }}
                                >
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>

                                {/* Menu de ações */}
                                {menuAberto === sala.id_sala && (
                                    <div
                                        className="action-menu show"
                                        ref={menuRef}
                                        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
                                    >
                                        <button
                                            onClick={() => {
                                                onEdit(sala.id_sala);
                                                setMenuAberto(null);
                                            }}
                                        >
                                            <i className="fas fa-edit"></i> Editar
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => {
                                                onDelete(sala.id_sala);
                                                setMenuAberto(null);
                                            }}
                                        >
                                            <i className="fas fa-trash-alt"></i> Excluir
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}