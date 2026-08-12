import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPokemon } from "@/lib/api";
import { Button, Input } from "@base-ui/react";

export default async function Home() {
  const data = await getPokemon("");
  console.log(data);
  return (
    <>
      <div>
        <form action="">
          <Input type="text"></Input>
          <Button type="button">Filters</Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pokemon Number</CardTitle>
        </CardHeader>

        <CardDescription>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
            alt="Pokemon image"
          />
          <p>Pokemon Name</p>
        </CardDescription>
      </Card>

      <p>add multiple cards of pokemons</p>

      <div>footer?</div>
    </>
  );
}
