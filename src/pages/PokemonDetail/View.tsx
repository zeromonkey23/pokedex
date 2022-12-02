import React from 'react';

import Abilities from '../../components/Abilities/View';
import Card from '../../components/Card/View';
import Moves from '../../components/Moves/View';
import Stats from '../../components/Stats/View';

import useView from './View.hooks';

const View = () => {
  const { pokemon } = useView();
  const { name, id, stringTypes, sprites, height, weight, stats, abilities, moves } = pokemon || {};
  return (
    <>
      <h1 className="font-bold leading-tight text-4xl px-5 pt-5 mt-0 mb-5">Pokémon Detail</h1>
      <div className="flex flex-wrap justify-around items-start py-10">
        <Card name={name || ''} id={id || 0} className="mx-2 w-1/4"
          types={stringTypes || []} image={sprites?.other.home.front_default || ''}
          height={height || 0} weight={weight || 0} hoverable={false}/>
        <div className="w-3/5 flex flex-col">
          <Abilities abilities={abilities || []} className="mb-4"/>
          <Stats stats={stats || []} className="mb-4"/>
          <Moves moves={moves || []}/>
        </div>
      </div>
    </>
  );
};

export default View;