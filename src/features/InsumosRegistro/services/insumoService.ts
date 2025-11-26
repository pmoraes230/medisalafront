import { Insumo } from '../types/insumo';

const KEY = 'insumos';

export const insumoService = {
  getAll: (): Insumo[] => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  },

  add: (insumo: Omit<Insumo, 'id_insumos'>): Insumo => {
    const insumos = insumoService.getAll();
    const novo: Insumo = {
      ...insumo,
      id_insumos: Date.now(),
      quantidade_estoq_insumo: Number(insumo.quantidade_estoq_insumo).toFixed(3),
    };
    insumos.push(novo);
    localStorage.setItem(KEY, JSON.stringify(insumos));
    return novo;
  },

  delete: (id: number) => {
    const insumos = insumoService.getAll().filter(i => i.id_insumos !== id);
    localStorage.setItem(KEY, JSON.stringify(insumos));
  },
};