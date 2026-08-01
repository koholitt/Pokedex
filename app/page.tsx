import { getPokemon } from "@/lib/api";
import { Button, Input } from "@base-ui/react";

export default async function Home() {
  const data = await getPokemon("pikachu");
  console.log(data);
  return (
    <>
      <div>
        <form action="">
          <Input type="text"></Input>
          <Button type="button">Filters</Button>
        </form>
      </div>

      <div>content</div>

      <div>footer?</div>
    </>
  );
}
