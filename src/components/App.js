import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'antd';
import 'antd/dist/antd.min.css';
import { Button } from 'antd';
import { pokemonFetchStarted, pokemonFetchSucceded } from '../actions/index.js';
import {
  POKEAPI_URL,
  DEFAULT_LIMIT,
  INIT_TEXT,
  DEFAULT_OFFSET,
  BUTTON_COLOR,
  CENTER,
} from '../constants/index.js';
import pokemonTableColumns from './pokemonTableColumns.js';
import pokedex from '../images/pokedex.jpg';

const App = () => {
  //constants selectors

  const pokemons = useSelector((state) => state.pokemons);
  const count = useSelector((state) => state.count);
  const offset = useSelector((state) => state.offset);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const transformPokemonDetailToPokemon = (pokemonDetail) => {
    console.log(pokemonDetail.moves);
    const movementNames = pokemonDetail.moves
      .slice(0, 5)
      .map((move) => move.move.name)
      .join(', ');

    console.log(movementNames);

    const pokemon = {
      name: pokemonDetail.name,
      movements: movementNames,
      sprite: pokemonDetail.sprites.other.dream_world.front_default,
    };

    return pokemon;
  };

  const getPokemonsFromPokeApi = async (offset = DEFAULT_OFFSET) => {
    dispatch(pokemonFetchStarted());

    const pokemonListResponse = await fetch(
      ` ${POKEAPI_URL}?limit=${DEFAULT_LIMIT}&offset=${offset}`
    );
    const pokemonList = await pokemonListResponse.json();

    const pokemons = await Promise.all(
      pokemonList.results.map(async (pokemonListItem) => {
        const pokemonDetailResponse = await fetch(pokemonListItem.url);
        const pokemonDetail = await pokemonDetailResponse.json();

        const pokemon = transformPokemonDetailToPokemon(pokemonDetail);

        return pokemon;
      })
    );

    dispatch(pokemonFetchSucceded(pokemons, pokemonList.count, offset));
  };

  const goToNextPage = () => {
    getPokemonsFromPokeApi(offset + DEFAULT_LIMIT);
  };

  const goToPreviousPage = () => {
    getPokemonsFromPokeApi(offset - DEFAULT_LIMIT);
  };

  const pagination = (
    <p style={{ margin: 10 }}>
      {offset + 1}-{offset + pokemons.length}/{count}
    </p>
  );

  const isNextPageAvailable = offset < count - DEFAULT_LIMIT;

  const isPreviousPageAvailable = offset > 0;

  return (
    <>
      {pokemons.length > 0 ? (
        <>
          <Table
            loading={loading}
            dataSource={pokemons}
            columns={pokemonTableColumns}
            pagination={{ position: ['none'] }}
          />

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: CENTER,
              alignItems: CENTER,
              border: 'none',
            }}
          >
            <Button
              style={{
                backgroundColor: BUTTON_COLOR,
                margin: 20,
              }}
              onClick={() => getPokemonsFromPokeApi()}
              type="primary"
            >
              Reset
            </Button>
            <Card
              style={{
                width: 300,
                height: 80,
                margin: 20,
                border: '2px solid #08979c',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: CENTER,
                }}
              >
                <Button
                  disabled={!isPreviousPageAvailable}
                  style={{ backgroundColor: BUTTON_COLOR }}
                  onClick={() => goToPreviousPage()}
                  type="primary"
                >
                  Previous
                </Button>

                {pagination}

                <Button
                  disabled={!isNextPageAvailable}
                  style={{ backgroundColor: BUTTON_COLOR }}
                  onClick={() => goToNextPage()}
                  type="primary"
                >
                  Next
                </Button>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: CENTER,
            alignItems: CENTER,
            textAlign: CENTER,
          }}
        >
          <Card
            hoverable
            style={{
              margin: 50,
              width: 500,
              height: 420,
            }}
            cover={<img alt="pokedex" src={pokedex} />}
          >
            <strong>{INIT_TEXT}</strong>
            <div style={{ display: 'flex', justifyContent: CENTER }}>
              <Button
                disabled={loading}
                style={{
                  margin: 10,
                  display: 'flex',
                  backgroundColor: BUTTON_COLOR,
                }}
                onClick={() => getPokemonsFromPokeApi()}
                type="primary"
              >
                Pokédex
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default App;
