'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './Transactions.module.css';
import { useStore } from '../../store/useStore';
import { 
  Search, 
  Trash2, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Bell
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export const TransactionTable: React.FC = () => {
  const { transactions, deleteTransaction, role } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  
  const isAdmin = role === 'admin';

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return b.amount - a.amount;
      });
  }, [transactions, searchTerm, filterType, sortBy]);

  return (
    <Card className={styles.tableCard}>
      <div className={styles.tableToolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.toolbarActions}>
          <div className={styles.filterGroup}>
            <button 
              className={clsx(styles.filterBtn, filterType === 'all' && styles.active)}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={clsx(styles.filterBtn, filterType === 'income' && styles.active)}
              onClick={() => setFilterType('income')}
            >
              Income
            </button>
            <button 
              className={clsx(styles.filterBtn, filterType === 'expense' && styles.active)}
              onClick={() => setFilterType('expense')}
            >
              Expenses
            </button>
          </div>

          <div className={styles.sortWrapper}>
            <select 
              className={styles.sortSelect} 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.tableOverflow}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredTransactions.map((t) => (
                <motion.tr 
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <td>
                    <div className={styles.descriptionCell}>
                      <div className={styles.descriptionRow}>
                        <span className={styles.descriptionText}>{t.description}</span>
                        <div className={styles.statusIcons}>
                          {t.isRecurring && (
                            <RotateCcw size={12} className={styles.recurringIcon} />
                          )}
                          {t.remindersEnabled && (
                            <Bell size={12} className={styles.reminderIcon} />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{t.category}</span>
                  </td>
                  <td>
                    <div className={styles.dateCell}>
                      <Calendar size={14} />
                      {format(parseISO(t.date), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td>
                    <span className={clsx(styles.amountText, t.type === 'income' ? styles.income : styles.expense)}>
                      {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div className={clsx(styles.typeIndicator, t.type === 'income' ? styles.incomeBg : styles.expenseBg)}>
                      {t.type === 'income' ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                      <span>{t.type.toUpperCase()}</span>
                    </div>
                  </td>
                  {isAdmin && (
                    <td>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => deleteTransaction(t.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className={styles.emptyTable}>
          <p>No transactions found matching your criteria.</p>
        </div>
      )}

      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          Showing <strong>{filteredTransactions.length}</strong> transactions
        </span>
        <div className={styles.paginationBtns}>
          <Button variant="secondary" size="sm"><ChevronLeft size={16} /></Button>
          <Button variant="secondary" size="sm"><ChevronRight size={16} /></Button>
        </div>
      </div>
    </Card>
  );
};
