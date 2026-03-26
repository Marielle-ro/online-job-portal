import React from 'react';
import ReactSelect from 'react-select';

export function Select({ options, value, onChange, label, placeholder }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-base font-medium text-gray-700">
          {label}
        </label>
      )}
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-base"
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#0d9488',
            primary75: '#14b8a6',
            primary50: '#99f6e4',
            primary25: '#f0fdfa',
          },
        })}
      />
    </div>
  );
}