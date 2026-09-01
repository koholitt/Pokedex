"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type PokemonTuple = [id: string, name: string, url: string];

interface PokemonProps {
  pokemonList: PokemonTuple[];
}

export default function Search({ pokemonList }: PokemonProps) {
  const searchParam = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const currentQuery = searchParam.get("search") || "";

  const filteredPokemon = pokemonList.filter(([id, name, url]) =>
    name.startsWith(currentQuery.toLowerCase()),
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
