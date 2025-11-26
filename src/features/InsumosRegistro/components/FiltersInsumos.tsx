import { Dispatch, SetStateAction } from 'react';

interface Props {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    unidade: string;
    setUnidade: Dispatch<SetStateAction<string>>;
    onAdd: () => void;
}

export default function FiltersInsumos({ search, setSearch, unidade, setUnidade, onAdd }: Props) {
    return (
        <div className="filters">
            <input
                type="text"
                className="search-input"
                placeholder="Buscar por nome ou especificação..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                className="select-filter"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
            >
                <option value="">Todas as Unidades</option>
                <option value="UN">UN</option>
                <option value="KG">KG</option>
                <option value="L">L</option>
                <option value="M">M</option>
            </select>

            <button className="btn-add" onClick={onAdd}>
                <i className="fas fa-plus"></i> Adicionar Insumo
            </button>
        </div>
    );
}