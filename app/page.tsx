'use client';

import React, { useEffect, useState } from 'react';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceTrend } from '@/components/dashboard/BalanceTrend';
import { SpendingBreakdown } from '@/components/dashboard/SpendingBreakdown';
import { RecurringPayments } from '@/components/dashboard/RecurringPayments';
import { InsightsSection } from '@/components/dashboard/InsightsSection';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { initialTransactions } from '@/utils/mockData';
import { exportTransactionsToCSV } from '@/utils/export';
import { Plus, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardLoading } from '@/components/dashboard/DashboardLoading';
import { LandingPage } from '@/components/welcome/LandingPage';
import styles from './page.module.css';

export default function DashboardPage() {
  const { setTransactions, transactions, role, isAuthenticated } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      if (transactions.length === 0) {
        setTransactions(initialTransactions);
      }
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [setTransactions, transactions.length]);

  const isAdmin = role === 'admin';

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.title}>Financial Overview</h1>
          <p className={styles.subtitle}>Welcome back, Alex. Here's what's happening with your money.</p>
        </div>
        
        <div className={styles.pageActions}>
          <Button variant="secondary" onClick={() => exportTransactionsToCSV(transactions)}>
            <Download size={18} />
            <span>Export CSV</span>
          </Button>
          {isAdmin && (
            <Button 
              onClick={() => setIsFormOpen(true)}
              className={styles.addBtn}
            >
              <Plus size={18} />
              <span>Add Transaction</span>
            </Button>
          )}
        </div>
      </header>

      <SummaryCards />

      <div className={styles.chartsGrid}>
        <BalanceTrend />
        <SpendingBreakdown />
        <RecurringPayments />
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
