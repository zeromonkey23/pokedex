import React from 'react';

import Abilities from '../../components/Abilities/View';
import Card from '../../components/Card/View';
import CardSkeleton from '../../components/CardSkeleton/View';
import InputSearch from '../../components/InputSearch/View';
import Moves from '../../components/Moves/View';
import Select from '../../components/Select/View';
import Stats from '../../components/Stats/View';

import useView from './View.hooks';

const View = () => {
  const {
    pokemons,
    loading,
    genOption,
    typeOption,
    searchValue,
    genFilterValue,
    typeFilterValue,
    selectedPokemons,
    onChangeGenFilter,
    onChangeTypeFilter,
    onChangeInputSearch,
    onChangeFilter,
    onSelectPokemon,
    onRemoveSelectedPokemon
  } = useView();
  return (
    <>
      <h1 className="font-bold leading-tight text-4xl px-5 pt-5 mt-0 mb-5">Pokémon Comparison</h1>
      <p>{selectedPokemons.length === 0 ? 'Select pokemon below to compare' : 'Click pokemon to remove'}</p>
      <div className="flex justify-around min-h-[200px] w-full overflow-x-auto py-10">
        {selectedPokemons.map((pokemon, i) => (
          <div key={`selected-pokemon-${i}`} className="flex flex-col">
            <Card name={pokemon.name} id={pokemon.id} className="mx-2 py-10" key={`pokemon-${i}`}
              types={pokemon.stringTypes} image={pokemon.sprites.other.home.front_default}
              height={pokemon.height} weight={pokemon.weight} onClick={() => onRemoveSelectedPokemon(pokemon)}/>
            <Abilities abilities={pokemon.abilities || []} className="mb-4"/>
            <Stats stats={pokemon.stats || []} className="mb-4"/>
            <Moves moves={pokemon.moves || []}/>
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-10">
        <div className="mr-3">
          <InputSearch value={searchValue} onChange={onChangeInputSearch}
            onEnter={() => onChangeFilter({search: searchValue})} placeholder="Search Pokemon"/>
        </div>
        <div className="mr-3 w-1/5">
          <Select className="!w-full" value={genFilterValue} onChange={onChangeGenFilter}>
            <option value="">All Generation</option>
            {genOption.map((gen, i) => (
              <option value={gen.value} key={`generation-opt-${i}`}>{gen.label}</option>
            ))}
          </Select>
        </div>
        <div className="w-1/5 mr-3">
          <Select className="!w-full" value={typeFilterValue} onChange={onChangeTypeFilter}>
            <option value="">All Types</option>
            {typeOption.map((type, i) => (
              <option value={type.value} key={`type-opt-${i}`}>{type.label}</option>
            ))}
          </Select>
        </div>
      </div>
      {pokemons.length === 0 && (
        <p>Start search your pokemon...</p>
      )}
      <div className="flex flex-wrap justify-around">
        {pokemons.map((pokemon, i) => (
          <Card name={pokemon.name} id={pokemon.id} className="mx-2 py-10" key={`pokemon-${i}`}
            types={pokemon.stringTypes} image={pokemon.sprites.other.home.front_default}
            height={pokemon.height} weight={pokemon.weight} onClick={() => onSelectPokemon(pokemon)}/>
        ))}
        {loading && [...Array(9)].map((el, i) => (<CardSkeleton key={`card-skeleton-${i}`}/>))}
      </div>
    </>
  );
};

export default View;