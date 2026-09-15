"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@base-ui/react";

export default function Pagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  let pagesNumber = [1, 2, 3, 4, 5];

  const handlePagination = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setCurrentPage(12 / currentPage);
    const params = new URLSearchParams(searchParams);

    if (currentPage * 12 < 1025) {
      params.set("page", currentPage.toString());
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
        {pagesNumber.map((page, index) => {
          if (page == pagesNumber.length - 1 || pagesNumber.length - 1 != 1025) {
            pagesNumber[index] = page + 4;
            return (
              <li key={page}>
                <Button onClick={handlePagination}>{page}</Button>
              </li>
            );
          } else {
            return (
              <li key={page}>
                <a href="">{page}</a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
