import { FC } from 'react';

import { SwipeButtonProps } from '@/interfaces/swipe';

const SwipeButton: FC<SwipeButtonProps> = ({
  type,
  children,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex size-[72px] items-center justify-center rounded-[20px] bg-white disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SwipeButton;
