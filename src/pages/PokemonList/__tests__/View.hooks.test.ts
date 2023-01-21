import type {ChangeEvent} from 'react';
import {waitFor} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';

import {SINGLE_POKEMON_MOCK} from '../View.constants';
import useView from '../View.hooks';

describe('Pokemon List Hooks', () => {
  let result;
  beforeAll(() => {
    result = renderHook(useView).result;
  });

  it('should render correctly', async () => {
    await waitFor(() => result.current.getData());
    expect(result.current.pokemons.length).toBeGreaterThan(0);
  });

  it('should run onChangeInputSearch correctly', async () => {
    const evt = {
      target: {
        value: 'DATA',
      },
    };
    const { result } = renderHook(useView);
    await waitFor(() => result.current.onChangeInputSearch(evt as ChangeEvent<HTMLInputElement>));
    expect(result.current.searchValue).toBe(evt.target.value);
  });

  it('should run onChangeGenFilter correctly', async () => {
    const evt = {
      target: {
        value: 'Generation I',
      },
    };
    const { result } = renderHook(useView);
    await waitFor(() => result.current.onChangeGenFilter(evt as ChangeEvent<HTMLSelectElement>));
    expect(result.current.genFilterValue).toBe(evt.target.value);
  });

  it('should run onChangeTypeFilter correctly', async () => {
    const evt = {
      target: {
        value: 'water',
      },
    };
    const { result } = renderHook(useView);
    await waitFor(() => result.current.onChangeTypeFilter(evt as ChangeEvent<HTMLSelectElement>));
    expect(result.current.typeFilterValue).toBe(evt.target.value);
  });

  it('should run onClickBookmark correctly', async () => {
    const { result } = renderHook(useView);
    //await waitFor(() => result.current.getData());
    await waitFor(() => result.current.onClickBookmark(SINGLE_POKEMON_MOCK));
    const bookmarkedPokemon = result.current.pokemons.find(el => el.id === SINGLE_POKEMON_MOCK.id);
    const {hasBookmarked} = bookmarkedPokemon || {};
    expect(hasBookmarked).toBe(true);
  });

});