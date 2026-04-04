import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = true, 
  animate = true, 
  delay = 0 
}) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 0.5, delay } : undefined}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={clsx(styles.card, className)}
    >
      {children}
    </Component>
  );
};
