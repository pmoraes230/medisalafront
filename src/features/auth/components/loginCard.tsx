import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';


export const LoginCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/dashboard';
  
    const handleLoginSuccess = () => {
      navigate(from, { replace: true });
    }
  
    
  return (
    <div className="card_login shadow-lg p-4" style={{ maxWidth: '420px', width: '100%' }}>
      <div className="card-body">
        <h3 className="text-center mb-2 fw-bold">
          <div className="logo">Gest<span>Sala</span></div>
        </h3>
        <p className="text-center text-white-50 small mb-4">Acesse sua conta</p>
        <LoginForm onLoginSuccess={handleLoginSuccess}/>
      </div>
    </div>
  );
};