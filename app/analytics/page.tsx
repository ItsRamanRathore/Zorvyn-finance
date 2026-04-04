'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { initialTransactions } from '@/utils/mockData';
import { MonthlyBarChart } from '@/components/analytics/MonthlyBarChart';
import { SpendingBreakdown } from '@/components/dashboard/SpendingBreakdown';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { Card } from '@/components/ui/Card';
import { TrendingUp, PieChart, BarChart3, ArrowRight } from 'lucide-react';
import styles from '../page.module.css';

export default function AnalyticsPage() {
  const { transactions, setTransactions } = useStore();

  useEffect(() => {
    if (transactions.length === 0) {
      setTransactions(initialTransactions);
    }
  }, [setTransactions, transactions.length]);

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div className={styles.welcomeSection}>
          <div className={styles.breadcrumb}>
            <span>Pages</span> / <span>Analytics</span>
          </div>
          <h1 className={styles.title}>Data Insights</h1>
          <p className={styles.subtitle}>Deep dive into your financial habits and trends.</p>
        </div>
      </header>

      <SummaryCards />

      <div className={styles.chartsGrid}>
        <MonthlyBarChart />
        <SpendingBreakdown />
      </div>

      <div className={styles.analyticsGrid}>
        <Card className={styles.analyticsStatCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Growth Projection</h3>
            <p>Based on your current savings rate, you'll reach your goal in **4 months**.</p>
            <button className={styles.statLink}>
              View details <ArrowRight size={14} />
            </button>
          </div>
        </Card>

        <Card className={styles.analyticsStatCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <BarChart3 size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Efficiency Score</h3>
            <p>Your spending efficiency has improved by **8.4%** this week.</p>
            <button className={styles.statLink}>
              Compare periods <ArrowRight size={14} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
