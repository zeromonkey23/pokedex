import {useEffect, useState} from 'react';

import {API_URL} from '../../constants/api';
import createParams from '../../helpers/createParams';
import type {InputParams, NamedAPIResourceList} from '../../types/api';

import type {Pokemon} from './View.types';

const useView = () => {
  const [params, setParams] = useState<InputParams>({
    limit: 9, offset: 0
  });
  const [loading, setLoading] = useState(false);

  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

  const getData = async () => {
    setLoading(true);
    const pokemonData: Array<Pokemon> = [];
    await fetch(`${API_URL}/pokemon?${createParams(params)}`, {
      cache: 'default',
    })
      .then(res => res.json())
      .then(async (data: NamedAPIResourceList) => {
        await Promise.all(
          data.results.map((async (el) => {
            const pokemon = await getPokemonData(el.url);
            if (pokemon) {
              pokemon.stringTypes = pokemon.types.map(el => el.type.name);
              pokemonData.push(pokemon);
            }
          }))
        );
      }, (error) => {
        console.error(error.message);
      });
    setPokemons((prevState) => [...prevState, ...pokemonData]);
    setLoading(false);
  };

  const getPokemonData = async (url: string) => {
    return await fetch(url, {cache: 'default'})
      .then(res => res.json())
      .then((data: Pokemon) => {
        return data;
      }, (error) => {
        console.error(error.message);
        return null;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return {pokemons, loading};
};

export default useView;