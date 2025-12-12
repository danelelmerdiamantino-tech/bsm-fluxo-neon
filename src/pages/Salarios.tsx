import SalaryForm from '@/components/forms/SalaryForm';
import SalaryTable from '@/components/tables/SalaryTable';
import { useStore } from '@/store/useStore';
import { drivers, formatMZN } from '@/data/initialData';
import { Wallet, User } from 'lucide-react';

const Salarios = () => {
  const { salaries } = useStore();

  const totalSalaries = salaries.reduce((sum, s) => sum + s.amount, 0);

  const salariesByDriver = drivers.map((driver) => {
    const driverSalaries = salaries.filter((s) => s.driverId === driver.id);
    const total = driverSalaries.reduce((sum, s) => sum + s.amount, 0);
    const lastPayment = driverSalaries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    return { driver, total, lastPayment };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-wider mb-2">
          SALÁRIOS
        </h1>
        <p className="text-muted-foreground font-body">
          Gestão de pagamentos mensais (dia 28)
        </p>
      </div>

      {/* Total and Driver Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neon-card border-neon-purple/30 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body uppercase">Total Pago</p>
              <p className="font-display text-2xl font-bold text-neon-purple">
                {formatMZN(totalSalaries)}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-neon-purple opacity-50" />
          </div>
        </div>

        {salariesByDriver.map(({ driver, total, lastPayment }, index) => (
          <div
            key={driver.id}
            className="neon-card border-neon-purple/30 animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <User className="w-5 h-5 text-neon-purple" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">{driver.name}</p>
                <p className="text-xs text-muted-foreground font-body">{driver.vehicle}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-body">
                Total: <span className="text-neon-purple font-semibold">{formatMZN(total)}</span>
              </p>
              {lastPayment && (
                <p className="text-xs text-muted-foreground font-body">
                  Último: {new Date(lastPayment.date).toLocaleDateString('pt-MZ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalaryForm />
        <SalaryTable />
      </div>
    </div>
  );
};

export default Salarios;
