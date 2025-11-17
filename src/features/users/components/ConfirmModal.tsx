/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/modals/ConfirmModal.tsx
import ModalWrapper from './ModalWrapper';

interface ConfirmModalProps {
  isOpen: boolean;
  user: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ isOpen, user, onClose, onConfirm }: ConfirmModalProps) {
  if (!user) return null;

  const perfilNome = { 1: 'Administrador', 2: 'Professor', 3: 'Aluno' }[user.id_perfil];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center border-b">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
          <i className="fas fa-user-check"></i>
        </div>
        <h3 className="text-2xl font-bold text-teal-800">Confirmar Cadastro</h3>
      </div>

      <div className="p-6">
        <p className="mb-6">Você está prestes a cadastrar um novo usuário:</p>
        <div className="bg-slate-50 rounded-xl p-5 text-left">
          {user.foto_usuario && (
            <img src={user.foto_usuario} className="w-16 h-16 rounded-full float-left mr-4 object-cover" />
          )}
          <div>
            <strong>Nome:</strong> {user.nome_usuario}<br/>
            <strong>E-mail:</strong> {user.email_usuario}<br/>
            <strong>CPF:</strong> {user.CPF_usuario}<br/>
            <strong>Perfil:</strong> {perfilNome}
          </div>
        </div>
        <p className="mt-6 font-bold">Deseja continuar?</p>
      </div>

      <div className="p-6 border-t flex gap-3 justify-center">
        <button onClick={onClose} className="px-8 py-3 bg-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-300 transition">
          Cancelar
        </button>
        <button onClick={onConfirm} className="px-8 py-3 bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 transition">
          Sim, Cadastrar
        </button>
      </div>
    </ModalWrapper>
  );
}