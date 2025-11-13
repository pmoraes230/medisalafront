export interface DashboardData {
    salasDisponiveis: number;
    agendamentosHoje: number;
    percentInsumos: number;
    usuariosAtivos: number;
    salas: Array<{
        id: string;
        name: string;
        status: 'disponivel' | 'ocupada' | 'manutencao';
    }>
}