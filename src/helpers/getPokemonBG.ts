import TYPE_COLORS from '../constants/typeColors';

const getPokemonBG = (types: string[]) => {
  return {
    background: `linear-gradient(
                   to right, 
                   ${TYPE_COLORS[types[0]]} 50%, 
                   ${TYPE_COLORS[types[1]] || TYPE_COLORS[types[0]]})`
  };
};
export default getPokemonBG;