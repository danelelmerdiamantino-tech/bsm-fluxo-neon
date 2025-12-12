import { User, Truck } from 'lucide-react';
import { Driver } from '@/types';
import { useStore } from '@/store/useStore';
import { formatMZN } from '@/data/initialData';
import { cn } from '@/lib/utils';

interface DriverCardProps {
  driver: Driver;
  delay?: number;
}

const DriverCard = ({ driver, delay = 0 }: DriverCardProps) => {
  const { revenues } = useStore();

  const driverRevenues = revenues.filter((r) => r.driverId === driver.id);
  const totalRevenue = driverRevenues.reduce((sum, r) => sum + r.amount, 0);
  const lastTrips = driverRevenues.slice(-3);

  return (
    <div
      className={cn(
        'neon-card opacity-0 animate-fade-in group'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary transition-colors">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-green flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-background" />
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground tracking-wide">
            {driver.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-body">{driver.vehicle}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
          <span className="text-sm text-muted-foreground font-body">Total Receitas</span>
          <span className="font-display font-semibold text-neon-green">
            {formatMZN(totalRevenue)}
          </span>
        </div>

        {lastTrips.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">
              Últimas Viagens
            </p>
            {lastTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex justify-between items-center text-sm p-2 rounded bg-muted/30"
              >
                <span className="text-muted-foreground font-body">
                  {new Date(trip.date).toLocaleDateString('pt-MZ')}
                </span>
                <span className="text-primary font-body font-medium">
                  {formatMZN(trip.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverCard;
