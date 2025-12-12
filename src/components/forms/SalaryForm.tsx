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
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

const SalaryForm = () => {
  const { addSalary } = useStore();
  const [driverId, setDriverId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!driverId || !amount || !date) {
      toast.error('Preencha todos os campos');
      return;
    }

    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;

    const dateObj = new Date(date);
    const month = dateObj.toLocaleDateString('pt-MZ', { month: 'long', year: 'numeric' });

    addSalary({
      driverId,
      driverName: driver.name,
      amount: parseFloat(amount),
      date,
      month,
    });

    toast.success('Salário registrado com sucesso!');
    setDriverId('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="neon-card border-neon-purple/30 hover:border-neon-purple/60 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-purple/10">
          <Wallet className="w-6 h-6 text-neon-purple" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground tracking-wide">
          Registrar Salário
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Motorista
          </label>
          <Select value={driverId} onValueChange={setDriverId}>
            <SelectTrigger className="border-neon-purple/30 bg-input focus:border-neon-purple">
              <SelectValue placeholder="Selecione o motorista" />
            </SelectTrigger>
            <SelectContent className="bg-card border-neon-purple/30">
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
            Salário (MZN)
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="border-neon-purple/30 focus:border-neon-purple"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Data de Pagamento
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-neon-purple/30 focus:border-neon-purple"
          />
        </div>

        <Button type="submit" variant="neonPurple" className="w-full">
          <Wallet className="w-4 h-4" />
          Registrar Salário
        </Button>
      </form>
    </div>
  );
};

export default SalaryForm;
