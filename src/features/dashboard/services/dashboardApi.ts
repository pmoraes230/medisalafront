import type { DashboardData } from "../types/DashboardData";

export const dataDashboardApi = {
    getData: async (): Promise<DashboardData> => {
        await new Promise(r => setTimeout(r, 1000));
        return {
            salasDisponiveis: 12,
            agendamentosHoje: 8,
            percentInsumos: 72,
            usuariosAtivos: 30,
            salas: [
                { id: '1', name: 'Sala 101', status: 'disponivel' },
                { id: '2', name: 'Sala 102', status: 'ocupada' },
                { id: '3', name: 'Sala 103', status: 'manutencao' },
                { id: '4', name: 'Sala 104', status: 'disponivel' },
                { id: '5', name: 'Sala 105', status: 'ocupada' },
            ],
        };
    },
};