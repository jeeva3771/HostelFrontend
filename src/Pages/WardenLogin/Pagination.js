import { useEffect } from "react"

export default function Pagination({ currentPage, count, limit, onPageChange }) {
  const totalPages = Math.ceil(count / limit)

  useEffect(() => {
    if (totalPages > 0) {
      onPageChange(1)
    }
  }, [count, limit]) 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  if (totalPages <= 1) return null

  return (
    <ul className="pagination justify-content-center">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      </li>

      <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(1)}
        >1
        </button>
      </li>

      {currentPage > 3 && (
        <li className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )}

      {(() => {
        let pages = [];
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(
            <li 
              key={i} 
              className={`page-item ${currentPage === i ? "active" : ""}`}
            >
              <button 
                className="page-link" 
                onClick={() => handlePageChange(i)}
              >
                {i}
              </button>
            </li>
          )
        }
        return pages
      })()}

      {currentPage < totalPages - 2 && (
        <li className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )}

      {totalPages > 1 && (
        <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      )}

      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  )
}
