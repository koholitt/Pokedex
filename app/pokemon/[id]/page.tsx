import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getPokemonById, getPokemonDescription, getPokemonAbilities } from "@/lib/api";

interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export default async function PokemonInformation(props: { params: Promise<{ id: string }> }) {
  const resolvedParams = await props.params;

  const pokemonInfo = await getPokemonById(resolvedParams.id);

  const [description, abilities] = await Promise.all([
    getPokemonDescription(pokemonInfo.species.url),
    getPokemonAbilities(pokemonInfo.abilities),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <Card className="mx-auto max-w-6xl ">
        <div className="grid md:grid-cols-2">
          <div>
            <CardHeader className="w-full text-center md:text-left">
              <CardTitle className="text-3xl font-bold capitalize">
                {pokemonInfo.name}
                <span className="ml-2 text-lg font-medium text-slate-400">
                  #{String(pokemonInfo.id).padStart(4, "0")}
                </span>
              </CardTitle>
            </CardHeader>

            <div className="flex w-full items-center justify-center">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
                alt={pokemonInfo.name}
                width={420}
                height={360}
                unoptimized
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {pokemonInfo.types.map((t: PokemonType) => (
                <span
                  key={t.slot}
                  className="rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold capitalize text-white"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 md:p-10">
            <CardDescription>
              <p className="max-w-2xl sm:text-lg">{description}</p>

              <div className="mt-8 rounded-2xl bg-sky-500 p-6 text-white">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Abilities</h2>
                </div>

                <div className="space-y-4">
                  {abilities.map((a: { name: string; effect: string }) => (
                    <div key={a.name} className="rounded-xl bg-white/15 p-4">
                      <div className="flex items-start gap-3">
                        <div className="">
                          <strong className="font-bold capitalize text-white">
                            {a.name.replace("-", " ")}
                          </strong>

                          <p className=" text-sm leading-6 text-white/85">{a.effect}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
