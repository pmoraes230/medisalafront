/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import ModalOverlay from '@/components/ui/ModalOverlay';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (draft: any) => void;
}

export default function AddUserModal({ isOpen, onClose, onNext }: AddUserModalProps) {
  const [foto, setFoto] = useState('');
  const [form, setForm] = useState({
    nome_usuario: '',
    email_usuario: '',
    senha_usuario: '',
    CPF_usuario: '',
    id_perfil: '',
  });

  const applyCPFMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Imagem muito grande! Máx. 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (Object.values(form).some(v => !v)) {
      alert('Preencha todos os campos!');
      return;
    }
    onNext({ ...form, foto_usuario: foto || null });
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="modal_default">
        <div className="modal_header">
          <button className="btn_close" onClick={onClose}>×</button>
          <div className="modal_icon" style={{ background: '#3b82f6' }}>
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="modal_title">Adicionar Novo Usuário</div>
        </div>

        <div className="modal_body">
          {/* Foto */}
          <div className="form-group text-center">
            <div className="upload-area" onClick={() => document.getElementById('foto_usuario')?.click()}>
              <div className="upload-preview">
                {foto ? (
                  <img src={foto} alt="Preview" id="preview-img" />
                ) : (
                  <div id="placeholder">
                    <i className="fas fa-camera"></i>
                    <p>Clique para adicionar foto</p>
                  </div>
                )}
              </div>
              <input
                id="foto_usuario"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFile}
              />
            </div>
            <small style={{ color: '#64748b' }}>Máx. 2MB | JPG, PNG</small>
          </div>

          {/* Formulário */}
          <div className="form-group">
            <label htmlFor='name_user' className='fw-bolder form-label'>Nome Completo</label>
            <input
              type="text"
              name='name_user'
              id='name_user'
              placeholder="Ex: Maria Silva"
              onChange={(e) => setForm({ ...form, nome_usuario: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor='email_user' className='fw-bolder form-label'>E-mail</label>
            <input
              type="email"
              name='email_user'
              id='email_user'
              placeholder="Ex: maria@cep.edu.br"
              onChange={(e) => setForm({ ...form, email_usuario: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor='password_user' className='fw-bolder form-label'>Senha</label>
            <input
              type="password"
              name='password_user'
              id='password_user'
              placeholder="Mínimo 6 caracteres"
              onChange={(e) => setForm({ ...form, senha_usuario: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor='cpf_user' className='fw-bolder form-label'>CPF</label>
            <input
              type="text"
              name='cpf_user'
              id='cpf_user'
              placeholder="000.000.000-00"
              value={form.CPF_usuario}
              maxLength={14}
              onChange={(e) => setForm({ ...form, CPF_usuario: applyCPFMask(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label htmlFor='profile_user' className='fw-bolder form-label'>Perfil</label>
            <select
              onChange={(e) => setForm({ ...form, id_perfil: e.target.value })}
              name='profile_user'
              id='profile_user'
            >
              <option value="">Selecione...</option>
              <option value="1">Administrador</option>
              <option value="2">Professor</option>
            </select>
          </div>
        </div>

        <div className="modal_footer">
          <button className="btn-modal cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-modal" onClick={handleSubmit}>Salvar Usuário</button>
        </div>
      </div>
    </ModalOverlay>
  );
}