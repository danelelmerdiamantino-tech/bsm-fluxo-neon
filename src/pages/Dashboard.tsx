import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { drivers, formatMZN } from '@/data/initialData';
import StatCard from '@/components/dashboard/StatCard';
import DriverCard from '@/components/dashboard/DriverCard';
import { RevenueBarChart, MonthlyLineChart, DistributionDonut } from '@/components/dashboard/Charts';

const Dashboard = () => {
  const { revenues, expenses, salaries } = useStore();

  const today = new Date().toISOString().split('T')[0];
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const dailyRevenue = revenues
    .filter((r) => r.date === today)
    .reduce((sum, r) => sum + r.amount, 0);

  const weeklyRevenue = revenues
    .filter((r) => new Date(r.date) >= startOfWeek)
    .reduce((sum, r) => sum + r.amount, 0);

  const monthlyRevenue = revenues
    .filter((r) => new Date(r.date) >= startOfMonth)
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSalaries = salaries.reduce((sum, s) => sum + s.amount, 0);
  const netProfit = monthlyRevenue - totalExpenses - totalSalaries;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-wider mb-2">
          DASHBOARD
        </h1>
        <p className="text-muted-foreground font-body">
          Visão geral do sistema de gestão
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Receita Diária"
          value={formatMZN(dailyRevenue)}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="cyan"
          delay={0}
        />
        <StatCard
          title="Receita Semanal"
          value={formatMZN(weeklyRevenue)}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="green"
          delay={100}
        />
        <StatCard
          title="Receita Mensal"
          value={formatMZN(monthlyRevenue)}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="cyan"
          delay={200}
        />
        <StatCard
          title="Total Despesas"
          value={formatMZN(totalExpenses)}
          icon={<TrendingDown className="w-6 h-6" />}
          variant="orange"
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Salários"
          value={formatMZN(totalSalaries)}
          icon={<Wallet className="w-6 h-6" />}
          variant="purple"
          delay={350}
        />
        <div className="sm:col-span-2 lg:col-span-3">
          <StatCard
            title="Lucro Líquido (Mês)"
            value={formatMZN(netProfit)}
            icon={<DollarSign className="w-6 h-6" />}
            variant={netProfit >= 0 ? 'green' : 'orange'}
            trend={netProfit >= 0 ? 'Positivo' : 'Negativo'}
            trendUp={netProfit >= 0}
            delay={400}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueBarChart />
        <MonthlyLineChart />
        <DistributionDonut />
      </div>

      {/* Drivers */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground tracking-wide mb-4">
          MOTORISTAS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drivers.map((driver, index) => (
            <DriverCard key={driver.id} driver={driver} delay={500 + index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
