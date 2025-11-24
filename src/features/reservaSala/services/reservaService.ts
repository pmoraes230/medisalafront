import { Reserva } from '../types/reserva';
import { insumoService } from './insumoService';

const KEY = 'reservas';

export const reservaService = {
  getAll: (): Reserva[] => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  },

  add: (reserva: Omit<Reserva, 'id_reserva'>): Reserva => {
    const reservas = reservaService.getAll();
    const nova: Reserva = {
      ...reserva,
      id_reserva: Date.now(),
    };
    reservas.push(nova);
    localStorage.setItem(KEY, JSON.stringify(reservas));

    // Atualiza estoque dos insumos
    nova.insumos.forEach(item => {
      const insumo = insumoService.getAll().find(i => i.id_insumos === item.id_insumos);
      if (insumo) {
        insumo.quantidade_estoq_insumo = (
          parseFloat(insumo.quantidade_estoq_insumo) - item.quantidade_utilizada
        ).toFixed(3);
      }
    });
    localStorage.setItem('insumos', JSON.stringify(insumoService.getAll()));

    return nova;
  },

  delete: (id: number) => {
    const reservas = reservaService.getAll().filter(r => r.id_reserva !== id);
    localStorage.setItem(KEY, JSON.stringify(reservas));
  },
};