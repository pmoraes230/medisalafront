import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Modal } from '@/components/ui/Modal';

export const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState<{ show: boolean; title: string; msg: string; type: 'success' | 'error' | 'warning' }>({
    show: false,
    title: '',
    msg: '',
    type: 'success',
  });

  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { identifier, password },
      {
        onSuccess: () => {
          setModal({ show: true, title: 'Sucesso!', msg: 'Login realizado!', type: 'success' });
          setTimeout(() => (window.location.href = '/dashboard'), 1500);
        },
        onError: () => {
          setModal({ show: true, title: 'Erro', msg: 'Senha deve ser "123"', type: 'warning' });
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">Email ou CPF</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="seu@email.com ou 000.000.000-00"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Senha</label>
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-lg btn-light w-100 d-flex align-items-center justify-content-center gap-2">
          {isLoading ? 'Entrando...' : <>Entrar <i className="bi bi-arrow-right"></i></>}
        </button>
      </form>

      <div className="text-center mt-3">
        <a href="#" onClick={() => alert('Fale com o admin.')} className="text-warning text-decoration-none">
          Esqueceu a senha?
        </a>
      </div>

      <Modal
        show={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
        title={modal.title}
        type={modal.type}
      >
        {modal.msg}
      </Modal>
    </>
  );
};