'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './Transactions.module.css';
import { useStore } from '../../store/useStore';
import { X, Plus, DollarSign, Tag, Info, Bell, CalendarClock, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionFormProps {
  onClose: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
  const { addTransaction } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    frequency: 'monthly' as 'weekly' | 'monthly',
    remindersEnabled: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addTransaction({
      description: formData.description,
      amount: amount,
      category: formData.category,
      type: formData.type,
      date: formData.date,
      isRecurring: formData.isRecurring,
      frequency: formData.isRecurring ? formData.frequency : undefined,
      remindersEnabled: formData.isRecurring ? formData.remindersEnabled : false,
    });
    
    setIsSubmitting(false);
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
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                />
              </div>
              {errors.description && <span className={styles.errorText}>{errors.description}</span>}
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
                    onChange={(e) => {
                      setFormData({ ...formData, amount: e.target.value });
                      if (errors.amount) setErrors({ ...errors, amount: '' });
                    }}
                  />
                </div>
                {errors.amount && <span className={styles.errorText}>{errors.amount}</span>}
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

            <div className={styles.recurringSection}>
              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  />
                  <span className={styles.checkboxText}>
                    <RotateCcw size={16} />
                    Recurring Payment
                  </span>
                </label>
              </div>

              <AnimatePresence>
                {formData.isRecurring && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.recurringOptions}
                  >
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Frequency</label>
                        <div className={styles.inputWrapper}>
                          <CalendarClock size={16} className={styles.inputIcon} />
                          <select 
                            className={styles.formInput}
                            value={formData.frequency}
                            onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                          >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Reminders</label>
                        <label className={styles.checkboxLabel}>
                          <input 
                            type="checkbox" 
                            checked={formData.remindersEnabled}
                            onChange={(e) => setFormData({ ...formData, remindersEnabled: e.target.checked })}
                          />
                          <span className={styles.checkboxText}>
                            <Bell size={16} />
                            Enable Notifications
                          </span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.formActions}>
              <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>Add Transaction</Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
