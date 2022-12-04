import React from 'react';

import type {ProgressProps} from './View.types';

const Progress = (props: ProgressProps) => {
  const {progress, className} = props;
  return (
    <div className={'w-full bg-gray-700 rounded-full h-2.5 ' + className}>
      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
    </div>
  );
};

export default Progress;