import ModalOverlay from '@/components/ui/ModalOverlay';

interface Sala {
  id_sala: number;
  nome_sala: string;
  capacidade_sala: number;
  status_sala: string;
}

interface DeleteSalaModalProps {
  isOpen: boolean;
  onClose: () => void;
  sala: Sala | null;
  onConfirm: () => void;
}

export default function DeleteSalaModal({ isOpen, onClose, sala, onConfirm }: DeleteSalaModalProps) {
  if (!sala) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="modal_default" style={{ maxWidth: '500px' }}>
        <div className="modal_header">
          <button className="btn_close" onClick={onClose}>×</button>
          <div className="modal_icon danger">
            <i className="fas fa-trash-alt"></i>
          </div>
          <div className="modal_title">Excluir Sala</div>
        </div>

        <div className="modal_body">
          <p style={{ marginBottom: '1.5rem', color: "var(--text-light)" }}>Tem certeza que deseja excluir a sala abaixo?</p>
          <div
            id="delete-sala-preview"
            style={{
              padding: '1rem',
              background: '#fef2f2',
              borderRadius: '8px',
              margin: '1rem 0',
              color: '#991b1b',
            }}
          >
            <strong>{sala.nome_sala}</strong>
            <br />
            <small>
              Capacidade: {sala.capacidade_sala} pessoas • Status: {sala.status_sala}
            </small>
          </div>
        </div>

        <div className="modal_footer">
          <button className="btn-modal cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-modal"
            style={{ background: 'var(--danger)' }}
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}