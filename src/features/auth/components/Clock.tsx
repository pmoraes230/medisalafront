import { useState, useEffect } from "react";

export const Clock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const opts: Intl.DateTimeFormatOptions = {
                timeZone: 'America/Sao_Paulo',
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            const [date, time] = now.toLocaleString('pt-BR', opts).split(', ');
            setTime(`${date} - ${time}`)
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="d-flex align-items-center gap text-white small">
            <i className="bi bi-clock text-sucess"></i>
            <span>{time}</span>
            <span className="badge bg-primary ms-2">BR</span>
        </div>
    )
};