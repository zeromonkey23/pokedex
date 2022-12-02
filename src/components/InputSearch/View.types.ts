import type {ChangeEvent} from 'react';

export interface InputSearchProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export interface InputSearchHooksProps {
  onEnter: () => void;
}