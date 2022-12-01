import React from 'react';

import getPokemonBG from '../../helpers/getPokemonBG';
import toTitleCase from '../../helpers/toTitleCase';
import Types from '../Types/View';

import type {CardProps} from './View.types';

const Card = (props: CardProps) => {
  const {name, types, image, id, className = '', height, weight} = props;
  return (
    <div className={'py-10 hover:-translate-y-8 transition ease-in-out delay-150 hover:cursor-pointer ' + className}>
      <div className="bg-white w-60 inline-block rounded-xl relative shadow-xl p-4">
        <div className="w-54 inline-block rounded-xl relative shadow-inner shadow-black mb-2" style={getPokemonBG(types)}>
          <div className="relative -mt-20 -translate-y-0.5 transform">
            <img src={image} alt={`Image of ${name}`}/>
          </div>
          <div className="bg-slate-500 rounded-b-xl flex justify-between p-2 font-mono">
            <span className="text-white">#{String(id).padStart(3, '0')}</span>
            <Types className="justify-end" types={types}/>
          </div>
        </div>
        <div className="mt-1 text-2xl font-extrabold">{toTitleCase(name)}</div>
        <div className="mt-6 flex justify-between text-center">
          <div>
            <p className="text-xl font-bold">{height/10}<sub>m</sub></p>
            <p className="text-xs text-gray-400">Height</p>
          </div>
          <div>
            <p className="text-xl font-bold">{weight/10}<sub>kg</sub></p>
            <p className="text-xs text-gray-400">Weight</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;