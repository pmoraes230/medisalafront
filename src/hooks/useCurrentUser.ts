import { useAuth } from "@/features/auth/hooks/useAuth";

export const useCurrentUser = () => {
    const {user, isLoggedIn} = useAuth();
    return {
        user,
        isLoggedIn,
        nome: user?.nome_usuario || 'Usuário',
        foto: user?.foto_usuario || null,
        cargo: user?.nome_perfil || 'Sem cargo'
    }
}