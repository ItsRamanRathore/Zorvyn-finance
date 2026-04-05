import { Transaction } from '../types';

export const exportTransactionsToCSV = (transactions: Transaction[]) => {
  if (transactions.length === 0) return;

  const headers = ['Date', 'Amount', 'Category', 'Type', 'Description'];
  const rows = transactions.map(t => [
    t.date,
    t.amount.toString(),
    t.category,
    t.type,
    t.description.replace(/,/g, ' ') // Simple escaping for CSV
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fileName = `zorvyn_transactions_${new Date().toISOString().split('T')[0]}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
