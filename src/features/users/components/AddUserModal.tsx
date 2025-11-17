// src/components/modals/AddUserModal.tsx
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

interface UserDraft {
  nome_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  CPF_usuario: string;
  id_perfil: string;
  foto_usuario?: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (user: UserDraft) => void;
}

export default function AddUserModal({ isOpen, onClose, onNext }: AddUserModalProps) {
  const [foto, setFoto] = useState<string>('');
  const [form, setForm] = useState<UserDraft>({
    nome_usuario: '',
    email_usuario: '',
    senha_usuario: '',
    CPF_usuario: '',
    id_perfil: ''
  });

  const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setForm({ ...form, CPF_usuario: v.substring(0, 14) });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Imagem muito grande! Máx. 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (Object.values(form).some(v => !v)) {
      alert('Preencha todos os campos!');
      return;
    }
    onNext({ ...form, foto_usuario: foto || undefined });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center border-b">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
          <i className="fas fa-user-plus"></i>
        </div>
        <h3 className="text-2xl font-bold text-teal-800">Adicionar Novo Usuário</h3>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        {/* Upload Foto */}
        <div className="text-center mb-6">
          <label className="cursor-pointer">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-dashed border-slate-300 hover:border-teal-600 transition">
              {foto ? (
                <img src={foto} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <i className="fas fa-camera text-4xl mb-2"></i>
                  <p className="text-sm">Adicionar foto</p>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
          <small className="text-slate-500 block mt-2">Máx. 2MB | JPG, PNG</small>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome Completo"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
            onChange={(e) => setForm({ ...form, nome_usuario: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
            onChange={(e) => setForm({ ...form, email_usuario: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha (mín. 6 caracteres)"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
            onChange={(e) => setForm({ ...form, senha_usuario: e.target.value })}
          />
          <input
            type="text"
            placeholder="CPF"
            value={form.CPF_usuario}
            maxLength={14}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
            onChange={handleCPF}
          />
          <select
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
            onChange={(e) => setForm({ ...form, id_perfil: e.target.value })}
          >
            <option value="">Selecione o perfil...</option>
            <option value="1">Administrador</option>
            <option value="2">Professor</option>
            <option value="3">Aluno</option>
          </select>
        </div>
      </div>

      <div className="p-6 border-t flex gap-3 justify-center">
        <button onClick={onClose} className="px-8 py-3 bg-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-300 transition">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="px-8 py-3 bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 transition">
          Avançar
        </button>
      </div>
    </ModalWrapper>
  );
}