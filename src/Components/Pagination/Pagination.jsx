import React from "react";
import "./Pagination.css";
const Pagination = ({ paginate, totalPages, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <div className="heading">
        <p className="pages">{`${currentPage}/${totalPages}`}</p>
      </div>
      <button
        onClick={() => paginate(currentPage - 1)}
        className="btn"
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">&laquo;</span>
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        className="btn"
        disabled={currentPage === totalPages}
      >
        <span aria-hidden="true">&raquo;</span>
      </button>
    </div>
  );
};

export default Pagination;
