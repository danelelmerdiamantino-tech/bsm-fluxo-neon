import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { drivers, vehicles, formatMZN, formatDate, expenseTypes } from '@/data/initialData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, Filter, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const Historico = () => {
  const { revenues, expenses, salaries } = useStore();
  const [driverFilter, setDriverFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filterByDate = (date: string) => {
    if (!startDate && !endDate) return true;
    const d = new Date(date);
    if (startDate && d < new Date(startDate)) return false;
    if (endDate && d > new Date(endDate)) return false;
    return true;
  };

  const filteredRevenues = revenues.filter((r) => {
    if (driverFilter !== 'all' && r.driverId !== driverFilter) return false;
    if (vehicleFilter !== 'all' && r.vehicle !== vehicleFilter) return false;
    return filterByDate(r.date);
  });

  const filteredExpenses = expenses.filter((e) => {
    if (vehicleFilter !== 'all' && e.vehicle !== vehicleFilter) return false;
    return filterByDate(e.date);
  });

  const filteredSalaries = salaries.filter((s) => {
    if (driverFilter !== 'all' && s.driverId !== driverFilter) return false;
    return filterByDate(s.date);
  });

  const exportToCSV = (type: 'revenues' | 'expenses' | 'salaries') => {
    let csvContent = '';
    let filename = '';

    if (type === 'revenues') {
      csvContent = 'Data,Motorista,Veículo,Valor (MZN)\n';
      filteredRevenues.forEach((r) => {
        csvContent += `${formatDate(r.date)},${r.driverName},${r.vehicle},${r.amount}\n`;
      });
      filename = 'receitas_bsm.csv';
    } else if (type === 'expenses') {
      csvContent = 'Data,Veículo,Tipo,Valor (MZN)\n';
      filteredExpenses.forEach((e) => {
        const typeLabel = expenseTypes.find((t) => t.value === e.type)?.label || e.type;
        csvContent += `${formatDate(e.date)},${e.vehicle},${typeLabel},${e.amount}\n`;
      });
      filename = 'despesas_bsm.csv';
    } else {
      csvContent = 'Data,Motorista,Mês Ref.,Valor (MZN)\n';
      filteredSalaries.forEach((s) => {
        csvContent += `${formatDate(s.date)},${s.driverName},${s.month},${s.amount}\n`;
      });
      filename = 'salarios_bsm.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    toast.success('Arquivo exportado com sucesso!');
  };

  const clearFilters = () => {
    setDriverFilter('all');
    setVehicleFilter('all');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-wider mb-2">
          HISTÓRICO
        </h1>
        <p className="text-muted-foreground font-body">
          Visualize e exporte todos os registros
        </p>
      </div>

      {/* Filters */}
      <div className="neon-card animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-foreground tracking-wide">
            Filtros
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select value={driverFilter} onValueChange={setDriverFilter}>
            <SelectTrigger className="border-primary/30">
              <SelectValue placeholder="Motorista" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/30">
              <SelectItem value="all">Todos Motoristas</SelectItem>
              {drivers.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
            <SelectTrigger className="border-primary/30">
              <SelectValue placeholder="Veículo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/30">
              <SelectItem value="all">Todos Veículos</SelectItem>
              {vehicles.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Data Início"
          />

          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Data Fim"
          />

          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="revenues" className="space-y-4">
        <TabsList className="bg-muted border border-primary/20">
          <TabsTrigger value="revenues" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Receitas ({filteredRevenues.length})
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-neon-orange/20 data-[state=active]:text-neon-orange">
            <TrendingDown className="w-4 h-4 mr-2" />
            Despesas ({filteredExpenses.length})
          </TabsTrigger>
          <TabsTrigger value="salaries" className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple">
            <Wallet className="w-4 h-4 mr-2" />
            Salários ({filteredSalaries.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenues" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground font-body">
              Total: <span className="text-neon-green font-semibold">{formatMZN(filteredRevenues.reduce((s, r) => s + r.amount, 0))}</span>
            </p>
            <Button variant="outline" onClick={() => exportToCSV('revenues')}>
              <FileDown className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
          <div className="neon-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead className="text-primary font-display">Data</TableHead>
                    <TableHead className="text-primary font-display">Motorista</TableHead>
                    <TableHead className="text-primary font-display">Veículo</TableHead>
                    <TableHead className="text-primary font-display text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRevenues.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRevenues
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((r) => (
                        <TableRow key={r.id} className="border-primary/10 hover:bg-primary/5">
                          <TableCell className="font-body text-muted-foreground">{formatDate(r.date)}</TableCell>
                          <TableCell className="font-body">{r.driverName}</TableCell>
                          <TableCell className="font-body text-muted-foreground">{r.vehicle}</TableCell>
                          <TableCell className="font-body text-neon-green text-right font-semibold">{formatMZN(r.amount)}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground font-body">
              Total: <span className="text-neon-orange font-semibold">{formatMZN(filteredExpenses.reduce((s, e) => s + e.amount, 0))}</span>
            </p>
            <Button variant="outline" onClick={() => exportToCSV('expenses')}>
              <FileDown className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
          <div className="neon-card border-neon-orange/30 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-neon-orange/20">
                    <TableHead className="text-neon-orange font-display">Data</TableHead>
                    <TableHead className="text-neon-orange font-display">Veículo</TableHead>
                    <TableHead className="text-neon-orange font-display">Tipo</TableHead>
                    <TableHead className="text-neon-orange font-display text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExpenses
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((e) => (
                        <TableRow key={e.id} className="border-neon-orange/10 hover:bg-neon-orange/5">
                          <TableCell className="font-body text-muted-foreground">{formatDate(e.date)}</TableCell>
                          <TableCell className="font-body">{e.vehicle}</TableCell>
                          <TableCell className="font-body text-muted-foreground">
                            {expenseTypes.find((t) => t.value === e.type)?.label}
                          </TableCell>
                          <TableCell className="font-body text-neon-orange text-right font-semibold">{formatMZN(e.amount)}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="salaries" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground font-body">
              Total: <span className="text-neon-purple font-semibold">{formatMZN(filteredSalaries.reduce((s, s2) => s + s2.amount, 0))}</span>
            </p>
            <Button variant="outline" onClick={() => exportToCSV('salaries')}>
              <FileDown className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
          <div className="neon-card border-neon-purple/30 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-neon-purple/20">
                    <TableHead className="text-neon-purple font-display">Data</TableHead>
                    <TableHead className="text-neon-purple font-display">Motorista</TableHead>
                    <TableHead className="text-neon-purple font-display">Mês Ref.</TableHead>
                    <TableHead className="text-neon-purple font-display text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalaries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSalaries
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((s) => (
                        <TableRow key={s.id} className="border-neon-purple/10 hover:bg-neon-purple/5">
                          <TableCell className="font-body text-muted-foreground">{formatDate(s.date)}</TableCell>
                          <TableCell className="font-body">{s.driverName}</TableCell>
                          <TableCell className="font-body text-muted-foreground capitalize">{s.month}</TableCell>
                          <TableCell className="font-body text-neon-purple text-right font-semibold">{formatMZN(s.amount)}</TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Historico;
