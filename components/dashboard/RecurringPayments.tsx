'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { RotateCcw, Bell, Calendar, BellOff } from 'lucide-react';
import styles from './Dashboard.module.css';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export const RecurringPayments: React.FC = () => {
  const { transactions, updateTransaction } = useStore();

  const recurringTransactions = transactions.filter(t => t.isRecurring);

  const toggleReminder = (id: string, currentStatus: boolean) => {
    updateTransaction(id, { remindersEnabled: !currentStatus });
  };

  return (
    <Card className={styles.recurringCard} delay={0.4}>
      <div className={styles.cardHeader}>
        <h3 className={styles.chartTitle}>Recurring Payments</h3>
        <span className={styles.badge}>{recurringTransactions.length} Active</span>
      </div>
      
      <div className={styles.recurringList}>
        {recurringTransactions.length === 0 ? (
          <div className={styles.emptyState}>
            <RotateCcw size={32} className={styles.emptyIcon} />
            <p>No recurring payments set up yet.</p>
          </div>
        ) : (
          recurringTransactions.map((t) => (
            <div key={t.id} className={styles.recurringItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemTitleRow}>
                  <span className={styles.itemDescription}>{t.description}</span>
                  <span className={clsx(styles.itemFrequency, styles[t.frequency || 'monthly'])}>
                    {t.frequency}
                  </span>
                </div>
                <div className={styles.itemMeta}>
                  <div className={styles.metaLabel}>
                    <Calendar size={12} />
                    <span>Next: {format(parseISO(t.date), 'MMM dd')}</span>
                  </div>
                  <span className={clsx(styles.itemAmount, t.type === 'income' ? styles.income : styles.expense)}>
                    {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => toggleReminder(t.id, !!t.remindersEnabled)}
                className={clsx(styles.reminderToggle, t.remindersEnabled && styles.reminderActive)}
                title={t.remindersEnabled ? 'Turn off reminders' : 'Turn on reminders'}
              >
                {t.remindersEnabled ? <Bell size={18} /> : <BellOff size={18} />}
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
