'use client';

import React, { useState, useEffect } from 'react';
import styles from './Layout.module.css';
import { useStore } from '../../store/useStore';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { role, setRole } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className={styles.overlay}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        animate={{ 
          width: isSidebarOpen ? (isMobile ? '280px' : '260px') : '0px',
          x: isSidebarOpen ? 0 : (isMobile ? -280 : 0),
          opacity: isSidebarOpen ? 1 : 0
        }}
        className={clsx(styles.sidebar, !isSidebarOpen && styles.hidden)}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <TrendingUp size={24} />
          </div>
          <span className={styles.logoText}>Zorvyn Finance</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={clsx(styles.navLink, isActive && styles.active)}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
                {isActive && <motion.div layoutId="nav-pill" className={styles.navPill} />}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userSection}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Alex Johnson</span>
              <span className={styles.userRole}>{role === 'admin' ? 'Administrator' : 'Viewer'}</span>
            </div>
          </div>
          <button className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className={clsx(styles.main, !isSidebarOpen && styles.expanded)}>
        <header className={styles.header}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.menuToggle}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className={styles.headerRight}>
            <div className={styles.roleSwitcher}>
              <div className={styles.switcherIcon}>
                {role === 'admin' ? <ShieldCheck size={18} /> : <Eye size={18} />}
              </div>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as any)}
                className={styles.roleSelect}
              >
                <option value="admin">Switch to Admin</option>
                <option value="viewer">Switch to Viewer</option>
              </select>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          {children}
        </section>
      </main>
    </div>
  );
};
