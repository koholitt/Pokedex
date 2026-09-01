import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type PokemonTuple = [id: string, name: string, url: string];

interface PokemonProps {
  pokemonList: PokemonTuple[];
}

export default function PokemonGrid({ pokemonList }: PokemonProps) {
  return (
    <div className="flex justify-evenly flex-wrap gap-4">
      {pokemonList?.map(([id, name, url]) => {
        return (
          <Card
            key={id}
            className="w-100 flex flex-col items-center duration-300 hover:cursor-pointer hover:scale-105"
          >
            <CardHeader>
              <CardTitle>{id}</CardTitle>
            </CardHeader>
            <CardDescription>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={name}
                width={250}
                height={200}
                unoptimized
              />
              <p className="text-center text-black">{name}</p>
            </CardDescription>
          </Card>
        );
      })}
    </div>
  );
}
