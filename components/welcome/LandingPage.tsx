'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Moon,
  Sun,
  LayoutDashboard,
  Layers,
  Rocket,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { SavingsCalculator } from './SavingsCalculator';
import { useStore } from '../../store/useStore';
import styles from './Landing.module.css';
import clsx from 'clsx';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const LandingPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const journeySteps = [
    {
      icon: <LayoutDashboard size={24} />,
      title: 'Unify Your Data',
      description: 'Connect all your financial streams into one single, high-fidelity source of truth.'
    },
    {
      icon: <Layers size={24} />,
      title: 'Deep Intelligence',
      description: 'Our AI-driven engine analyzes patterns to find hidden savings and growth opportunities.'
    },
    {
      icon: <Rocket size={24} />,
      title: 'Accelerate Growth',
      description: 'Execute on smart recommendations and watch your net worth climb with precision.'
    }
  ];

  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Real-time Analytics',
      description: 'Track your spending and income with sub-second latency and instant synchronization.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure by Design',
      description: 'Your financial data is yours. We use enterprise-grade encryption for all transactions.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Deep Insights',
      description: 'Automated data analysis that identifies patterns and helps you save more every month.'
    },
    {
      icon: <Globe size={24} />,
      title: 'Global Compliance',
      description: 'Built to meet the highest security standards, ensuring your data is protected worldwide.'
    }
  ];

  return (
    <div className={styles.container}>
      {/* Animated Background Blobs */}
      <div className={styles.blobContainer}>
        <div className={clsx(styles.blob, styles.blob1)} />
        <div className={clsx(styles.blob, styles.blob2)} />
        <div className={clsx(styles.blob, styles.blob3)} />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <TrendingUp size={24} />
          </div>
          <span className={styles.logoText}>Zorvyn</span>
        </div>
        
        <nav className={styles.nav}>
          <a href="#journey">Journey</a>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
        </nav>

        <div className={styles.actions}>
          <button 
            className={styles.themeToggle} 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
          <div className={styles.desktopOnly}>
            <Button variant="secondary" onClick={handleSignIn}>Sign In</Button>
            <Button onClick={handleGetStarted}>Get Started</Button>
          </div>
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <nav className={styles.mobileNav}>
              <a href="#journey" onClick={() => setIsMobileMenuOpen(false)}>Journey</a>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="#security" onClick={() => setIsMobileMenuOpen(false)}>Security</a>
              <hr className={styles.mobileDivider} />
              <Button variant="secondary" fullWidth onClick={handleSignIn}>Sign In</Button>
              <Button fullWidth onClick={handleGetStarted}>Get Started</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className={styles.badge}>
              Professional Wealth Management
            </motion.span>
            <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
              The <span className={styles.highlight}>Intelligence</span> Layer for Your Wealth
            </motion.h1>
            <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
              Experience the next evolution of personal finance. High-fidelity analytics, 
              automated insights, and bank-level security integrated into a stunning 
              glassmorphism interface.
            </motion.p>
            <motion.div variants={fadeInUp} className={styles.heroActions}>
              <Button size="lg" onClick={handleGetStarted}>
                Join the Elite <ArrowRight size={20} />
              </Button>
              <Button variant="secondary" size="lg">Explore the Platform</Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <SavingsCalculator />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.mockupContainer}
          initial={{ opacity: 0, rotateY: 20, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          <div className={styles.mockupBase}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupDot} />
              <div className={styles.mockupDot} />
              <div className={styles.mockupDot} />
            </div>
            <div className={styles.mockupContent}>
              <div className={styles.sidebar}>
                <div className={styles.sidebarItem} />
                <div className={styles.sidebarItem} />
                <div className={styles.sidebarItem} />
                <div className={styles.sidebarItem} />
              </div>
              <div className={styles.mainArea}>
                <div className={styles.gridStats}>
                  <div className={styles.statCard} />
                  <div className={styles.statCard} />
                  <div className={styles.statCard} />
                </div>
                <div className={styles.chartArea}>
                  {[40, 70, 50, 90, 60].map((h, i) => (
                    <motion.div 
                      key={i}
                      className={styles.bar} 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.5 + (i * 0.1), duration: 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className={clsx(styles.overlayCard, styles.overlay1)}
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <CheckCircle2 color="#10b981" size={24} />
            <div className={styles.overlayContent}>
              <span>Sub Optimization</span>
              <strong>Saved • $42.50/mo</strong>
            </div>
          </motion.div>

          <motion.div 
            className={clsx(styles.overlayCard, styles.overlay2)}
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            <Lock color="#6366f1" size={24} />
            <div className={styles.overlayContent}>
              <span>Data Integrity</span>
              <strong>100% Secured</strong>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className={styles.marqueeSection}>
        <div className={styles.marqueeContent}>
          {[1, 2, 3].map((group) => (
            <React.Fragment key={group}>
              <div className={styles.marqueeItem}><Globe /> GLOBAL REACH</div>
              <div className={styles.marqueeItem}><Shield /> BANK-LEVEL SECURITY</div>
              <div className={styles.marqueeItem}><Zap /> LIGHTNING FAST</div>
              <div className={styles.marqueeItem}><CheckCircle2 /> GDPR COMPLIANT</div>
              <div className={styles.marqueeItem}><BarChart3 /> SMART INSIGHTS</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <section id="journey" className={styles.journey}>
        <div className={styles.sectionHeader}>
            <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className={styles.sectionTitle}
          >
            The Zorvyn Journey
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className={styles.sectionSubtitle}
          >
            Follow our proven strategy to achieve total financial clarity.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, margin: "-100px" }}
          className={styles.journeyGrid}
        >
          <div className={styles.journeyConnector} />
          {journeySteps.map((step, i) => (
            <motion.div key={i} variants={fadeInUp} className={styles.journeyItem}>
              <div className={styles.stepNumber}>{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Engineered for Professionals</h2>
          <p className={styles.sectionSubtitle}>
            Custom-built tools designed to give you a competitive edge in wealth management.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className={styles.featuresGrid}
        >
          {features.map((f, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className={styles.featureCard}
              whileHover={{ 
                y: -12, 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--primary)' 
              }}
            >
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Security Section */}
      <section id="security" className={styles.security}>
        <div className={styles.securityContent}>
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className={styles.securityTitle}
          >
            Your Security is Our Obsession
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className={styles.securityText}
          >
            We utilize enterprise-grade 256-bit AES encryption to ensure your data 
            stays private and untraceable. Zorvyn never sells your identity or data.
          </motion.p>
          <motion.ul 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className={styles.securityList}
          >
            {['End-to-end data encryption', 'Multi-factor authentication', 'Real-time fraud alerts', 'Full regulatory compliance'].map((item, i) => (
              <motion.li key={i} variants={fadeInUp}>
                <CheckCircle2 size={18} /> {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={styles.securityIconContainer}
        >
          <div className={styles.securityShield}>
            <Shield size={120} />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <TrendingUp size={20} />
              </div>
              <span className={styles.logoText}>Zorvyn</span>
            </div>
            <p>The premium intelligence layer for modern financial wealth management.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Ecosystem</h4>
              <a href="#">Security Hub</a>
              <a href="#">API Documentation</a>
              <a href="#">Elite Pricing</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>Network</h4>
              <a href="#">Our Vision</a>
              <a href="#">Strategic Blog</a>
              <a href="#">Career Pathways</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <a href="#">Service Terms</a>
              <a href="#">Identity Privacy</a>
              <a href="#">Data Rights</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2026 Zorvyn Wealth Intelligence Inc. All rights reserved.</p>
          <div className={styles.socials}>
            <Globe size={20} />
          </div>
        </div>
      </footer>

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          defaultMode={authMode}
        />
      )}
    </div>
  );
};
