import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getPokemon } from "@/lib/api";

export default async function Search() {
  const pokemonList = await getPokemon();

  const searchParam = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const currentQuery = searchParam.get("seach") || "";

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.startsWith(currentQuery.toLowerCase()),
  );

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParam);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div>
      <form action="">
        <Input type="text"></Input>
        <Button type="button">Filters</Button>
      </form>
    </div>
  );
}
