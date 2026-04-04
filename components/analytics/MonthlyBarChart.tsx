'use client';

import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { Card } from '../ui/Card';
import styles from '../dashboard/Dashboard.module.css';
import { useStore } from '../../store/useStore';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const MonthlyBarChart: React.FC = () => {
  const { transactions } = useStore();

  const data = useMemo(() => {
    const last6Months = Array.from({ length: 6 }).map((_, i) => subMonths(new Date(), i)).reverse();
    
    return last6Months.map(monthDate => {
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);
      
      const monthTransactions = transactions.filter(t => 
        isWithinInterval(new Date(t.date), { start, end })
      );
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
        
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
        
      return {
        name: format(monthDate, 'MMM'),
        Income: parseFloat(income.toFixed(2)),
        Expenses: parseFloat(expenses.toFixed(2)),
      };
    });
  }, [transactions]);

  return (
    <Card className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Income vs Expenses (Last 6 Months)</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
            <YAxis axisLine={false} tickLine={false} dx={-10} />
            <Tooltip 
              cursor={{ fill: 'var(--accent)', opacity: 0.4 }}
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
            <Bar dataKey="Income" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
