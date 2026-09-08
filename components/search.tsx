"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface pokemonAttributes {
  id: string;
  name: string;
  url: string;
}

interface pokemonArray {
  pokemonList: pokemonAttributes[]; //Array<pokemonAttributes[]>
}

export default function Search({ pokemonList }: pokemonArray) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <form action="onSubmit">
        <Input type="text" onChange={handleSearch}></Input>
      </form>
    </div>
  );
}
