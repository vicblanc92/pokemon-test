import {
  POKEMON_FETCH_STARTED,
  POKEMON_FETCH_SUCCEDED,
} from './actionTypes.js';

export const pokemonFetchStarted = () => ({
  type: POKEMON_FETCH_STARTED,
});

export const pokemonFetchSucceded = (pokemons, count, offset) => ({
  type: POKEMON_FETCH_SUCCEDED,
  pokemons: pokemons,
  count: count,
  offset: offset,
});
