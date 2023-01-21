import type {ChangeEvent} from 'react';
import { useEffect, useState} from 'react';
import type { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';

import {API_URL} from '../../constants/api';
import {GEN_OPT_MAP} from '../../constants/optionMap';
import createParams from '../../utils/createParams';
import type {InputParams, NamedAPIResourceList} from '../../types/api';
import type {DropdownOption} from '../../types/forms';
import type {Pokemon, Species} from '../../types/pokemon';

const useView = () => {
  const params: InputParams = { limit: 9, offset: 0 };
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [listUrl, setListUrl] = useState('');
  const [hasData, setHasData] = useState(true);
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
  const [selectedPokemons, setSelectedPokemons] = useState<Array<Pokemon>>([]);

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (hasData) {
        getData(listUrl);
      }
    }
  };

  const getData = async (url?: string, opt = {applyFilter: false}) => {
    const {applyFilter} = opt;
    setLoading(true);
    const pokemonData: Array<Pokemon> = [];
    await fetch(url || `${API_URL}/pokemon?${createParams(params)}`, {
      cache: 'default',
    })
      .then(res => res.json())
      .then(async (data: NamedAPIResourceList) => {
        setListUrl(data.next || '');
        setHasData(Boolean(data.next));
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
    const sortedPokemon = pokemonData.sort((a, b) => a.id - b.id);
    setLoading(false);
    if (applyFilter) {
      return sortedPokemon;
    }
    setPokemons((prevState) => [...prevState, ...sortedPokemon]);
  };

  const getPokemonData = async (url: string) => {
    return await fetch(url, {cache: 'default'})
      .then(res => res.json())
      .then(async (data: Pokemon) => {
        data.speciesDetail = await getPokemonSpecies(data.species.url);
        return data;
      }, (error) => {
        console.error(error.message);
        return null;
      });
  };

  const getPokemonSpecies = async (url: string) => {
    return await fetch(url, {cache: 'default'})
      .then(res => res.json())
      .then((data: Species) => {
        return data;
      }, (error) => {
        console.error(error.message);
        return null;
      });
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
      let filteredPokemon: Array<Pokemon> = await getData(`${API_URL}/pokemon?limit=1200&offset=0`, {applyFilter: true}) || [];
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
      getData(`${API_URL}/pokemon?limit=9&offset=0`);
    }
  };

  const onSelectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemons.length === 3) {
      Swal.fire({
        title: 'Failed to add to comparison!',
        text: 'Maximum pokemon to compare is 3!',
        icon: 'warning',
        confirmButtonText: 'OK',
      } as SweetAlertOptions);
      return;
    }
    let filterPokemon = [...pokemons];
    filterPokemon = filterPokemon.filter((el) => el.name !== pokemon.name);
    setPokemons(filterPokemon);
    setSelectedPokemons((prevState) => [...prevState, pokemon]);
  };

  const onRemoveSelectedPokemon = (pokemon: Pokemon) => {
    let filterPokemon = [...selectedPokemons];
    filterPokemon = filterPokemon.filter((el) => el.name !== pokemon.name);
    setSelectedPokemons(filterPokemon);
  };

  /*useEffect for initializing data on the first load*/
  useEffect(() => {
    getGenerationData();
    getTypeData();
  }, []);

  return {
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
  };
};

export default useView;