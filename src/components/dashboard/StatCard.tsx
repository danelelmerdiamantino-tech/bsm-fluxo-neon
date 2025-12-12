import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  variant?: 'cyan' | 'green' | 'orange' | 'purple';
  delay?: number;
}

const variantStyles = {
  cyan: 'border-primary/30 hover:border-primary/60',
  green: 'border-neon-green/30 hover:border-neon-green/60',
  orange: 'border-neon-orange/30 hover:border-neon-orange/60',
  purple: 'border-neon-purple/30 hover:border-neon-purple/60',
};

const iconStyles = {
  cyan: 'text-primary',
  green: 'text-neon-green',
  orange: 'text-neon-orange',
  purple: 'text-neon-purple',
};

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  variant = 'cyan',
  delay = 0,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'neon-card opacity-0 animate-fade-in',
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-body tracking-wide uppercase">
            {title}
          </p>
          <p className={cn('stat-value', iconStyles[variant])}>{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs font-body',
                trendUp ? 'text-neon-green' : 'text-neon-orange'
              )}
            >
              {trend}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-lg bg-muted', iconStyles[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
