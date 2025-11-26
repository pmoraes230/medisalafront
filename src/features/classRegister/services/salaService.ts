import { Sala } from "../types/salas";

const STORAGE_KEY = 'salas';

export const salaService = {
    getAll: (): Sala[] => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data): [];
    },

    add: (sala: Omit<Sala, 'id_sala'>): Sala => {
        const salas = salaService.getAll();
        const novaSala: Sala = {
            ...sala,
            id_sala: Date.now()
        };
        salas.push(novaSala);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(salas));
        return novaSala;
    },

    delete: (id: number): void => {
        const salas = salaService.getAll().filter(s => s.id_sala !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(salas))
    }
}