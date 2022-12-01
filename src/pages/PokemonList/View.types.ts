import type {NamedResource} from '../../types/api';

export interface Ability {
  ability: NamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface GameIndice {
  game_index: number;
  version: NamedResource;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedResource;
  version_group: NamedResource;
}

export interface Move {
  move: NamedResource;
  version_group_details: VersionGroupDetail[];
}

export interface Sprites {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
  other: {
    'official-artwork': {
      front_default: string;
    }
  }
}


export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedResource;
}

export interface Type {
  slot: number;
  type: NamedResource;
}

export interface PokemonHeldItem {
  item: NamedResource;
  version_details: Array<PokemonHeldItemVersion>;
}

export interface PokemonHeldItemVersion {
  version: NamedResource;
  rarity: number;
}

export interface PokemonTypePast {
  generation: NamedResource;
  types: Type;
}

export interface Pokemon {
  abilities: Array<Ability>;
  base_experience: number;
  forms: Array<NamedResource>;
  game_indices: Array<GameIndice>;
  height: number;
  held_items: Array<PokemonHeldItem>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<Move>;
  name: string;
  order: number;
  past_types: Array<PokemonTypePast>;
  species: NamedResource;
  sprites: Sprites;
  stats: Array<Stat>;
  types: Array<Type>;
  stringTypes: string[];
  weight: number;
}
