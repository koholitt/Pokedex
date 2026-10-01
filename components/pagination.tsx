"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@base-ui/react";
export default function Pagination({ maxPages }: { maxPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePagination = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("page", value);
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <ul className="flex m-5 py-3 gap-5 overflow-x-scroll w-160 select-none">
        {/*Each page has 12 items */}
        {Array.from({ length: Math.ceil(maxPages / 12) }).map((value, index) => {
          return (
            <li key={index}>
              <Button
                className="hover:cursor-pointer hover:scale-130"
                onClick={() => handlePagination((index + 1).toString())}
              >
                {index + 1}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
