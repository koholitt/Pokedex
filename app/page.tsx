import PokemonGrid from "@/components/pokemon-grid";
import Search from "@/components/search";
import { getPokemon } from "@/lib/api";
import Pagination from "@/components/pagination";

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

  //filter(value, index) Array.object[index];
  const showFilteredPokemon = filteredPokemon.filter((pokemon, index) => {
    if (currentPage != 1) {
      if (index > (currentPage - 1) * 12 && index <= currentPage * 12) {
        return pokemon;
      }
    } else {
      return index < currentPage * 12;
    }
  });

  return (
    <div className="flex flex-col items-center">
      <Search />

      <PokemonGrid pokemonList={showFilteredPokemon} />

      <Pagination maxPages={filteredPokemon.length} />
    </div>
  );
}
