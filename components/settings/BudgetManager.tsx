'use client';

import React from 'react';
import { Card } from '../ui/Card';
import styles from './Settings.module.css';

interface Budget {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export const BudgetManager: React.FC = () => {
  const budgets: Budget[] = [
    { category: 'Food & Dining', spent: 450, limit: 600, color: 'var(--primary)' },
    { category: 'Transport', spent: 120, limit: 150, color: '#10b981' },
    { category: 'Entertainment', spent: 180, limit: 150, color: '#ef4444' },
    { category: 'Shopping', spent: 300, limit: 400, color: '#f59e0b' },
  ];

  return (
    <Card className={styles.settingsCard}>
      <h3 className={styles.cardTitle}>Monthly Budgets</h3>
      <div className={styles.budgetList}>
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOver = budget.spent > budget.limit;

          return (
            <div key={budget.category} className={styles.budgetItem}>
              <div className={styles.budgetHeader}>
                <span className={styles.categoryName}>{budget.category}</span>
                <span className={styles.budgetAmount}>
                  <span className={isOver ? styles.overText : ''}>${budget.spent}</span>
                  <span className={styles.divider}>/</span>
                  <span className={styles.limitText}>${budget.limit}</span>
                </span>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: isOver ? '#ef4444' : budget.color 
                  }} 
                />
              </div>
              {isOver && <p className={styles.warningText}>You've exceeded this budget!</p>}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
