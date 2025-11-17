export const Chart = () => {
    const bars = [
        { label: 'Gases', value: 80, height: '60%' },
        { label: 'Águas', value: 180, height: '90%' },
        { label: 'Aventais', value: 40, height: '40%' },
    ];

    return (
        <div className="card bg-white p-6 rounded-xl shadow-md">
            <h3 className="card-title text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <i className="bi bi-bar-chart"></i> Insumos mês
            </h3>
            <div className="chart-container h-48 flex items-end justify-around gap-4">
                {bars.map(bar => (
                    <div key={bar.label} className="bar bg-violet-400 rounded-t-lg flex flex-col justify-end items-center pb-2 transition hover:bg-violet-600" style={{ height: bar.height }}>
                        <div className="bar-value text-white font-semibold text-sm">{bar.value}</div>
                        <div className="bar-label text-slate-600 text-xs mt-2">{bar.label}</div>
                    </div>
                ))}
            </div>
            <div className="text-right text-xs text-slate-600">
                <span className="text-violet-500">Novembro</span>
            </div>
        </div>
    )
}