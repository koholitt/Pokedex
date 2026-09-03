"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PokemonGrid from "./pokemon-grid";

interface pokemonAttributes {
  id: string;
  name: string;
  url: string;
}

interface pokemonArray {
  pokemonList: pokemonAttributes[]; //Array<pokemonAttributes[]>
}

export default function Search({ pokemonList }: pokemonArray) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <form action="onSubmit">
        <Input
          type="text"
          onChange={(e) => {
            setSearchInput(e.target.value);
            setTimeout(() => {
              const filteredList = pokemonList.filter((pokemon) =>
                pokemon.name.startsWith(searchInput.toLowerCase()),
              );
              PokemonGrid({ pokemonList: filteredList });
            }, 500);
          }}
        ></Input>
        <Button type="button">Filters</Button>
      </form>
    </div>
  );
}
