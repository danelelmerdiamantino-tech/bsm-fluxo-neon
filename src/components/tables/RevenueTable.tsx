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

const RevenueTable = () => {
  const { revenues, deleteRevenue } = useStore();

  const sortedRevenues = [...revenues].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (revenues.length === 0) {
    return (
      <div className="neon-card text-center py-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <p className="text-muted-foreground font-body">Nenhuma receita registrada</p>
      </div>
    );
  }

  return (
    <div className="neon-card overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-wide">
        Receitas Recentes
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-primary/20 hover:bg-transparent">
              <TableHead className="text-primary font-display">Data</TableHead>
              <TableHead className="text-primary font-display">Motorista</TableHead>
              <TableHead className="text-primary font-display">Veículo</TableHead>
              <TableHead className="text-primary font-display text-right">Valor</TableHead>
              <TableHead className="text-primary font-display w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRevenues.slice(0, 10).map((revenue) => (
              <TableRow
                key={revenue.id}
                className="border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <TableCell className="font-body text-muted-foreground">
                  {formatDate(revenue.date)}
                </TableCell>
                <TableCell className="font-body text-foreground">
                  {revenue.driverName}
                </TableCell>
                <TableCell className="font-body text-muted-foreground">
                  {revenue.vehicle}
                </TableCell>
                <TableCell className="font-body text-neon-green text-right font-semibold">
                  {formatMZN(revenue.amount)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRevenue(revenue.id)}
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

export default RevenueTable;
