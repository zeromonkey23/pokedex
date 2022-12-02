import type {MouseEventHandler, ReactNode} from 'react';

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'default'
}