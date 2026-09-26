import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface pokemonAttributes {
  id: string;
  name: string;
  url: string;
}

interface pokemonArray {
  pokemonList: pokemonAttributes[];
}

export default function PokemonGrid({ pokemonList }: pokemonArray) {
  return (
    <div className="flex justify-evenly flex-wrap gap-4">
      {pokemonList?.map((pokemon) => {
        return (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <Card className="w-100 flex flex-col items-center duration-300 hover:cursor-pointer hover:scale-105">
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
          </Link>
        );
      })}
    </div>
  );
}
