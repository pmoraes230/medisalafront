interface StatsCardProps {
  icon: string;
  title: string;
  value: number;
  subtitle: string;
  color: 'blue' | 'yellow' | 'purple';
}

const colors = {
  blue: 'bg-blue-500',
  yellow: 'bg-amber-500',
  purple: 'bg-purple-600'
};

export default function StatsCard({ icon, title, value, subtitle, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 ${colors[color]} rounded-xl flex items-center justify-center text-white text-2xl`}>
          <i className={`fas fa-${icon}`}></i>
        </div>
      </div>
      <div className="text-4xl font-bold text-teal-800">{value}</div>
      <div className="text-lg font-semibold text-slate-700 mt-1">{title}</div>
      <div className="text-sm text-slate-500">{subtitle}</div>
    </div>
  );
}