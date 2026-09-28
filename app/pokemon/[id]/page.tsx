import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getPokemon } from "@/lib/api";

interface pokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export default async function PokemonInformation(props: { params: Promise<{ id: string }> }) {
  const resolvedParams = await props.params;
  const pokemonInfo = await getPokemon(resolvedParams.id);
  console.log(pokemonInfo);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {pokemonInfo.name} {pokemonInfo.id}
          </CardTitle>
        </CardHeader>
        <CardDescription>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
            alt={pokemonInfo.name}
            width={250}
            height={200}
            unoptimized
          />

          <p>description of the pokemon pokemonInfo.species requires fetch</p>
          <p>description of abilities pokemonInfo.abilities requires fetch</p>

          {pokemonInfo.types.map((e: pokemonTypes) => (
            <p key={e.slot}>{e.type.name}</p>
          ))}
        </CardDescription>
      </Card>
    </div>
  );
}
