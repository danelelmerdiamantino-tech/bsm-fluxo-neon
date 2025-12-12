import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStore } from '@/store/useStore';
import { formatMZN } from '@/data/initialData';

const COLORS = ['#00FFFF', '#FFA500', '#9B30FF'];

export const RevenueBarChart = () => {
  const { revenues } = useStore();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const data = last7Days.map((date) => {
    const dayRevenues = revenues.filter((r) => r.date === date);
    const total = dayRevenues.reduce((sum, r) => sum + r.amount, 0);
    return {
      day: new Date(date).toLocaleDateString('pt-MZ', { weekday: 'short' }),
      receita: total,
    };
  });

  return (
    <div className="neon-card h-[300px] animate-fade-in" style={{ animationDelay: '400ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
        Receitas Diárias
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 100%, 50%, 0.1)" />
          <XAxis dataKey="day" stroke="hsl(0, 0%, 70%)" fontSize={12} />
          <YAxis stroke="hsl(0, 0%, 70%)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 10%)',
              border: '1px solid hsl(180, 100%, 50%, 0.3)',
              borderRadius: '8px',
              fontFamily: 'Rajdhani',
            }}
            formatter={(value: number) => [formatMZN(value), 'Receita']}
          />
          <Bar
            dataKey="receita"
            fill="url(#colorCyan)"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
          <defs>
            <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#00FFFF" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MonthlyLineChart = () => {
  const { revenues } = useStore();

  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return {
      month: date.toLocaleDateString('pt-MZ', { month: 'short' }),
      year: date.getFullYear(),
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
    };
  });

  const data = months.map(({ month, key }) => {
    const monthRevenues = revenues.filter((r) => r.date.startsWith(key));
    const total = monthRevenues.reduce((sum, r) => sum + r.amount, 0);
    return { month, receita: total };
  });

  return (
    <div className="neon-card h-[300px] animate-fade-in" style={{ animationDelay: '500ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
        Receitas Mensais
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 100%, 50%, 0.1)" />
          <XAxis dataKey="month" stroke="hsl(0, 0%, 70%)" fontSize={12} />
          <YAxis stroke="hsl(0, 0%, 70%)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 10%)',
              border: '1px solid hsl(120, 100%, 55%, 0.3)',
              borderRadius: '8px',
              fontFamily: 'Rajdhani',
            }}
            formatter={(value: number) => [formatMZN(value), 'Receita']}
          />
          <Line
            type="monotone"
            dataKey="receita"
            stroke="#39FF14"
            strokeWidth={3}
            dot={{ fill: '#39FF14', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8, fill: '#39FF14' }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DistributionDonut = () => {
  const { revenues, expenses, salaries } = useStore();

  const totalRevenues = revenues.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSalaries = salaries.reduce((sum, s) => sum + s.amount, 0);

  const data = [
    { name: 'Receitas', value: totalRevenues },
    { name: 'Despesas', value: totalExpenses },
    { name: 'Salários', value: totalSalaries },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    data.push({ name: 'Sem dados', value: 1 });
  }

  return (
    <div className="neon-card h-[300px] animate-fade-in" style={{ animationDelay: '600ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
        Distribuição
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 10%)',
              border: '1px solid hsl(180, 100%, 50%, 0.3)',
              borderRadius: '8px',
              fontFamily: 'Rajdhani',
            }}
            formatter={(value: number) => formatMZN(value)}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 -mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-muted-foreground font-body">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
