import React from 'react';

import {btnColor} from './View.constants';
import type {ButtonProps} from './View.types';

const Button = (props: ButtonProps) => {
  const {children, className, disabled, type = 'default', onClick} = props;
  return (
    <button type="button" disabled={disabled} onClick={onClick}
      className={`py-2 px-2.5 text-sm font-medium focus:outline-none rounded-lg border
        focus:z-10 focus:ring-4 focus:ring-gray-200 ${btnColor[type]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;