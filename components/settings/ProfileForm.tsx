'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './Settings.module.css';
import { User, Mail, Bell, Shield, Moon, Sun } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ProfileForm: React.FC = () => {
  const { currentUser, updateUser, theme, setTheme } = useStore();

  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    notifications: true
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: profile.name, email: profile.email });
    // In a real app we might show a toast here
  };

  return (
    <div className={styles.settingsGrid}>
      <Card className={styles.settingsCard}>
        <h3 className={styles.cardTitle}>Profile Information</h3>
        <form className={styles.form} onSubmit={handleUpdateProfile}>
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
            <Button variant="primary" type="submit">Update Profile</Button>
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
                checked={theme === 'dark'}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
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
