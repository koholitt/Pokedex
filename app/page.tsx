import PokemonGrid from "@/components/pokemon-grid";
import Search from "@/components/search";
import { getPokemon } from "@/lib/api";

export default async function Home() {
  const allPokemon = await getPokemon();
  return (
    <div className="flex flex-col items-center">
      <Search pokemonList={allPokemon} />

      <PokemonGrid pokemonList={allPokemon} />
    </div>
  );
}
