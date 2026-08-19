"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<{ id: number; name: string }[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`)
      .then((res) => res.json())
      .then(async (data) => {
        const list = await Promise.all(
          data.results.map(async (pokemon: { id: string; url: string }) => {
            const response = await fetch(pokemon.url);

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            return {
              id: data.id,
              name: data.name,
            };
          }),
        );
        setPokemonList(list);
        setLoading(false);
      });
  }, [offset]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <form action="" className="flex gap-4 m-5">
          <Input type="text" className="w-80 border-gray-500"></Input>
          <Button type="button">Filters</Button>
        </form>
      </div>

      <div className="flex flex-wrap gap-4 justify-evenly m-5">
        {pokemonList?.map((pokemon) => {
          if (pokemon.id <= 1025) {
            return (
              <Card
                key={pokemon.id}
                className="flex items-center w-100 cursor-pointer hover:scale-105 duration-200 "
              >
                <CardHeader className="flex items-center">
                  <CardTitle>{pokemon.id}</CardTitle>
                </CardHeader>
                <CardDescription className="flex flex-col items-center">
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

      <div className="flex gap-4 m-5">
        <Button
          onClick={() => (offset != 0 ? setOffset(offset - 12) : setOffset(0))}
          className="bg-transparent hover:bg-transparent hover:cursor-pointer hover:border-gray-500 text-black "
        >
          Previous
        </Button>
        <Button
          onClick={() => (offset >= 0 ? setOffset(offset + 12) : setOffset(0))}
          className="bg-transparent hover:bg-transparent hover:cursor-pointer hover:border-gray-500 text-black "
        >
          Next
        </Button>
      </div>
    </div>
  );
}
