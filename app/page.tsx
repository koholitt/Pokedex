import PokemonGrid from "@/components/pokemon-grid";
import Search from "@/components/search";

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <Search />

      <PokemonGrid />
    </div>
  );
}
