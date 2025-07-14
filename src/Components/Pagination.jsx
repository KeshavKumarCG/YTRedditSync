import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
      >
        &lsaquo;
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
      >
        &rsaquo;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded disabled:opacity-50 bg-gray-200 hover:bg-gray-300"
      >
        &raquo;
      </button>
    </div>
  );
}