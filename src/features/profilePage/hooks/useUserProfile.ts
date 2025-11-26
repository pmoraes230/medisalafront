/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export const useUserProfile = () => {
    const [foto, setFoto] = useState<string>('');
    const [hasChanges, setHasChanges] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('userPhoto');
        if (saved) {
            setFoto(saved)
        }
    }, []);

    const updateFoto = (novaFoto: string) => {
        setFoto(novaFoto)
        setHasChanges(true);
    };

    const saveFoto = () => {
        localStorage.setItem('userPhoto', foto)
        setHasChanges(false)
    }

    return { foto, hasChanges, updateFoto, saveFoto }
}