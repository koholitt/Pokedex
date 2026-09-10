"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [input, setInput] = useState(searchParams.get("search")?.toString() || "");

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, 300);

  return (
    <div>
      <Input
        className="m-5 border-gray-400"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(event.target.value);
          handleSearch(e);
        }}
      ></Input>
    </div>
  );
}
