import { FragmentOf, graphql, readFragment } from '../graphql';

export const PokemonItemFragment = graphql(`
  fragment PokemonItem on Pokemon {
    id
    name
  }
`);

interface Props {
  data: FragmentOf<typeof PokemonItemFragment> | null;
}

type CopayMechanismEnum = ReturnType<typeof graphql.scalar<'plan_copay_mechanisms_enum'>>;

const PokemonItem = ({ data }: Props) => {
  const pokemon = readFragment(PokemonItemFragment, data);
  if (!pokemon) {
    return null;
  }

  return <li>{pokemon.name}</li>;
};

export { PokemonItem };
