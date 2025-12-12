import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { vehicles, expenseTypes } from '@/data/initialData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { Expense } from '@/types';

const ExpenseForm = () => {
  const { addExpense } = useStore();
  const [vehicle, setVehicle] = useState('');
  const [type, setType] = useState<Expense['type'] | ''>('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicle || !type || !amount || !date) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    addExpense({
      vehicle,
      type: type as Expense['type'],
      amount: parseFloat(amount),
      date,
      description,
    });

    toast.success('Despesa adicionada com sucesso!');
    setVehicle('');
    setType('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  };

  return (
    <div className="neon-card border-neon-orange/30 hover:border-neon-orange/60 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-orange/10">
          <TrendingDown className="w-6 h-6 text-neon-orange" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground tracking-wide">
          Registrar Despesa
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Veículo
          </label>
          <Select value={vehicle} onValueChange={setVehicle}>
            <SelectTrigger className="border-neon-orange/30 bg-input focus:border-neon-orange">
              <SelectValue placeholder="Selecione o veículo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-neon-orange/30">
              {vehicles.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Tipo de Despesa
          </label>
          <Select value={type} onValueChange={(v) => setType(v as Expense['type'])}>
            <SelectTrigger className="border-neon-orange/30 bg-input focus:border-neon-orange">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-neon-orange/30">
              {expenseTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            className="border-neon-orange/30 focus:border-neon-orange"
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
            className="border-neon-orange/30 focus:border-neon-orange"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-body uppercase tracking-wider">
            Descrição (opcional)
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes da despesa"
            className="border-neon-orange/30 focus:border-neon-orange"
          />
        </div>

        <Button type="submit" variant="neonOrange" className="w-full">
          <TrendingDown className="w-4 h-4" />
          Adicionar Despesa
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
