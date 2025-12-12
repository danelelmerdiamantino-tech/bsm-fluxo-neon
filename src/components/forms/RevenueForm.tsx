import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { drivers } from '@/data/initialData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const RevenueForm = () => {
  const { addRevenue } = useStore();
  const [driverId, setDriverId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const selectedDriver = drivers.find((d) => d.id === driverId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!driverId || !amount || !date) {
      toast.error('Preencha todos os campos');
      return;
    }

    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;

    addRevenue({
      driverId,
      driverName: driver.name,
      vehicle: driver.vehicle,
      amount: parseFloat(amount),
      date,
    });

    toast.success('Receita adicionada com sucesso!');
    setDriverId('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="neon-card animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-green/10">
          <TrendingUp className="w-6 h-6 text-neon-green" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground tracking-wide">
          Registrar Receita
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Motorista
          </label>
          <Select value={driverId} onValueChange={setDriverId}>
            <SelectTrigger className="border-primary/30 bg-input focus:border-primary">
              <SelectValue placeholder="Selecione o motorista" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/30">
              {drivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Veículo
          </label>
          <Input
            value={selectedDriver?.vehicle || ''}
            disabled
            placeholder="Auto-preenchido"
            className="disabled:opacity-70"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Valor (MZN)
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Data
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <Button type="submit" variant="neonGreen" className="w-full">
          <TrendingUp className="w-4 h-4" />
          Adicionar Receita
        </Button>
      </form>
    </div>
  );
};

export default RevenueForm;
