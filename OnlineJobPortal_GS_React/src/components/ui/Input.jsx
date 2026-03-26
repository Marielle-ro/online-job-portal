import React from 'react';
import { clsx } from 'clsx';

export function Input({ label, error, className, icon, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-base font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}
        <input
          className={clsx(
            'block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-base py-2.5 px-4',
            icon && 'pl-10',
            error && 'border-red-300',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}