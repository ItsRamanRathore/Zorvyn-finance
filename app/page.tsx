'use client';

import React, { useEffect, useState } from 'react';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceTrend } from '@/components/dashboard/BalanceTrend';
import { SpendingBreakdown } from '@/components/dashboard/SpendingBreakdown';
import { InsightsSection } from '@/components/dashboard/InsightsSection';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { initialTransactions } from '@/utils/mockData';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './page.module.css';

export default function DashboardPage() {
  const { setTransactions, transactions, role } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (transactions.length === 0) {
      setTransactions(initialTransactions);
    }
  }, [setTransactions, transactions.length]);

  const isAdmin = role === 'admin';

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.title}>Financial Overview</h1>
          <p className={styles.subtitle}>Welcome back, Alex. Here's what's happening with your money.</p>
        </div>
        
        {isAdmin && (
          <Button 
            onClick={() => setIsFormOpen(true)}
            className={styles.addBtn}
          >
            <Plus size={18} />
            <span>Add Transaction</span>
          </Button>
        )}
      </header>

      <SummaryCards />

      <div className={styles.chartsGrid}>
        <BalanceTrend />
        <SpendingBreakdown />
      </div>

      <InsightsSection />

      <section className={styles.transactionsSection}>
        <h2 className={styles.sectionTitle}>Recent Transactions</h2>
        <TransactionTable />
      </section>

      <AnimatePresence>
        {isFormOpen && (
          <TransactionForm onClose={() => setIsFormOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
