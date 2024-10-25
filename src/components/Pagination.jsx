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
      <ul className="inline-flex md:gap-1 text-base h-10 items-center">
        {/* Previous button */}
        <li
          className={`w-[36px] h-[36px] bg-gray-400 rounded-full p-[8px] flex justify-center items-center ${
            currentPage === 1 && "opacity-50 pointer-events-none"
          }`}
        >
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <ChevronLeft color="white" />
          </button>
        </li>

        {/* Pagination Numbers */}
        {paginationArray.map((page, index) => (
          <li
            key={index}
            className={`w-[40px] h-[40px] ${
              page === currentPage ? "bg-primary text-white" : "text-[#666666]"
            } rounded-full p-[8px] flex justify-center items-center`}
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
          className={`w-[36px] h-[36px] bg-gray-400 rounded-full p-[8px] flex justify-center items-center ${
            currentPage === totalPages && "opacity-50 pointer-events-none"
          }`}
        >
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          >
            <ChevronRight color="white" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
