import React from 'react';
import { clsx } from 'clsx';

export function Card({ children, className }) {
  return (
    <div className={clsx('bg-white rounded-lg shadow-md p-6', className)}>
      {children}
    </div>
  );
}