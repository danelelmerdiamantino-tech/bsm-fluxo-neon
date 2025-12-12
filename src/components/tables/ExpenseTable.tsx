import { useStore } from '@/store/useStore';
import { formatMZN, formatDate, expenseTypes } from '@/data/initialData';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ExpenseTable = () => {
  const { expenses, deleteExpense } = useStore();

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getTypeLabel = (type: string) => {
    return expenseTypes.find((t) => t.value === type)?.label || type;
  };

  if (expenses.length === 0) {
    return (
      <div className="neon-card border-neon-orange/30 text-center py-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <p className="text-muted-foreground font-body">Nenhuma despesa registrada</p>
      </div>
    );
  }

  return (
    <div className="neon-card border-neon-orange/30 overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
        Despesas Recentes
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-neon-orange/20 hover:bg-transparent">
              <TableHead className="text-neon-orange font-display">Data</TableHead>
              <TableHead className="text-neon-orange font-display">Veículo</TableHead>
              <TableHead className="text-neon-orange font-display">Tipo</TableHead>
              <TableHead className="text-neon-orange font-display text-right">Valor</TableHead>
              <TableHead className="text-neon-orange font-display w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedExpenses.slice(0, 10).map((expense) => (
              <TableRow
                key={expense.id}
                className="border-neon-orange/10 hover:bg-neon-orange/5 transition-colors"
              >
                <TableCell className="font-body text-muted-foreground">
                  {formatDate(expense.date)}
                </TableCell>
                <TableCell className="font-body text-foreground">
                  {expense.vehicle}
                </TableCell>
                <TableCell className="font-body text-muted-foreground">
                  {getTypeLabel(expense.type)}
                </TableCell>
                <TableCell className="font-body text-neon-orange text-right font-semibold">
                  {formatMZN(expense.amount)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteExpense(expense.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
