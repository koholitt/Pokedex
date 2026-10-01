import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getPokemonById, getPokemonDescription, getPokemonAbilities } from "@/lib/api";

interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export default async function PokemonInformation(props: { params: Promise<{ id: string }> }) {
  const resolvedParams = await props.params;

  // get the base pokemon first - we need its species url and ability urls before we can fetch those
  const pokemonInfo = await getPokemonById(resolvedParams.id);

  // description and abilities don't depend on each other, so fetch both at once
  const [description, abilities] = await Promise.all([
    getPokemonDescription(pokemonInfo.species.url),
    getPokemonAbilities(pokemonInfo.abilities),
  ]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {pokemonInfo.name} #{pokemonInfo.id}
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

          <p>{description}</p>

          <div>
            {pokemonInfo.types.map((t: PokemonType) => (
              <span key={t.slot}>{t.type.name}</span>
            ))}
          </div>

          <div>
            {abilities.map((a: { name: string; effect: string }) => (
              <div key={a.name}>
                <strong>{a.name}</strong>: {a.effect}
              </div>
            ))}
          </div>
        </CardDescription>
      </Card>
    </div>
  );
}
