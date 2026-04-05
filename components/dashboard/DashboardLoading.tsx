import React from 'react';
import { Skeleton } from '../ui/Skeleton';
import { Card } from '../ui/Card';
import styles from './Dashboard.module.css';
import pageStyles from '../../app/page.module.css';

export const DashboardLoading: React.FC = () => {
  return (
    <div className={pageStyles.container}>
      <header className={pageStyles.pageHeader}>
        <div className={pageStyles.welcomeSection}>
          <Skeleton width={300} height={40} className={pageStyles.title} />
          <Skeleton width={500} height={20} className={pageStyles.subtitle} />
        </div>
      </header>

      <div className={styles.summaryGrid}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} animate={false}>
            <div className={styles.cardHeader}>
              <Skeleton width={44} height={44} borderRadius={12} />
              <Skeleton width={50} height={20} borderRadius={6} />
            </div>
            <div className={styles.cardBody}>
              <Skeleton width={100} height={16} />
              <Skeleton width={150} height={32} />
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <Card animate={false} className={styles.chartCard}>
          <Skeleton width={200} height={24} className={styles.chartTitle} />
          <Skeleton width="100%" height={280} />
        </Card>
        <Card animate={false} className={styles.chartCard}>
          <Skeleton width={200} height={24} className={styles.chartTitle} />
          <Skeleton width="100%" height={280} />
        </Card>
      </div>

      <div className={pageStyles.transactionsSection}>
        <Skeleton width={250} height={32} />
        <Card animate={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} width="100%" height={60} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
