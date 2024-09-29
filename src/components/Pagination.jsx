"use client";

import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

  const generatePagination = () => {
    const paginationArray = [];
    if (totalPages <= 1) return paginationArray; 

    paginationArray.push(1);

    if (currentPage > 3) {
      paginationArray.push(". . .");
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(currentPage + 2, totalPages - 1);

    for (let i = start; i <= end; i++) {
      paginationArray.push(i);
    }

    if (currentPage < totalPages - 2) {
      paginationArray.push("...");
    }

    paginationArray.push(totalPages);

    return paginationArray;
  };

  const paginationArray = generatePagination();

  return (
    <nav>
      <ul className="inline-flex md:gap-1 text-base h-10 items-center">
        {/* Previous button */}
        <li
          className="w-[36px] h-[36px] bg-[#F2F2F2] rounded-full p-[8px] flex justify-center items-center"
        >
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <img src="/left.png" alt="Previous" />
          </button>
        </li>

        {/* Pagination Numbers */}
        {paginationArray.map((page, index) => (
          <li
            key={index}
            className={`w-[40px] h-[40px] ${
              page === currentPage
                ? "bg-[#00B207] text-white"
                : "text-[#666666]"
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
        <li className="w-[36px] h-[36px] bg-[#F2F2F2] rounded-full p-[8px] flex justify-center items-center">
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          >
            <img src="/right.png" alt="Next" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
