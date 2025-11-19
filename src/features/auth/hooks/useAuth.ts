import { useMutation } from "@tanstack/react-query";
import { storage } from "@/lib/storage";
import { authApi } from "../services/authApi";

export const useAuth = () => {
    const mutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: () => {
            storage.set('isLoggedIn', 'true');
        },
    });

    const logout = () => {
        storage.remove('isLoggedIn');
        window.location.href = '/login';
    }

    const isLoggedIn = storage.get('isLoggedIn') === 'true';

    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
        isLoggedIn,
        logout,
    }
}
