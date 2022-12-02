import type {ChangeEvent, ReactNode} from 'react';

export interface SelectProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}