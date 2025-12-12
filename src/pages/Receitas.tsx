import RevenueForm from '@/components/forms/RevenueForm';
import RevenueTable from '@/components/tables/RevenueTable';
import { useStore } from '@/store/useStore';
import { formatMZN } from '@/data/initialData';
import { TrendingUp } from 'lucide-react';

const Receitas = () => {
  const { revenues } = useStore();

  const today = new Date().toISOString().split('T')[0];
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const dailyTotal = revenues
    .filter((r) => r.date === today)
    .reduce((sum, r) => sum + r.amount, 0);

  const weeklyTotal = revenues
    .filter((r) => new Date(r.date) >= startOfWeek)
    .reduce((sum, r) => sum + r.amount, 0);

  const monthlyTotal = revenues
    .filter((r) => new Date(r.date) >= startOfMonth)
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-wider mb-2">
          RECEITAS
        </h1>
        <p className="text-muted-foreground font-body">
          Gestão de receitas por motorista
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="neon-card animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Hoje</p>
              <p className="font-display text-2xl font-bold text-neon-green">
                {formatMZN(dailyTotal)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-neon-green opacity-50" />
          </div>
        </div>
        <div className="neon-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Esta Semana</p>
              <p className="font-display text-2xl font-bold text-primary">
                {formatMZN(weeklyTotal)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary opacity-50" />
          </div>
        </div>
        <div className="neon-card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Este Mês</p>
              <p className="font-display text-2xl font-bold text-neon-green">
                {formatMZN(monthlyTotal)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-neon-green opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueForm />
        <RevenueTable />
      </div>
    </div>
  );
};

export default Receitas;
