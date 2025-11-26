import { useState, useEffect, useRef } from 'react';
import { Insumo } from '../types/insumo';

interface Props {
    insumos: Insumo[];
    onDelete: (id: number) => void;
    onEdit?: (id: number) => void;
}

export default function InsumosTable({ insumos, onDelete, onEdit = () => { } }: Props) {
    const [menuAberto, setMenuAberto] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuAberto) return;

        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuAberto(null);
            }
        };

        const timer = setTimeout(() => document.addEventListener('click', handleClick), 0);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleClick);
        };
    }, [menuAberto]);

    const toggleMenu = (id: number) => {
        setMenuAberto(prev => (prev === id ? null : id));
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Insumo</th>
                        <th>Especificação</th>
                        <th>Unidade</th>
                        <th>Estoque</th>
                        <th>Validade</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {insumos.map((insumo) => {
                        const hoje = new Date();
                        const validade = new Date(insumo.validade_insumo);
                        const vencido = validade < hoje;
                        const estoqueNum = parseFloat(insumo.quantidade_estoq_insumo);
                        const baixo = estoqueNum < 5;

                        const statusText = vencido ? 'Vencido' : baixo ? 'Baixo' : 'Normal';
                        const statusClass = vencido ? 'status-vencido' : baixo ? 'status-baixo' : 'status-active';

                        return (
                            <tr key={insumo.id_insumos}>
                                <td><strong>{insumo.nome_insumo}</strong></td>
                                <td><small>{insumo.especificacao_tec_insumo || '-'}</small></td>
                                <td>
                                    <span className={`badge badge-${insumo.unidade_medida_insumo.toLowerCase()}`}>
                                        {insumo.unidade_medida_insumo}
                                    </span>
                                </td>
                                <td><strong>{estoqueNum}</strong></td>
                                <td className={vencido ? 'text-danger' : ''}>
                                    {validade.toLocaleDateString('pt-BR')}
                                </td>
                                <td><span className={statusClass}>{statusText}</span></td>
                                <td className="actions">
                                    <button
                                        className="action-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMenu(insumo.id_insumos);
                                        }}
                                    >
                                        <i className="fas fa-ellipsis-h"></i>
                                    </button>

                                    {menuAberto === insumo.id_insumos && (
                                        <div className="action-menu show" ref={menuRef} onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => { onEdit(insumo.id_insumos); setMenuAberto(null); }}>
                                                <i className="fas fa-edit"></i> Editar
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={() => { onDelete(insumo.id_insumos); setMenuAberto(null); }}
                                            >
                                                <i className="fas fa-trash-alt"></i> Excluir
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}