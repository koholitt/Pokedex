import PokemonGrid from "@/components/pokemon-grid";
import Search from "@/components/search";
import { getPokemon } from "@/lib/api";

//returns parameters for URL state
export default async function Home(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const allPokemon = await getPokemon();

  const filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col items-center">
      <Search />

      <PokemonGrid pokemonList={filteredPokemon} />
    </div>
  );
}
