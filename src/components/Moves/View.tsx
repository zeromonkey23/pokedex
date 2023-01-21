import React from 'react';

import slugToTitle from '../../utils/slugToTitle';

import type {MovesProps} from './View.types';

const Moves = (props: MovesProps) => {
  const {moves, className} = props;
  return (
    <div className={'bg-white rounded-xl shadow p-4 ' + className}>
      <h3 className="font-bold">Moves</h3>
      <div className="text-sm mt-4 h-56 overflow-y-auto">
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
          {moves.map((move, i) => (
            <li className={`py-2 px-4 w-full ${i === 0 ? 'rounded-t-lg' : '' } 
                    ${i === moves.length - 1 ? 'rounded-b-lg' : ''} 
                    border-b border-gray-200`} key={`ability-${i}`}>
              {slugToTitle(move.move.name)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Moves;