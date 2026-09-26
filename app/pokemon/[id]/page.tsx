import { getPokemon } from "@/lib/api";

export default async function PokemonInformation(props: { params: Promise<{ id: string }> }) {
  const resolvedParams = await props.params;
  const pokemonInfo = await getPokemon(resolvedParams.id);
  console.log(pokemonInfo);

  return <div>All the pokemon information here</div>;
}
