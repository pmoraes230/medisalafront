import { useEffect } from "react";
import { useAuth } from "./features/auth/hooks/useAuth";

export const AuthInitializer = () => {
    const { checkAuth} = useAuth();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return null;
}