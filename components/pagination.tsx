"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@base-ui/react";

export default function Pagination({ pageNumber }: { pageNumber: number }) {
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
      <ul>
        {Array.from({ length: Math.ceil(pageNumber / 12) }).map((value, index) => {
          return (
            <li key={index}>
              <Button
                value={index + 1}
                onClick={(e) => handlePagination(e.currentTarget.value)}
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
