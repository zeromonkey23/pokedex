import React from 'react';

import getPokemonBG from '../../helpers/getPokemonBG';
import noop from '../../utils/noop';
import toTitleCase from '../../utils/toTitleCase';
import Button from '../Button/View';
import Types from '../Types/View';

import type {CardProps} from './View.types';

const Card = (props: CardProps) => {
  const {
    name,
    types,
    image,
    id,
    className = '',
    height,
    weight,
    hoverable = true,
    hasBookmarked = false,
    showActionBtn = false,
    actionBtnText = 'See Detail',
    showBookmark = false,
    onClick = noop,
    onClickBookmark = noop,
  } = props;
  return (
    <div className={`transition ease-in-out delay-150 ${hoverable ? 'hover:-translate-y-8' : ''} ${className}`}>
      <div className="bg-white w-60 inline-block rounded-xl relative shadow-xl p-4">
        <div className="w-54 inline-block rounded-xl relative shadow-inner shadow-black mb-2" style={getPokemonBG(types)}>
          <div className="relative -mt-20 -translate-y-0.5 transform">
            <img className="drop-shadow-2xl shadow-black" src={image} alt={`Image of ${name}`}/>
          </div>
          <div className="bg-slate-500 rounded-b-xl flex justify-between p-2 font-mono shadow-inner">
            <span className="text-white">#{String(id).padStart(3, '0')}</span>
            <Types className="justify-end" types={types}/>
          </div>
        </div>
        <div className="mt-1 text-2xl font-extrabold">{toTitleCase(name)}</div>
        <div className="mt-6 flex justify-between text-center">
          <div>
            <p className="text-xl font-bold">{height/10}<span className="text-xs">m</span></p>
            <p className="text-xs text-gray-400">Height</p>
          </div>
          <div>
            <p className="text-xl font-bold">{weight/10}<span className="text-xs">kg</span></p>
            <p className="text-xs text-gray-400">Weight</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end items-center">
          {showActionBtn && <Button className="mr-2" onClick={onClick}>{actionBtnText}</Button>}
          {showBookmark && <div onClick={onClickBookmark} className="hover:cursor-pointer">
            {!hasBookmarked ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-6 h-6 hover:text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"/>
              </svg>
            }
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Card;