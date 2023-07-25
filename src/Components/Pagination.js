import React, { useState } from "react";
import Button from "./Button";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const displayedCount = 5; // Number of pages to display at a time

  const calculateDisplayedPages = (page, count) => {
    const middlePage = Math.ceil(count / 2);
    let startPage = page - middlePage + 1;
    let endPage = page + middlePage - 1;

    if (startPage <= 0) {
      startPage = 1;
      endPage = count;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - count + 1;
      if (startPage <= 0) {
        startPage = 1;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const [displayedPages, setDisplayedPages] = useState(
    calculateDisplayedPages(currentPage, displayedCount)
  );

  const handlePageChange = (page) => {
    setDisplayedPages(calculateDisplayedPages(page, displayedCount));
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    return displayedPages.map((page) => (
      <li key={page} className={currentPage === page ? "active" : ""}>
        <button
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 ${
            currentPage === page ? "cursor-not-allowed bg-gray-400" : ""
          }`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      </li>
    ));
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      handlePageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      handlePageChange(totalPages);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  //   const handlingPages = () => {
  //     if (currentPage !== 1) {
  //       handlePageChange(1);
  //     }
  //     if (currentPage !== 1) {
  //       handlePageChange(currentPage - 1);
  //     }
  //     if (currentPage !== totalPages) {
  //       handlePageChange(currentPage + 1);
  //     }
  //     if (currentPage !== totalPages) {
  //       handlePageChange(totalPages);
  //     }
  //   };

  return (
    <ul className=" flex gap-2 justify-center items-center">
      <li>
        <Button
          currentPage={currentPage}
          stat="<<"
          handlePage={handleFirstPage}
          page={1}
        />
      </li>
      <li>
        <Button
          currentPage={currentPage}
          stat="<"
          handlePage={handlePreviousPage}
          page={1}
        />
      </li>
      <li>{currentPage >= 4 ? <p>...</p> : ""}</li>
      {renderPageNumbers()}
      <li>{currentPage <= totalPages - 3 ? <p>...</p> : ""}</li>
      <li>
        <Button
          currentPage={currentPage}
          stat=">"
          handlePage={handleNextPage}
          page={totalPages}
        />
      </li>
      <li>
        <Button
          currentPage={currentPage}
          stat=">>"
          handlePage={handleLastPage}
          page={totalPages}
        />
      </li>
    </ul>
  );
};

export default Pagination;
