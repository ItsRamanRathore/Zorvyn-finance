'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './Settings.module.css';
import { User, Mail, Bell, Shield, Moon, Sun } from 'lucide-react';

export const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    notifications: true,
    darkMode: true,
  });

  return (
    <div className={styles.settingsGrid}>
      <Card className={styles.settingsCard}>
        <h3 className={styles.cardTitle}>Profile Information</h3>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input 
                type="text" 
                className={styles.formInput} 
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input 
                type="email" 
                className={styles.formInput} 
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <Button variant="primary">Update Profile</Button>
          </div>
        </form>
      </Card>

      <Card className={styles.settingsCard}>
        <h3 className={styles.cardTitle}>Account Preferences</h3>
        <div className={styles.preferenceList}>
          <div className={styles.preferenceItem}>
            <div className={styles.prefLeft}>
              <div className={styles.prefIcon} style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                <Bell size={20} />
              </div>
              <div className={styles.prefInfo}>
                <h4>Push Notifications</h4>
                <p>Receive alerts for large transactions.</p>
              </div>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={profile.notifications}
                onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
              />
              <span className={styles.slider} />
            </label>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.prefLeft}>
              <div className={styles.prefIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Moon size={20} />
              </div>
              <div className={styles.prefInfo}>
                <h4>Dark Mode</h4>
                <p>Switch between light and dark themes.</p>
              </div>
            </div>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={profile.darkMode}
                onChange={(e) => setProfile({ ...profile, darkMode: e.target.checked })}
              />
              <span className={styles.slider} />
            </label>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.prefLeft}>
              <div className={styles.prefIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                <Shield size={20} />
              </div>
              <div className={styles.prefInfo}>
                <h4>Two-Factor Auth</h4>
                <p>Enhanced security for your account.</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Enable</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
