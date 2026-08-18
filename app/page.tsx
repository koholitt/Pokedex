"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<
    { id: number; name: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=12")
      .then((res) => res.json())
      .then(async (data) => {
        const list = await Promise.all(
          data.results.map(async (pokemon: { id: string; url: string }) => {
            const response = await fetch(pokemon.url);

            if (!response.ok)
              throw new Error(`HTTP error! Status: ${response.status}`);

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
  }, []);

  return (
    <>
      <div>
        <form action="">
          <Input type="text"></Input>
          <Button type="button">Filters</Button>
        </form>
      </div>

      {pokemonList?.map((pokemon) => {
        return (
          <Card key={pokemon.id}>
            <CardHeader>
              <CardTitle>{pokemon.id}</CardTitle>
            </CardHeader>
            <CardDescription>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width={100}
                height={100}
                unoptimized
              />
              <p>{pokemon.name}</p>
            </CardDescription>
          </Card>
        );
      })}

      <p>hello</p>
    </>
  );
}
