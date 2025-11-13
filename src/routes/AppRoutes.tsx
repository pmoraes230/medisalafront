import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../features/auth/LoginPage';

// Dashboard temporário
const Dashboard = () => (
  <div className="p-5 text-center">
    <h1>Bem-vindo ao Dashboard!</h1>
    <button
        className="btn btn-danger"
        onClick={() => {
            localStorage.removeItem('isLoggedIn');
            window.location.reload();
        }}
    >
        Sair
    </button>
  </div>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);