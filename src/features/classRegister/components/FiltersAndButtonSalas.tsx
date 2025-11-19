import { useState } from 'react';

interface Props {
    onSearch: (term: string) => void;
    onStatusFilter: (status: string) => void;
    onAddSala: () => void;
}

export default function FiltersAndButtonSalas({ onSearch, onStatusFilter, onAddSala }: Props) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    return (
        <div className="filters">
            <input
                type="text"
                className="search-input"
                placeholder="Buscar por nome da sala..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    onSearch(e.target.value);
                }}
            />
            <select
                className="select-filter"
                value={status}
                onChange={(e) => {
                    setStatus(e.target.value);
                    onStatusFilter(e.target.value);
                }}
            >
                <option value="">Todos os Status</option>
                <option value="Livre">Livre</option>
                <option value="Reservado">Reservado</option>
                <option value="Manutenção">Manutenção</option>
            </select>
            <button className="btn-add" onClick={onAddSala}>
                <i className="fas fa-plus"></i> Adicionar Sala
            </button>
        </div>
    );
}