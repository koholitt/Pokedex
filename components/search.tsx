import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface pokemonAtributes {
  id: string;
  name: string;
  url: string;
}

interface pokemonArray {
  pokemonList: pokemonAtributes[];
}

// function debounce(fn: Function, delay: number) {
//   let timeoutId: ReturnType<typeof setTimeout>;

//   return function (...args: string[]) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn(...args), delay);
//   };
// }

export default function Search({ pokemonList }: pokemonArray) {
  const [searchInput, setSearchInput] = useState("");

  const filteredList = pokemonList.filter((pokemon) => pokemon.name.startsWith(searchInput));

  return (
    <div>
      <form action="">
        <Input
          type="text"
          onChange={(e) => {
            setSearchInput(e.target.value);
            setTimeout(() => {
              const filterList = pokemonList.filter((pokemon) =>
                pokemon.name.startsWith(searchInput),
              );
            }, 500);
          }}
        ></Input>
        <Button type="button">Filters</Button>
      </form>
    </div>
  );
}
