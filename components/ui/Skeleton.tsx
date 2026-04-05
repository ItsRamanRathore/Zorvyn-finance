import React from 'react';
import styles from './Skeleton.module.css';
import clsx from 'clsx';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = 'var(--radius)', 
  className 
}) => {
  return (
    <div 
      className={clsx(styles.skeleton, className)} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height, 
        borderRadius 
      }} 
    />
  );
};
