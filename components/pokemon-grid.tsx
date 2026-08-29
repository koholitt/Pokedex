import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getPokemon } from "@/lib/api";

export default async function PokemonGrid() {
  const pokemonList = await getPokemon();
  return (
    <div className="flex justify-evenly flex-wrap gap-4">
      {pokemonList?.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            className="w-100 flex flex-col items-center duration-300 hover:cursor-pointer hover:scale-105"
          >
            <CardHeader>
              <CardTitle>{pokemon.id}</CardTitle>
            </CardHeader>
            <CardDescription>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                width={250}
                height={200}
                unoptimized
              />
              <p className="text-center text-black">{pokemon.name}</p>
            </CardDescription>
          </Card>
        );
      })}
    </div>
  );
}
