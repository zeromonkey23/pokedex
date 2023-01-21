import React from 'react';

import slugToTitle from '../../utils/slugToTitle';

import type {AbilitiesProps} from './View.types';

const Abilities = (props: AbilitiesProps) => {
  const {abilities, className} = props;
  return (
    <div className={'bg-white rounded-xl shadow p-4 ' + className}>
      <h3 className="font-bold">Abilities</h3>
      <div className="text-sm mt-4">
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
          {abilities.map((ability, i) => (
            <li className={`py-2 px-4 w-full ${i === 0 ? 'rounded-t-lg' : '' } 
                    ${i === abilities.length - 1 ? 'rounded-b-lg' : ''} 
                    border-b border-gray-200`} key={`ability-${i}`}>
              {slugToTitle(ability.ability.name)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Abilities;