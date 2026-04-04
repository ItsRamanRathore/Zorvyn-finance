'use client';

import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card } from '../ui/Card';
import styles from './Dashboard.module.css';
import { useStore } from '../../store/useStore';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export const BalanceTrend: React.FC = () => {
  const { transactions } = useStore();

  const chartData = useMemo(() => {
    if (transactions.length === 0) return [];

    // Get last 30 days
    const endDate = new Date();
    const startDate = startOfMonth(endDate);
    const interval = eachDayOfInterval({ start: startDate, end: endDate });

    let runningBalance = 0;
    
    return interval.map((date) => {
      const dayStr = format(date, 'yyyy-MM-dd');
      const dayTransactions = transactions.filter((t) => t.date === dayStr);
      const income = dayTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const expense = dayTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
      
      runningBalance += (income - expense);
      
      return {
        name: format(date, 'MMM dd'),
        balance: parseFloat(runningBalance.toFixed(2)),
        income: parseFloat(income.toFixed(2)),
        expense: parseFloat(expense.toFixed(2)),
      };
    });
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <Card className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Balance Trend</h3>
        <div className={styles.emptyState}>No transaction data available.</div>
      </Card>
    );
  }

  return (
    <Card className={styles.chartCard} delay={0.2}>
      <h3 className={styles.chartTitle}>Balance Trend (Last 30 Days)</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
            <YAxis axisLine={false} tickLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: '600' }}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
