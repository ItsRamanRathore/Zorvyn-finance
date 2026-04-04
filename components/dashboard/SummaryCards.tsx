import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import styles from './Dashboard.module.css';
import { useStore } from '../../store/useStore';
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

export const SummaryCards: React.FC = () => {
  const { transactions } = useStore();

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      balance: income - expenses,
      income,
      expenses,
    };
  }, [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      value: `$${summary.balance.toLocaleString()}`,
      icon: Wallet,
      color: 'var(--primary)',
      trend: '+2.5%',
      isPositive: true,
    },
    {
      title: 'Total Income',
      value: `$${summary.income.toLocaleString()}`,
      icon: ArrowUpRight,
      color: '#10b981',
      trend: '+12.3%',
      isPositive: true,
    },
    {
      title: 'Total Expenses',
      value: `$${summary.expenses.toLocaleString()}`,
      icon: ArrowDownRight,
      color: '#ef4444',
      trend: '-4.1%',
      isPositive: false,
    },
    {
      title: 'Savings Rate',
      value: `${((summary.balance / (summary.income || 1)) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: '#f59e0b',
      trend: '+0.8%',
      isPositive: true,
    },
  ];

  return (
    <div className={styles.summaryGrid}>
      {cards.map((card, index) => (
        <Card key={card.title} delay={index * 0.1} className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <div 
              className={styles.iconWrapper} 
              style={{ backgroundColor: `${card.color}20`, color: card.color }}
            >
              <card.icon size={22} />
            </div>
            <div className={clsx(styles.trend, card.isPositive ? styles.positive : styles.negative)}>
              {card.trend}
            </div>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardTitle}>{card.title}</span>
            <h2 className={styles.cardValue}>{card.value}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
};
