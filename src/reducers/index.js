import {
  POKEMON_FETCH_STARTED,
  POKEMON_FETCH_SUCCEDED,
} from '../actions/actionTypes.js';
import { DEFAULT_OFFSET } from '../constants/index.js';

const initialState = {
  loading: false,
  pokemons: [],
  count: null,
  offset: DEFAULT_OFFSET,
};

export const pokemonReducers = (state = initialState, action) => {
  switch (action.type) {
    case POKEMON_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case POKEMON_FETCH_SUCCEDED:
      return {
        ...state,
        loading: false,
        pokemons: action.pokemons,
        count: action.count,
        offset: action.offset,
      };

    default:
      return state;
  }
};
