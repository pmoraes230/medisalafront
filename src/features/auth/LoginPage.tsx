import { MobileBlock } from './components/MobileBlock';
import { Clock } from './components/Clock';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCard } from './components/loginCard';

import './style/authstyle.css';

export const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <>
      <MobileBlock />

      {/* Fundo desfocado */}
      <div className="position-fixed top-0 start-0 end-0 bottom-0 overflow-hidden">
        <div
          className="position-absolute top-0 start-0 end-0 bottom-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/img/image.jpg)',
            filter: 'blur(12px)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            zIndex: -1
          }}
        />
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black opacity-50" />
      </div>

      {/* Relógio + Bandeira */}
      <div className="position-fixed top-3 start-3 z-3 bg-black bg-opacity-50 backdrop-blur px-3 py-2 rounded-pill mg">
        <Clock />
      </div>

      {/* Card centralizado */}
      <div className="d-flex align-items-center justify-content-center min-vh-100 px-3">
        <LoginCard />
      </div>
    </>
  );
};