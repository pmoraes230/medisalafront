/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Insumo } from '../types/insumo';
import { insumoService } from '../services/insumoService';

export const useInsumos = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);

  const refresh = () => setInsumos(insumoService.getAll());

  useEffect(() => {
    refresh();
  }, []);

  const addInsumo = (insumo: Omit<Insumo, 'id_insumos'>) => {
    insumoService.add(insumo);
    refresh();
  };

  const removeInsumo = (id: number) => {
    insumoService.delete(id);
    refresh();
  };

  return { insumos, addInsumo, removeInsumo, refresh };
};