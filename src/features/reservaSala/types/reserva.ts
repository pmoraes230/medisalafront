export interface ReservaInsumo {
  id_insumos: number;
  quantidade_utilizada: number;
}

export interface Reserva {
  id_reserva: number;
  data_reserva: string;        // YYYY-MM-DD
  hora_inicio_reserva: string; // HH:mm
  hora_termino_reserva: string;
  id_sala: number;
  id_usuario: number;
  observacao_reserva?: string;
  insumos: ReservaInsumo[];
}