/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalOverlay from '@/components/ui/ModalOverlay';

interface ConfirmUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onConfirm: () => void;
}

export default function ConfirmUserModal({ isOpen, onClose, user, onConfirm }: ConfirmUserModalProps) {
  if (!user) return null;

  const perfis = { 1: 'Administrador', 2: 'Professor' };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="modal_default" style={{ maxWidth: '500px' }}>
        <div className="modal_header">
          <button className="btn_close" onClick={onClose}>×</button>
          <div className="modal_icon" style={{ background: '#3b82f6' }}>
            <i className="fas fa-user-check"></i>
          </div>
          <div className="modal_title">Confirmar Cadastro</div>
        </div>

        <div className="modal_body">
          <p>Você está prestes a cadastrar um novo usuário:</p>
          <div id="preview-user" style={{ margin: '1rem 0', padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.95rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {user.foto_usuario ? (
                <img src={user.foto_usuario} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e2e8f0', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-user" style={{ color: '#94a3b8', fontSize: '1.5rem' }}></i>
                </div>
              )}
            </div>
            <strong>Nome:</strong> {user.nome_usuario}<br />
            <strong>E-mail:</strong> {user.email_usuario}<br />
            <strong>CPF:</strong> {user.CPF_usuario}<br />
            <strong>Perfil:</strong> {perfis[user.id_perfil]}
          </div>
          <p><strong>Deseja continuar?</strong></p>
        </div>

        <div className="modal_footer">
          <button className="btn-modal cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-modal" onClick={onConfirm}>Sim, Cadastrar</button>
        </div>
      </div>
    </ModalOverlay>
  );
}