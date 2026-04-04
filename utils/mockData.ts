import { Transaction } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { subDays, format } from 'date-fns';

const categories = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Salary',
  'Investment',
];

export const generateMockTransactions = (count: number = 20): Transaction[] => {
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = i % 5 === 0 ? 'income' : 'expense';
    const category = type === 'income' 
      ? (i % 2 === 0 ? 'Salary' : 'Investment') 
      : categories[Math.floor(Math.random() * (categories.length - 2))]; 
    
    const amount = type === 'income' 
      ? 2000 + Math.random() * 3000 
      : 10 + Math.random() * 200;
    
    transactions.push({
      id: uuidv4(),
      date: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      amount: parseFloat(amount.toFixed(2)),
      category,
      description: `${category} payment #${i + 1}`,
      type,
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const initialTransactions = generateMockTransactions(25);
