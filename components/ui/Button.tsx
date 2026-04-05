import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  fullWidth = false,
  className,
  ...props 
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        isLoading && styles.loading,
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} role="status"></span>
      ) : (
        children
      )}
    </motion.button>
  );
};
