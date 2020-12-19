import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import * as queryString from "query-string";

import { Context } from "../context/alertContext";

import { Badge, Table } from "react-bootstrap";

import Pagination from "./Pagination";

import { getBooks, getCount } from "../actions/bookActions";
import NoResults from "./NoResults";

const DataGrid = ({
  setTotalCount,
  setAvailableCount,
  setNotAvailableCount,
}) => {
  const { addAlert } = useContext(Context);
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(params.page ? params.page : 1);

  useEffect(() => {
    (async () => {
      const { books, pages } = await getBooks(
        {
          limit: 6,
          page: currentPage,
          genre: params.genre,
          orderBy: params.orderBy,
        },
        addAlert
      );
      const { all, available, notAvailable } = await getCount(addAlert);
      setBooks(books);
      setTotalCount(all);
      setAvailableCount(available);
      setNotAvailableCount(notAvailable);
      setPages(pages);
    })();
  }, [
    currentPage,
    params.genre,
    params.orderBy,
    setAvailableCount,
    setNotAvailableCount,
    setTotalCount,
  ]);

  return (
    <div>
      {books.length !== 0 ? (
        <div className="panel p-3">
          <Table responsive="md" size="sm" striped borderless>
            <thead className="text-nowrap">
              <tr>
                <th>ISBN</th>
                <th>TITLE</th>
                <th>AUTHOR</th>
                <th>PUBLICATION DATE</th>
                <th>STATUS</th>
                <th className="text-right">PRICE</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {books?.map((book) => (
                <tr key={book.isbn}>
                  <td>
                    <Link to={`/admin/dashboard/book/${book.isbn}`}>
                      {book.isbn}
                    </Link>
                  </td>
                  <td>{book.title}</td>
                  <td>
                    {book.bookAuthors?.map(
                      (bookAuthor) =>
                        ` ${bookAuthor.author.firstName} ${bookAuthor.author.lastName},`
                    )}
                  </td>
                  <td>{book.publicationDate}</td>
                  <td>
                    {book.availableQuantity === 0 ? (
                      <Badge variant="danger">
                        Out of stock{" "}
                        <Badge variant="light">{book.availableQuantity}</Badge>
                      </Badge>
                    ) : (
                      <Badge variant="warning">
                        In stock{" "}
                        <Badge variant="light">{book.availableQuantity}</Badge>
                      </Badge>
                    )}
                  </td>
                  <td className="text-right">{book.price}$</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination currentPage={currentPage} pages={pages} />
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default DataGrid;
