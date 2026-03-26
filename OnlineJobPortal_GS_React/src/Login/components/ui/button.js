export function Button({ children, className, disabled, ...props }) {
    return (
      <button
        className={`px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
  