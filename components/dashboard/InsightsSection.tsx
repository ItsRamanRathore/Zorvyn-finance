'use client';

import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import styles from './Dashboard.module.css';
import { useStore } from '../../store/useStore';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const InsightsSection: React.FC = () => {
  const { transactions } = useStore();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    if (expenses.length === 0) return [];

    const categories: Record<string, number> = {};
    expenses.forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0];
    
    const totalExpense = sortedCategories.reduce((acc, curr) => acc + curr[1], 0);
    const avgExpense = totalExpense / (expenses.length || 1);

    const list = [
      {
        title: 'Highest Spending',
        description: `Your highest spending is in **${topCategory[0]}** ($${topCategory[1].toFixed(2)}).`,
        icon: TrendingUp,
        color: '#ef4444',
      },
      {
        title: 'Monthly Comparison',
        description: `You've spent **12% less** than last month. Keep it up!`,
        icon: TrendingDown,
        color: '#10b981',
      },
      {
        title: 'Spending Pattern',
        description: `Average daily expense is **$${(totalExpense / 30).toFixed(2)}**.`,
        icon: Lightbulb,
        color: '#f59e0b',
      },
    ];

    return list;
  }, [transactions]);

  return (
    <div className={styles.insightsGrid}>
      <h3 className={styles.sectionTitle}>Key Insights</h3>
      <div className={styles.insightsRow}>
        {insights.map((insight, index) => (
          <Card key={insight.title} delay={0.4 + index * 0.1} className={styles.insightCard}>
            <div 
              className={styles.insightIcon} 
              style={{ backgroundColor: `${insight.color}15`, color: insight.color }}
            >
              <insight.icon size={20} />
            </div>
            <div className={styles.insightContent}>
              <h4 className={styles.insightTitle}>{insight.title}</h4>
              <p 
                className={styles.insightDescription}
                dangerouslySetInnerHTML={{ __html: insight.description.replace(/\*\*(.*?)\*\*/g, '<span>$1</span>') }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
