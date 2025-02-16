import React from "react";

export default function Pagination({ currentPage, itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#25223D] text-white rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 ${
            currentPage === number ? "bg-[#AA00FF]" : "bg-[#25223D]"
          } text-white rounded-lg`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className="px-4 py-2 bg-[#25223D] text-white rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}