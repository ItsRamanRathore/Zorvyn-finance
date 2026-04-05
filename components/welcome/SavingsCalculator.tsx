'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, DollarSign, TrendingDown } from 'lucide-react';
import styles from './Landing.module.css';

import clsx from 'clsx';

interface Subscription {
  id: string;
  name: string;
  price: number;
  icon: string;
}

const SUB_DATA: Subscription[] = [
  { id: '1', name: 'Premium Video', price: 19.99, icon: '🎬' },
  { id: '2', name: 'Music Streaming', price: 10.99, icon: '🎵' },
  { id: '3', name: 'Cloud Storage', price: 9.99, icon: '☁️' },
  { id: '4', name: 'Gym Membership', price: 45.00, icon: '💪' },
];

export const SavingsCalculator: React.FC = () => {
  const [selectedSubs, setSelectedSubs] = useState<string[]>(['1', '2']);
  
  const toggleSub = (id: string) => {
    setSelectedSubs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const monthlyTotal = SUB_DATA
    .filter(s => selectedSubs.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const annualSavings = monthlyTotal * 12 * 0.35; // Simulate 35% optimization

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.calcHeader}>
        <TrendingDown size={20} className={styles.calcIcon} />
        <h4>Quick Savings Preview</h4>
      </div>
      
      <p className={styles.calcSubtitle}>Select your current monthly subscriptions:</p>
      
      <div className={styles.subGrid}>
        {SUB_DATA.map((sub) => {
          const isActive = selectedSubs.includes(sub.id);
          return (
            <button 
              key={sub.id}
              className={clsx(styles.subItem, isActive && styles.subActive)}
              onClick={() => toggleSub(sub.id)}
            >
              <span className={styles.subEmoji}>{sub.icon}</span>
              <div className={styles.subInfo}>
                <span className={styles.subName}>{sub.name}</span>
                <span className={styles.subPrice}>${sub.price}</span>
              </div>
              <div className={styles.subCheck}>
                {isActive ? <Check size={12} /> : <Plus size={12} />}
              </div>
            </button>
          )
        })}
      </div>

      <div className={styles.calcResult}>
        <div className={styles.resultLabel}>Potential Annual Savings</div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={annualSavings}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.resultValue}
          >
            ${annualSavings.toFixed(2)}
          </motion.div>
        </AnimatePresence>
        <p className={styles.resultNote}>Based on average 35% optimization with Zorvyn smart tracking.</p>
      </div>
    </div>
  );
};
