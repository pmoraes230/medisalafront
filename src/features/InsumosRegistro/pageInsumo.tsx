import { Sidebar } from '@/components/ui/SideBar';
import { Header } from '@/components/ui/header';
import StatsCardsInsumos from './components/StatsCardsInsumos';
import FiltersInsumos from './components/FiltersInsumos';
import InsumosTable from './components/InsumosTable';
import AddInsumoModal from './components/modals/AddInsumoModal';
import SuccessModal from '@/components/ui/SuccessModal';
import { useUserProfile } from '../profilePage/hooks/useUserProfile';

import { useInsumos } from './hooks/useInsumos';
import { useState, useMemo } from 'react';

import './styles/pageInsumo.css'
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle';

export const InsumosPage = () => {
    const { insumos, addInsumo, removeInsumo } = useInsumos();
    const [search, setSearch] = useState('');
    const [unidade, setUnidade] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const { foto } = useUserProfile()

    const insumosFiltrados = useMemo(() => {
        return insumos.filter(i => {
            const matchSearch = i.nome_insumo.toLowerCase().includes(search.toLowerCase()) ||
                (i.especificacao_tec_insumo?.toLowerCase().includes(search.toLowerCase()));
            const matchUnidade = !unidade || i.unidade_medida_insumo === unidade;
            return matchSearch && matchUnidade;
        });
    }, [insumos, search, unidade]);

    const showSuccessMsg = (msg: string) => {
        setSuccessMsg(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1600);
    };

    return (
        <div className="container">
            <Sidebar />

            <main className="main-content">
                <Header
                    title="Gestão de Insumos"
                    userPhoto={foto}
                    userName="Patrick Nascimento"
                    userRole="Cep Belém"
                />
                <div className="d-flex flex-column gap-6 mb-6">
                    <p style={{ marginBottom: '1.5rem', color: "var(--text-light)" }} className="text-slate-600 mb-6">
                        Gerencie os insumos utilizados nas salas e laboratórios.
                    </p>
                </div>

                <StatsCardsInsumos />

                <FiltersInsumos
                    search={search}
                    setSearch={setSearch}
                    unidade={unidade}
                    setUnidade={setUnidade}
                    onAdd={() => setShowAddModal(true)}
                />

                <InsumosTable insumos={insumosFiltrados} onDelete={removeInsumo} />

                <AddInsumoModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={(insumo) => {
                        addInsumo(insumo);
                        setShowAddModal(false);
                        showSuccessMsg('Insumo cadastrado com sucesso!');
                    }}
                />

                <SuccessModal isOpen={showSuccess} message={successMsg} />
            </main>

            <AccessibilityToggle />
        </div>
    );
};