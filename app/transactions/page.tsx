'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { initialTransactions } from '@/utils/mockData';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/Button';
import { Plus, Download, ReceiptText } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import styles from '../page.module.css';

export default function TransactionsPage() {
  const { transactions, setTransactions, role } = useStore();
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
          <div className={styles.breadcrumb}>
            <span>Pages</span> / <span>Transactions</span>
          </div>
          <h1 className={styles.title}>All Transactions</h1>
          <p className={styles.subtitle}>Detailed log of your spending and income activities.</p>
        </div>
        
        <div className={styles.pageActions}>
          <Button variant="secondary">
            <Download size={18} />
            <span>Export CSV</span>
          </Button>
          {isAdmin && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus size={18} />
              <span>Add Transaction</span>
            </Button>
          )}
        </div>
      </header>

      <section className={styles.transactionsSection}>
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
