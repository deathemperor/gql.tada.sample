import { useQuery } from "@apollo/client";
import { graphql } from "../graphql";

import { PokemonItem, PokemonItemFragment } from "./PokemonItem";
import { CLAIM_DETAIL_QUERY } from "../queries";

const PokemonList = () => {
  // const [result] = useQuery({ query: PokemonsQuery });
  const { data } = useQuery(CLAIM_DETAIL_QUERY, {
    variables: { claimId: "" },
  });

  // const { data, fetching, error } = result;
  // const { data: data1 } = result;
  // const { data: data2 } = result1;

  return <div></div>;
};

export { PokemonList };
