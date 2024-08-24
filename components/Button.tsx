import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  href, 
  onClick, 
  children, 
  className = '', 
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...rest
}) => {
  const baseClasses = 'px-4 py-2 bg-[#DCDEDC] text-black font-semibold transition-colors duration-300 hover:bg-opacity-80';
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
    <button 
      onClick={onClick} 
      className={classes} 
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;