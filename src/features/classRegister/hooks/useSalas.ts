/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Sala } from '../types/salas';
import { salaService } from '../services/salaService';

export const useSalas = () => {
    const [salas, setSalas] = useState<Sala[]>([]);

    const refresh = () => {
        setSalas(salaService.getAll());
    };

    useEffect(() => {
        refresh();
    }, []);

    const addSala = (sala: Omit<Sala, 'id_sala'>) => {
        salaService.add(sala);
        refresh();
    };

    const removeSala = (id: number) => {
        salaService.delete(id);
        refresh();
    };

    return { salas, addSala, removeSala, refresh };
};