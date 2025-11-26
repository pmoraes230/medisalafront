/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Reserva } from "../types/reserva";
import { reservaService } from "../services/reservaService";

export const useReservas = () => {
    const [ reservas, setReservas ] = useState<Reserva[]>([])
    const refresh = () => setReservas(reservaService.getAll())

    useEffect(() => {
        refresh();
    }, []);

    const addReserva = (reserva: Omit<Reserva, 'id_reserva'>) => {
        reservaService.add(reserva);
        refresh();
    }

    const cancelarReserva = (id: number) => {
        reservaService.delete(id);
        refresh();
    }

    return { reservas, addReserva, cancelarReserva, refresh }
}