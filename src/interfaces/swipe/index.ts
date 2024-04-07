export type Direction = 'left' | 'right' | 'up' | 'down';

export interface API {
  swipe(dir?: Omit<Direction, 'up' | 'down'>): Promise<void>;
  restoreCard(): Promise<void>;
}

// * SwipeButton related props
export interface SwipeButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}
export interface ButtonContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
