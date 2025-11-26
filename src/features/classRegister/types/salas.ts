export interface Sala {
    id_sala: number;
    nome_sala: string;
    capacidade_sala: number;
    status_sala: 'Livre' | 'Reservado' | 'Manutenção'
}