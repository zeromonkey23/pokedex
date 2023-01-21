import React from 'react';
import {render, screen} from '@testing-library/react';

import View from '../View';

jest.mock('../../../components/Card/View', () => () => <div>Card</div>);
jest.mock('../../../components/CardSkeleton/View', () => () => <div>CardSkeleton</div>);
jest.mock('../../../components/InputSearch/View', () => () => <div>InputSearch</div>);
jest.mock('../../../components/Select/View', () => () => <div>Select</div>);

describe('Pokemon List View', () => {

  it('should render correctly', () => {
    render(<View/>);
    const pokemon = screen.getByText('Pokémon List');
    const inputSearch = screen.getByText('InputSearch');
    expect(pokemon).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
  });

});