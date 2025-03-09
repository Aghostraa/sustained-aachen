// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'small';
  block?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  block = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-block font-semibold rounded-xs transition-all duration-300 cursor-pointer text-center';
  
  const variantClasses = {
    primary: 'bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-2 px-6',
    secondary: 'bg-white hover:bg-(--color-primary-light) text-(--color-primary) border-2 border-(--color-primary) py-2 px-6',
    small: 'py-2 px-4 text-sm bg-(--color-primary) hover:bg-(--color-primary-dark) text-white',
  };
  
  const blockClass = block ? 'block w-full' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${blockClass} ${className}`;
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;