import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = (props) => {
  const { pageSize, totalItems, currPage, handlePage, goPrevPage, goNextPage } =
    props;
  let noOfPages = totalItems / pageSize;
  noOfPages = Math.ceil(noOfPages);
  if (noOfPages < 2) return;
  const pages = _.range(1, noOfPages + 1);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <span className="page-link" onClick={goPrevPage}>
            <i className="fa fa-angle-double-left"></i>
          </span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={currPage === page ? "page-item active" : "page-item"}
          >
            <span className="page-link" onClick={() => handlePage(page)}>
              {page}
            </span>
          </li>
        ))}
        <li className="page-item">
          <span className="page-link" onClick={goNextPage}>
            <i className="fa fa-angle-double-right"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
};

export default Pagination;
