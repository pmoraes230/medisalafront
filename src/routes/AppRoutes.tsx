import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { UsuariosPage } from '../features/users/UsuariosPage';
import { RegisterRoom } from '@/features/classRegister/SalasPage';
import { InsumosPage } from '@/features/InsumosRegistro/pageInsumo';
import { ReservaPage } from '@/features/reservaSala/reservaPage';
import ProfilePage from '@/features/profilePage/ProfilePage';
import { GuestRoute } from './GuestRoute';

export const AppRoutes = () => (
  <Routes>
    {/* Páginas que só podem ser vistas se NÃO estiver logado */}
    <Route
      path="/"
      element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      }
    />
    <Route
      path="/login"
      element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/usuarios"
      element={
        <ProtectedRoute>
          <UsuariosPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/salas"
      element={
        <ProtectedRoute>
          <RegisterRoom />
        </ProtectedRoute>
      }
    />
    <Route
      path="/insumos"
      element={
        <ProtectedRoute>
          <InsumosPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reservas"
      element={
        <ProtectedRoute>
          <ReservaPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/perfil"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
  </Routes>
);