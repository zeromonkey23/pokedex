import type {KeyboardEvent} from 'react';

import type {InputSearchHooksProps} from './View.types';

const useView = ({onEnter}: InputSearchHooksProps) => {
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return {onKeyPress};
};

export default useView;