/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalWrapper from './ModalWrapper';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({ isOpen, user, onClose, onConfirm }: DeleteUserModalProps) {
  if (!user) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center border-b">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3 className="text-2xl font-bold text-red-600">Excluir Usuário</h3>
      </div>

      <div className="p-6">
        <p className="mb-4">Tem certeza que deseja <strong>excluir permanentemente</strong> este usuário?</p>
        <div className="bg-red-50 rounded-xl p-5 text-left">
          {user.foto_usuario ? (
            <img src={user.foto_usuario} className="w-14 h-14 rounded-full float-left mr-4 object-cover" />
          ) : (
            <div className="w-14 h-14 bg-slate-300 rounded-full float-left mr-4 flex items-center justify-center text-xl font-bold text-slate-600">
              {user.nome_usuario.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
            </div>
          )}
          <div>
            <strong className="text-red-800">{user.nome_usuario}</strong><br/>
            <small className="text-red-600">{user.email_usuario}</small>
          </div>
        </div>
        <p className="mt-6 text-red-700 font-bold">Esta ação não pode ser desfeita.</p>
      </div>

      <div className="p-6 border-t flex gap-3 justify-center">
        <button onClick={onClose} className="px-8 py-3 bg-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-300 transition">
          Cancelar
        </button>
        <button onClick={onConfirm} className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition">
          Excluir
        </button>
      </div>
    </ModalWrapper>
  );
}