import { getPokemon } from "@/lib/api";

export default async function pokemonInformation() {
  const pokemonInfo = getPokemon();
  console.log(pokemonInfo);

  return <div>All the pokemon information here</div>;
}
