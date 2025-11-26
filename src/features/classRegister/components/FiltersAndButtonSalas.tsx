import { useState } from "react";

interface Props {
    onSearch: (term: string) => void;
    onStatusFilter: (status: string) => void;
    onAddSala: () => void;
}

export default function FiltersAndButtonSalas({ onSearch, onStatusFilter, onAddSala }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    return (
        <div className="filters">
            <input type="text"
                className="search-input"
                id="searchInput"
                name="searchInput"
                placeholder="Buscar por nome da sala..."
                value={searchTerm}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    onSearch(value);
                }}
            />

            <select
                name="selectFilter"
                id="selectFilter"
                className="select-filter"
                value={statusFilter}
                onChange={(e) => {
                    const value = e.target.value;
                    setStatusFilter(value)
                    onStatusFilter(value)
                }}
            >
                <option value="">Todos os Status</option>
                <option value="Livre">Livre</option>
                <option value="Reservado">Reservado</option>
                <option value="Manutenção">Manutenção</option>A
            </select>

            <button className="btn-add" onClick={onAddSala}>
                <i className="fas fa-plus"></i> Adicionar Sala
            </button>
        </div>
    )
}