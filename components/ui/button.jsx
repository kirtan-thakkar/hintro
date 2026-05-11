import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50 disabled:pointer-events-none transition-all';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 shadow-sm px-4 py-2',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900 px-4 py-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
