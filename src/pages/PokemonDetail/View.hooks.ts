import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {API_URL} from '../../constants/api';
import type {Pokemon} from '../../types/pokemon';

const useView = () => {
  const {name} = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getPokemonData = async () => {
    return await fetch(`${API_URL}/pokemon/${name}`, {cache: 'default'})
      .then(res => res.json())
      .then(async (data: Pokemon) => {
        data.stringTypes = data.types.map(el => el.type.name);
        setPokemon(data);
      }, (error) => {
        console.error(error.message);
        return null;
      });
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  return { pokemon };
};

export default useView;