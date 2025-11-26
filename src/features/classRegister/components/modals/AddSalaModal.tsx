import ModalOverlay from '@/components/ui/ModalOverlay';

interface AddSalaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sala: { nome_sala: string; capacidade_sala: number; status_sala: string }) => void;
}

export default function AddSalaModal({ isOpen, onClose, onSave }: AddSalaModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome_sala') as string;
    const capacidade = formData.get('capacidade_sala') as string;
    const status = formData.get('status_sala') as string || 'Livre';

    if (!nome.trim() || !capacidade) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    onSave({
      nome_sala: nome.trim(),
      capacidade_sala: Number(capacidade),
      status_sala: status as 'Livre' | 'Reservado' | 'Manutenção',
    });

    e.currentTarget.reset();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="modal_default" style={{ maxWidth: '500px' }}>
        <div className="modal_header">
          <button className="btn_close" onClick={onClose}>×</button>
          <div className="modal_icon" style={{ background: '#10b981' }}>
            <i className="fas fa-door-open"></i>
          </div>
          <div className="modal_title">Adicionar Sala</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal_body">
            <div className="form-group">
              <label htmlFor='nomeSala'>Nome da Sala *</label>
              <input
                type="text"
                id='nomeSala'
                name="nome_sala"
                required
                placeholder="Ex: Sala 101 - Anatomia"
              />
            </div>

            <div className="form-group">
              <label htmlFor='capacidade_sala'>Capacidade (pessoas) *</label>
              <input
                type="number"
                name="capacidade_sala"
                id='capacidade_sala'
                required
                min="1"
                placeholder="30"
              />
            </div>

            <div className="form-group">
              <label htmlFor='status_sala'>Status Inicial</label>
              <select name="status_sala" id='status_sala' defaultValue="Livre">
                <option value="Livre">Livre</option>
                <option value="Reservado">Reservado</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>
          </div>

          <div className="modal_footer">
            <button type="button" className="btn-modal cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-modal">
              Salvar Sala
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}