import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, TrendingDown, Users, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/receitas', icon: TrendingUp, label: 'Receitas' },
  { to: '/despesas', icon: TrendingDown, label: 'Despesas' },
  { to: '/salarios', icon: Users, label: 'Salários' },
  { to: '/historico', icon: History, label: 'Histórico' },
];

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-background/90 backdrop-blur-xl md:relative md:border-t-0 md:border-r md:h-[calc(100vh-4rem)]">
      <div className="flex md:flex-col md:gap-2 md:p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 p-3 md:px-4 md:py-3 text-xs md:text-sm font-body transition-all duration-300 rounded-lg',
                isActive
                  ? 'text-primary bg-primary/10 border-t-2 md:border-t-0 md:border-l-2 border-primary shadow-neon'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
