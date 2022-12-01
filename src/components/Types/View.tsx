import React from 'react';

import TYPE_COLORS from '../../constants/typeColors';


const Types = (props: {types: string[], className?: string}) => {
  const {types = [], className = ''} = props;
  return (
    <div className={'flex ' + className}>
      {types.map((type) => (
        <div key={type} style={{backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS]}}
          className={'p-1 mx-1 text-xs leading-3 text-black rounded-full w-6 h-6 shadow'}>
          <img className="w-full h-full" src={require('../../assets/type-icons/' + type + '.svg')} alt={'Pokemon ' + type + ' icon'}/>
        </div>
      ))}
    </div>
  );
};

export default Types;
