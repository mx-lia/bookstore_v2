import React from "react";
import { Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import * as queryString from "query-string";

const PaginationComponent = ({ currentPage, pages }) => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  return (
    <Pagination className="m-0 justify-content-end" size="sm">
      <Pagination.First
        disabled={currentPage == 1 ? true : false}
        href={
          location.pathname +
          "?" +
          queryString.stringify({
            ...params,
            page: 1,
          })
        }
      />
      <Pagination.Prev
        disabled={currentPage == 1 ? true : false}
        href={
          location.pathname +
          "?" +
          queryString.stringify({
            ...params,
            page: Number(currentPage) - 1,
          })
        }
      />
      {pages?.map((element) => (
        <Pagination.Item
          key={element}
          active={element == currentPage ? true : false}
          href={
            location.pathname +
            "?" +
            queryString.stringify({
              ...params,
              page: element,
            })
          }
        >
          {element}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage == pages.length ? true : false}
        href={
          location.pathname +
          "?" +
          queryString.stringify({
            ...params,
            page: Number(currentPage) + 1,
          })
        }
      />
      <Pagination.Last
        disabled={currentPage == pages.length ? true : false}
        href={
          location.pathname +
          "?" +
          queryString.stringify({
            ...params,
            page: pages.length,
          })
        }
      />
    </Pagination>
  );
};

export default PaginationComponent;
