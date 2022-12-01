import React from 'react';

import Card from '../../components/Card/View';
import CardSkeleton from '../../components/CardSkeleton/View';

import useView from './View.hooks';

const View = () => {
  const {pokemons, loading} = useView();
  return (
    <div className="flex flex-wrap justify-around">
      {pokemons.map((pokemon, i) => (
        <Card name={pokemon.name} key={`pokemon-${i}`} id={pokemon.id} className="mx-2"
          types={pokemon.stringTypes} image={pokemon.sprites.other['official-artwork'].front_default}
          height={pokemon.height} weight={pokemon.weight}/>
      ))}
      {loading && [...Array(9)].map((el, i) => (<CardSkeleton key={`card-skeleton-${i}`}/>))}
    </div>
  );
};

export default View;