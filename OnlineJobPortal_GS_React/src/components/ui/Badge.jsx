import React from 'react';
import { clsx } from 'clsx';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  interview_scheduled: 'bg-blue-100 text-blue-800',
  offer_made: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export function Badge({ status, children }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusStyles[status]
      )}
    >
      {children}
    </span>
  );
}