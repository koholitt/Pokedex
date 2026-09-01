import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Search() {
  return (
    <div>
      <form action="">
        <Input type="text"></Input>
        <Button type="button">Filters</Button>
      </form>
    </div>
  );
}
