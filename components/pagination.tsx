import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Pagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (event: React.ChangeEvent<HTMLUListElement>) => {
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
        {Array.from({ length: 5 }).map((item, index) => (
          <li key={index}>{index}</li>
        ))}
      </ul>
    </div>
  );
}
