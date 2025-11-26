import ModalOverlay from '@/components/ui/ModalOverlay';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (insumo: {
        nome_insumo: string;
        especificacao_tec_insumo?: string;
        unidade_medida_insumo: 'UN' | 'KG' | 'L' | 'M';
        quantidade_estoq_insumo: string;
        validade_insumo: string;
    }) => void;
}

export default function AddInsumoModal({ isOpen, onClose, onSave }: Props) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const insumo = {
            nome_insumo: form.get('nome_insumo') as string,
            especificacao_tec_insumo: (form.get('especificacao_tec_insumo') as string) || undefined,
            unidade_medida_insumo: form.get('unidade_medida_insumo') as 'UN' | 'KG' | 'L' | 'M',
            quantidade_estoq_insumo: form.get('quantidade_estoq_insumo') as string,
            validade_insumo: form.get('validade_insumo') as string,
        };

        if (!insumo.nome_insumo || !insumo.unidade_medida_insumo || !insumo.quantidade_estoq_insumo || !insumo.validade_insumo) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        onSave(insumo);
        e.currentTarget.reset();
    };

    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div className="modal_default" style={{ maxWidth: '600px' }}>
                <div className="modal_header">
                    <button className="btn_close" onClick={onClose}>×</button>
                    <div className="modal_icon" style={{ background: '#f59e0b' }}>
                        <i className="fas fa-box"></i>
                    </div>
                    <div className="modal_title">Adicionar Insumo</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal_body">
                        <div className="form-group">
                            <label>Nome do Insumo *</label>
                            <input type="text" name="nome_insumo" required placeholder="Ex: Papel A4" />
                        </div>

                        <div className="form-group">
                            <label>Especificação Técnica</label>
                            <textarea name="especificacao_tec_insumo" rows={3} placeholder="Ex: 500 folhas, 75g/m²" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Unidade de Medida *</label>
                                <select name="unidade_medida_insumo" required>
                                    <option value="">Selecione...</option>
                                    <option value="UN">UN (Unidade)</option>
                                    <option value="KG">KG (Quilograma)</option>
                                    <option value="L">L (Litro)</option>
                                    <option value="M">M (Metro)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Quantidade em Estoque *</label>
                                <input type="number" name="quantidade_estoq_insumo" required min="0" step="0.001" placeholder="0.000" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Validade *</label>
                            <input type="date" name="validade_insumo" required min={new Date().toISOString().split('T')[0]}/>
                        </div>
                    </div>

                    <div className="modal_footer">
                        <button type="button" className="btn-modal cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-modal">
                            Salvar Insumo
                        </button>
                    </div>
                </form>
            </div>
        </ModalOverlay>
    );
}