import React from 'react';

import type {SelectProps} from './View.types';

const Select = (props: SelectProps) => {
  const {value, onChange, className, placeholder, children} = props;
  return (
    <select value={value} onChange={onChange} placeholder={placeholder}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block w-28 p-2 ${className}`}>
      {children}
    </select>
  );
};

export default Select;