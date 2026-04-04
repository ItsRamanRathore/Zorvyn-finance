'use client';

import React, { useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '../ui/Card';
import styles from './Dashboard.module.css';
import { useStore } from '../../store/useStore';

const COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
];

export const SpendingBreakdown: React.FC = () => {
  const { transactions } = useStore();

  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const categories: Record<string, number> = {};
    
    expenses.forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <Card className={styles.chartCard} delay={0.3}>
        <h3 className={styles.chartTitle}>Spending Breakdown</h3>
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          No expense data.
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.chartCard} delay={0.3}>
      <h3 className={styles.chartTitle}>Spending Breakdown</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => `$${Number(value).toFixed(2)}`}
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
