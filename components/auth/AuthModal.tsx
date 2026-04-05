'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Shield, Eye, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import styles from './Auth.module.css';

interface AuthModalProps {
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, defaultMode = 'login' }) => {
  const { login, register } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'viewer'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mode === 'login') {
      const success = login(formData.email, formData.password);
      if (success) {
        onClose();
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    } else {
      if (formData.name.length < 2) {
        setError('Please enter a valid name');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className={styles.authCard}>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>

          <div className={styles.header}>
            <h2 className={styles.title}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={styles.subtitle}>
              {mode === 'login' 
                ? 'Sign in to access your financial dashboard' 
                : 'Join Zorvyn and take control of your money'}
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={styles.formGroup}
                >
                  <label>Full Name</label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={18} />
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input 
                  type="email" 
                  placeholder="jane@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className={styles.formGroup}>
                <label>Default Permissions</label>
                <div className={styles.roleGrid}>
                  <button 
                    type="button"
                    className={clsx(styles.roleBtn, formData.role === 'admin' && styles.active)}
                    onClick={() => setFormData({...formData, role: 'admin'})}
                  >
                    <Shield size={16} />
                    <div className={styles.roleBtnText}>
                      <span>Admin</span>
                      <small>Full Access</small>
                    </div>
                  </button>
                  <button 
                    type="button"
                    className={clsx(styles.roleBtn, formData.role === 'viewer' && styles.active)}
                    onClick={() => setFormData({...formData, role: 'viewer'})}
                  >
                    <Eye size={16} />
                    <div className={styles.roleBtnText}>
                      <span>Viewer</span>
                      <small>Read Only</small>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            <Button 
              type="submit" 
              className={styles.submitBtn} 
              isLoading={isLoading}
            >
              {mode === 'login' ? 'Sign In' : 'Get Started'}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className={styles.footer}>
            <p>
              {mode === 'login' 
                ? "Don't have an account?" 
                : "Already have an account?"}
              <button 
                className={styles.toggleBtn}
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              >
                {mode === 'login' ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// Simple clsx replacement
function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
