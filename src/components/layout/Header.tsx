import { Truck } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Truck className="h-8 w-8 text-primary animate-pulse-neon" />
            <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-wider text-primary neon-text">
              BSM TRANSPORT
            </h1>
            <p className="text-xs text-muted-foreground font-body tracking-wide">
              Sistema de Gestão
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs text-muted-foreground font-body">ONLINE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
