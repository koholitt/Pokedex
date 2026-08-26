import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PokemonGrid from "@/components/pokemonGrid";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <form action="">
          <Input type="text"></Input>
          <Button type="button">Filters</Button>
        </form>
      </div>

      <PokemonGrid />
    </div>
  );
}
