'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './Transactions.module.css';
import { useStore } from '../../store/useStore';
import { X, Plus, DollarSign, Tag, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionFormProps {
  onClose: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
  const { addTransaction } = useStore();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });
    onClose();
  };

  const categories = [
    'Food & Dining',
    'Transport',
    'Shopping',
    'Entertainment',
    'Health',
    'Utilities',
    'Salary',
    'Investment',
    'Other',
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className={styles.formCard}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Add New Transaction</h3>
            <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <div className={styles.inputWrapper}>
                <Info size={16} className={styles.inputIcon} />
                <input 
                  type="text" 
                  className={styles.formInput} 
                  required
                  placeholder="e.g. Grocery Shopping"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Amount ($)</label>
                <div className={styles.inputWrapper}>
                  <DollarSign size={16} className={styles.inputIcon} />
                  <input 
                    type="number" 
                    step="0.01" 
                    className={styles.formInput} 
                    required
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Type</label>
                <select 
                  className={styles.formInput}
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <option value="expense">Expense (-)</option>
                  <option value="income">Income (+)</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category</label>
                <div className={styles.inputWrapper}>
                  <Tag size={16} className={styles.inputIcon} />
                  <select 
                    className={styles.formInput}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date</label>
                <input 
                  type="date" 
                  className={styles.formInput}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="primary">Add Transaction</Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
