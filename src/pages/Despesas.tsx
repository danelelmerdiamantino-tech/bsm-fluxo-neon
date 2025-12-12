import ExpenseForm from '@/components/forms/ExpenseForm';
import ExpenseTable from '@/components/tables/ExpenseTable';
import { useStore } from '@/store/useStore';
import { formatMZN } from '@/data/initialData';
import { TrendingDown, Fuel, Wrench, AlertTriangle } from 'lucide-react';

const Despesas = () => {
  const { expenses } = useStore();

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const byType = {
    combustivel: expenses.filter((e) => e.type === 'combustivel').reduce((s, e) => s + e.amount, 0),
    manutencao: expenses.filter((e) => e.type === 'manutencao').reduce((s, e) => s + e.amount, 0),
    multas: expenses.filter((e) => e.type === 'multas').reduce((s, e) => s + e.amount, 0),
    outros: expenses.filter((e) => e.type === 'outros').reduce((s, e) => s + e.amount, 0),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-wider mb-2">
          DESPESAS
        </h1>
        <p className="text-muted-foreground font-body">
          Controle de despesas por veículo
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neon-card border-neon-orange/30 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Total</p>
              <p className="font-display text-2xl font-bold text-neon-orange">
                {formatMZN(totalExpenses)}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-neon-orange opacity-50" />
          </div>
        </div>
        <div className="neon-card border-neon-orange/30 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Combustível</p>
              <p className="font-display text-xl font-bold text-foreground">
                {formatMZN(byType.combustivel)}
              </p>
            </div>
            <Fuel className="w-7 h-7 text-neon-orange opacity-50" />
          </div>
        </div>
        <div className="neon-card border-neon-orange/30 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Manutenção</p>
              <p className="font-display text-xl font-bold text-foreground">
                {formatMZN(byType.manutencao)}
              </p>
            </div>
            <Wrench className="w-7 h-7 text-neon-orange opacity-50" />
          </div>
        </div>
        <div className="neon-card border-neon-orange/30 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Multas</p>
              <p className="font-display text-xl font-bold text-foreground">
                {formatMZN(byType.multas)}
              </p>
            </div>
            <AlertTriangle className="w-7 h-7 text-neon-orange opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpenseForm />
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Despesas;
