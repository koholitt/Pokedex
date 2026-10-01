import PokemonGrid from "@/components/pokemon-grid";
import Search from "@/components/search";
import { getPokemon } from "@/lib/api";
import Pagination from "@/components/pagination";

interface pokemonAttributes {
  id: string;
  name: string;
  url: string;
}

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

  const filteredPokemon = allPokemon.filter((pokemon: pokemonAttributes) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  //separate the pages in 12 items each
  const showFilteredPokemon = filteredPokemon.slice((currentPage - 1) * 12, currentPage * 12);

  return (
    <div className="flex flex-col items-center">
      <Search />

      <PokemonGrid pokemonList={showFilteredPokemon} />

      <Pagination maxPages={filteredPokemon.length} />
    </div>
  );
}
