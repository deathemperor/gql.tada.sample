import { useQuery } from 'urql';
import { graphql } from '../graphql';

import { PokemonItem, PokemonItemFragment } from './PokemonItem';
import { CLAIM_DETAIL_QUERY } from '../queries';

// prettier-ignore
const PokemonsQuery = graphql(`
  query Pokemons ($limit: Int = 10) {
    pokemons(limit: $limit) {
      id
      ...PokemonItem
    }
  }
`, [PokemonItemFragment]);

const PokemonList = () => {
  const [result] = useQuery({ query: PokemonsQuery });
  const [result1] = useQuery({
    query: CLAIM_DETAIL_QUERY,
    variables: { claimId: '' },
  });

  const { data, fetching, error } = result;
  const { data: data1 } = result;

  if (error) {
    return (
      <>
        <h3>Oh no!</h3>
        <pre>{error.message}</pre>
      </>
    );
  } else if (fetching || !data) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {data.pokemons ? (
        <ul>
          {data.pokemons.map((pokemon, index) => (
            <PokemonItem data={pokemon} key={pokemon?.id || index} />
          ))}
        </ul>
      ) : (
        <h3>Your Pokedex is empty.</h3>
      )}
    </div>
  );
};

export { PokemonList };
