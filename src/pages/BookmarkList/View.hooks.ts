import type {ChangeEvent} from 'react';
import { useEffect, useState} from 'react';
import Swal from 'sweetalert2';

import {API_URL} from '../../constants/api';
import {GEN_OPT_MAP} from '../../constants/optionMap';
import type {NamedAPIResourceList} from '../../types/api';
import type {DropdownOption} from '../../types/forms';
import type {Pokemon} from '../../types/pokemon';

const useView = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [genOption, setGenOption] = useState<Array<DropdownOption>>([]);
  const [typeOption, setTypeOption] = useState<Array<DropdownOption>>([]);
  const [searchValue, setSearchValue] = useState('');
  const [genFilterValue, setGenFilterValue] = useState('');
  const [typeFilterValue, setTypeFilterValue] = useState('');
  const [filterValue, setFilterValue] = useState({
    search: '',
    generation: '',
    type: '',
  });

  const getData = () => {
    const pokemonList = JSON.parse(localStorage.getItem('myPokemonList') || '') as Array<Pokemon>;
    const sortedPokemon = pokemonList.sort((a, b) => a.id - b.id);
    setPokemons(sortedPokemon.map(el => {
      el.hasBookmarked = true;
      return el;
    }));
    return pokemonList;
  };

  const getGenerationData = async () => {
    fetch(`${API_URL}/generation`, {cache: 'default'})
      .then(res => res.json())
      .then((data: NamedAPIResourceList) => {
        setGenOption(data.results.map((el) => ({
          label: GEN_OPT_MAP[el.name],
          value: el.name,
        })));
      }, (error) => {
        console.error(error.message);
      });
  };

  const getTypeData = async () => {
    fetch(`${API_URL}/type`, {cache: 'default'})
      .then(res => res.json())
      .then((data: NamedAPIResourceList) => {
        setTypeOption(data.results.map((el) => ({
          label: el.name,
          value: el.name,
        })));
      }, (error) => {
        console.error(error.message);
      });
  };

  const onChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onChangeGenFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setGenFilterValue(value);
    onChangeFilter({generation: value});
  };

  const onChangeTypeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setTypeFilterValue(value);
    onChangeFilter({type: value});
  };

  const onChangeFilter = (filter: {search?: string, generation?: string, type?: string}) => {
    setFilterValue((prevState) => ({...prevState, ...filter}));
    onApplyFilter({...filterValue, ...filter});
  };

  const onApplyFilter = async (filter: {search?: string, generation?: string, type?: string}) => {
    setPokemons([]);
    const {search, type, generation} = filter;
    if (search || type || generation) {
      let filteredPokemon: Array<Pokemon> = getData() || [];
      if (search) {
        filteredPokemon = filteredPokemon.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
      }
      if (generation) {
        filteredPokemon = filteredPokemon.filter((el) => el.speciesDetail?.generation.name === generation);
      }
      if (type) {
        filteredPokemon = filteredPokemon.filter((el) => el.stringTypes.includes(type));
      }
      setPokemons(filteredPokemon);
    }
    if (!search && !type && !generation) {
      getData();
    }
  };

  const onClickBookmark = (pokemon: Pokemon) => {
    const {hasBookmarked, id} = pokemon;
    const pokemonList = JSON.parse(localStorage.getItem('myPokemonList') || '') as Array<Pokemon>;
    const newPokemonList = hasBookmarked ? pokemonList.filter(el => el.id !== id) : [...pokemonList, pokemon];
    localStorage.setItem('myPokemonList', JSON.stringify(newPokemonList));
    setPokemons(pokemons.map(el => {
      if (el.id === id) {
        el.hasBookmarked = !hasBookmarked;
      }
      return el;
    }));
    Swal.mixin({
      toast: true,
      text: hasBookmarked ? 'Pokemon removed from bookmark': 'Pokemon successfully bookmarked',
      position: 'top-right',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 1500,
    }).fire();
    getData();
  };

  /*useEffect for initializing data on the first load*/
  useEffect(() => {
    getData();
    getGenerationData();
    getTypeData();
  }, []);

  return {
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
  };
};

export default useView;