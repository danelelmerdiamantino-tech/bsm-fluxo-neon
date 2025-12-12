import { Driver, ExpenseType } from '@/types';

export const drivers: Driver[] = [
  { id: '1', name: 'Pompilio', vehicle: 'Nissan Caravan' },
  { id: '2', name: 'John', vehicle: 'Nissan Caravan' },
  { id: '3', name: 'Tito', vehicle: 'Hino Ranger' },
];

export const expenseTypes: ExpenseType[] = [
  { value: 'combustivel', label: 'Combustível' },
  { value: 'manutencao', label: 'Manutenção' },
  { value: 'multas', label: 'Multas' },
  { value: 'outros', label: 'Outros' },
];

export const vehicles = ['Nissan Caravan', 'Hino Ranger'];

export const formatMZN = (value: number): string => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-MZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
