import { useStore } from '@/store/useStore';
import { formatMZN, formatDate } from '@/data/initialData';
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

const SalaryTable = () => {
  const { salaries, deleteSalary } = useStore();

  const sortedSalaries = [...salaries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (salaries.length === 0) {
    return (
      <div className="neon-card border-neon-purple/30 text-center py-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <p className="text-muted-foreground font-body">Nenhum salário registrado</p>
      </div>
    );
  }

  return (
    <div className="neon-card border-neon-purple/30 overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
        Salários Pagos
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-neon-purple/20 hover:bg-transparent">
              <TableHead className="text-neon-purple font-display">Data</TableHead>
              <TableHead className="text-neon-purple font-display">Motorista</TableHead>
              <TableHead className="text-neon-purple font-display">Mês Ref.</TableHead>
              <TableHead className="text-neon-purple font-display text-right">Valor</TableHead>
              <TableHead className="text-neon-purple font-display w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSalaries.slice(0, 10).map((salary) => (
              <TableRow
                key={salary.id}
                className="border-neon-purple/10 hover:bg-neon-purple/5 transition-colors"
              >
                <TableCell className="font-body text-muted-foreground">
                  {formatDate(salary.date)}
                </TableCell>
                <TableCell className="font-body text-foreground">
                  {salary.driverName}
                </TableCell>
                <TableCell className="font-body text-muted-foreground capitalize">
                  {salary.month}
                </TableCell>
                <TableCell className="font-body text-neon-purple text-right font-semibold">
                  {formatMZN(salary.amount)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSalary(salary.id)}
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

export default SalaryTable;
