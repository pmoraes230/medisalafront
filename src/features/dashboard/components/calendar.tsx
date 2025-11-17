// src/features/dashboard/components/Calendar.tsx
import { useMemo } from 'react';

export const Calendar = () => {
  const today = new Date(); // 17 de novembro de 2025
  const year = today.getFullYear();
  const month = today.getMonth();

  // Primeiro dia da semana (0 = domingo)
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDay = today.getDate(); // 17

  const days = useMemo(() => {
    const arr: (number | null)[] = [];

    // Preenche células vazias antes do dia 1
    for (let i = 0; i < firstDayOfWeek; i++) {
      arr.push(null);
    }

    // Adiciona os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(i);
    }

    // Completa até 42 células (6 linhas)
    while (arr.length < 42) {
      arr.push(null);
    }

    return arr;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, firstDayOfWeek, daysInMonth]);

  const monthName = today.toLocaleString('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).replace(/^\w/, c => c.toUpperCase());

  // Dias com reserva (exemplo: 11 e 26)
  const daysWithReserva = [11, 26];

  return (
    <div className="card">
      <div className="card-title">
        <i className="fas fa-calendar-alt"></i> {monthName}
      </div>

      <div className="calendar">
        {/* Cabeçalho da semana */}
        <div className="calendar-header">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Grid do calendário */}
        <div className="calendar-grid">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="calendar-day empty" />;
            }

            const isToday = day === currentDay;
            const hasReserva = daysWithReserva.includes(day);

            return (
              <div
                key={index}
                className={`
                  calendar-day
                  ${isToday ? 'today' : ''}
                  ${hasReserva ? 'has-reserva' : ''}
                `.trim()}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};