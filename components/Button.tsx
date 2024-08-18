import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  href, 
  onClick, 
  children, 
  className = '', 
  disabled = false,
  fullWidth = false
}) => {
  const baseClasses = 'px-4 py-2 bg-[#DCDEDC] text-black font-semibold transition-colors duration-300 hover:bg-opacity-80 rounded-sm';
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${widthClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;