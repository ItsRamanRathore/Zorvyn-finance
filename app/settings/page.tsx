'use client';

import React from 'react';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { BudgetManager } from '@/components/settings/BudgetManager';
import styles from '../page.module.css';

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div className={styles.welcomeSection}>
          <div className={styles.breadcrumb}>
            <span>Pages</span> / <span>Settings</span>
          </div>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your profile, preferences, and monthly budgets.</p>
        </div>
      </header>

      <div className={styles.settingsLayout}>
        <div className={styles.settingsMain}>
          <ProfileForm />
        </div>
        <aside className={styles.settingsSidebar}>
          <BudgetManager />
        </aside>
      </div>
    </div>
  );
}
