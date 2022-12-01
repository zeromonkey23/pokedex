import React from 'react';

import TYPE_COLORS from '../../constants/typeColors';


const Types = (props: {types: string[], className?: string}) => {
  const {types = [], className = ''} = props;
  return (
    <div className={'flex ' + className}>
      {types.map((type, i) => (
        <div key={`type-${type}-${i}`} style={{backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS]}}
          className={'p-1 mx-1 text-xs leading-3 text-black rounded-full w-6 h-6 shadow group relative'}>
          <img className="w-full h-full inline-flex" src={require('../../assets/type-icons/' + type + '.svg')} alt={'Pokemon ' + type + ' icon'}/>
          <div className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-sans text-white opacity-0 group-hover:opacity-100">
            <span className="absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
            {type}
          </div>
        </div>
      ))}
    </div>

  );
};

export default Types;
