import React from 'react';

import Card from '../../components/Card/View';
import InputSearch from '../../components/InputSearch/View';
import Select from '../../components/Select/View';

import useView from './View.hooks';

const View = () => {
  const {
    pokemons,
    genOption,
    typeOption,
    searchValue,
    genFilterValue,
    typeFilterValue,
    onChangeGenFilter,
    onChangeTypeFilter,
    onChangeInputSearch,
    onChangeFilter,
    onClickBookmark
  } = useView();
  return (
    <>
      <h1 className="font-bold leading-tight text-4xl px-5 pt-5 mt-0 mb-5">Pokémon Bookmark</h1>
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
      <div className="flex flex-wrap justify-around">
        {pokemons.map((pokemon, i) => (
          <Card key={`pokemon-${i}`} name={pokemon.name} id={pokemon.id} className="mx-2 py-10"
            types={pokemon.stringTypes} image={pokemon.sprites.other.home.front_default}
            height={pokemon.height} weight={pokemon.weight} onClick={() => window.open(`pokemon/${pokemon.name}`)}
            showBookmark onClickBookmark={() => onClickBookmark(pokemon)} hasBookmarked={pokemon.hasBookmarked}/>
        ))}
      </div>
    </>
  );
};

export default View;