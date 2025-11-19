/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalOverlay from '@/components/ui/ModalOverlay';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onConfirm: () => void;
}

export default function DeleteUserModal({ isOpen, onClose, user, onConfirm }: DeleteUserModalProps) {
  if (!user) return null;

  const perfis = { 1: 'Administrador', 2: 'Professor', 3: 'Aluno' };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="modal" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <button className="btn-close" onClick={onClose}>×</button>
          <div className="modal-icon warning">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="modal-title">Excluir Usuário</div>
        </div>

        <div className="modal-body">
          <p>Tem certeza que deseja <strong>excluir permanentemente</strong> este usuário?</p>
          <div id="delete-preview" style={{ margin: '1rem 0', padding: '1rem', background: '#fef2f2', borderRadius: '8px', color: '#991b1b' }}>
            {user.foto_usuario ? (
              <img src={user.foto_usuario} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', float: 'left', marginRight: '0.75rem' }} />
            ) : (
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e2e8f0', float: 'left', marginRight: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>
                  {user.nome_usuario.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <strong>{user.nome_usuario}</strong><br />
            <small>{user.email_usuario} • {perfis[user.id_perfil]}</small>
          </div>
          <p><strong>Esta ação não pode ser desfeita.</strong></p>
        </div>

        <div className="modal-footer">
          <button className="btn-modal cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-modal" style={{ background: 'var(--danger)' }} onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}