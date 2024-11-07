// @ts-nocheck
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePagination = () => {
    const paginationArray = [1]; // Start with page 1
    if (totalPages === 1) return paginationArray; // Return [1] if there’s only one page

    if (currentPage > 3) {
      paginationArray.push("...");
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(currentPage + 2, totalPages - 1);

    for (let i = start; i <= end; i++) {
      paginationArray.push(i);
    }

    if (currentPage < totalPages - 2) {
      paginationArray.push("...");
    }

    paginationArray.push(totalPages); // End with the last page

    return paginationArray;
  };

  const paginationArray = generatePagination();

  return (
    <nav>
      <ul className="inline-flex gap-1 md:gap-2 text-base h-10 items-center">
        {/* Previous button */}
        <li
          className={`size-6 md:size-9 bg-gray-400 rounded-full p-2 flex justify-center items-center ${
            currentPage === 1 && "opacity-50 pointer-events-none"
          }`}
        >
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <ChevronLeft color="white" className="size-3 md:size-5"/>
          </button>
        </li>

        {/* Pagination Numbers */}
        {paginationArray.map((page, index) => (
          <li
            key={index}
            className={`size-8 md:size-10 ${
              page === currentPage ? "bg-primary text-white" : "text-gray-500"
            } rounded-full p-2 flex justify-center items-center`}
          >
            {typeof page === "number" ? (
              <button onClick={() => onPageChange(page)}>{page}</button>
            ) : (
              <span>{page}</span>
            )}
          </li>
        ))}

        {/* Next button */}
        <li
          className={`size-6 md:size-9 bg-gray-400 rounded-full p-2 flex justify-center items-center ${
            currentPage === totalPages && "opacity-50 pointer-events-none"
          }`}
        >
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          >
            <ChevronRight color="white" className="size-3 md:size-5"/>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
