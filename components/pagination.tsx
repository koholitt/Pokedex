"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@base-ui/react";
import React, { useRef } from "react";
import { start } from "repl";

export default function Pagination({ maxPages }: { maxPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //create reference of <ul>
  const listRef = useRef<HTMLUListElement>(null);

  //ref uses values not needed for render
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - listRef.current.offsetLeft;
    scrollLeft.current = listRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !listRef.current) return;
    e.preventDefault(); //prevents text selection

    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    listRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div>
      <ul
        ref={listRef} // Attach the ref here
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex m-5 py-3 gap-5 overflow-x-scroll w-160 cursor-grab active:cursor-grabbing [scrollbar-width:none] select-none"
      >
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

      <p className="text-center text-gray-400">Drag and scroll to see more pages</p>
    </div>
  );
}
