import { clsx } from 'clsx';
import React from 'react';

interface ButtonProps
  extends React.HTMLProps<Omit<HTMLButtonElement, 'onClick'>> {
  children: React.ReactNode;
  onClick: () => void;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  color?: 'outline' | 'fill';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  children,
  color,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        `rounded-[10px] border-[1px] px-4 py-2 text-center text-base font-bold text-gray-800 ${className}`,
        color === 'outline'
          ? 'border-[#00FF66] bg-white'
          : 'border-transparent bg-[#80FFB2]',
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
