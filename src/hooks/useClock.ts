import { useState, useEffect } from "react";

export const useClock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const opts: Intl.DateTimeFormatOptions = {
                timeZone: 'America/Sao_Paulo',
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            const [data, time] = now.toLocaleString("pt-BR", opts).split(', ');
            setTime(`${data} - ${time}`);
        }
        const id = setInterval(updateTime, 1000);
        return () => clearInterval(id)
    }, []);

    return time;
}