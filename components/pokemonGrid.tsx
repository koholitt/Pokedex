import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getPokemon } from "@/lib/api";

export default async function PokemonGrid() {
  const pokemonList = await getPokemon();
  return (
    <div>
      {pokemonList?.map((pokemon) => {
        if (pokemon.id <= 1025) {
          return (
            <Card key={pokemon.id}>
              <CardHeader>
                <CardTitle>{pokemon.id}</CardTitle>
              </CardHeader>
              <CardDescription>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                  unoptimized
                />
                <p>{pokemon.name}</p>
              </CardDescription>
            </Card>
          );
        }
      })}
    </div>
  );
}
