import React, { useState, useEffect, useContext } from "react";

import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";

import { useLocation } from "react-router-dom";
import * as queryString from "query-string";

import { Context } from "../context/alertContext";

import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

import { getBooks } from "../actions/bookActions";
import { getGenres } from "../actions/genreActions";
import NoResults from "../components/NoResults";

const Books = () => {
  const { addAlert } = useContext(Context);
  const location = useLocation();
  const params = queryString.parse(location.search);

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  const [keyword, setKeyword] = useState(params.keyword);
  const [availability, setAvailability] = useState(
    params.availability ? params.availability : "all"
  );
  const [price, setPrice] = useState(params.price ? params.price : "all");

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(params.page ? params.page : 1);
  const [count, setCount] = useState(0);

  const limit = 12;

  useEffect(() => {
    (async () => {
      setGenres(await getGenres(addAlert));
      const { books, count, pages } = await getBooks({
        limit: limit,
        page: currentPage,
        genre: params.genre,
        orderBy: params.orderBy,
        keyword: keyword,
        price: price,
        availability: availability,
      }, addAlert);
      setBooks(books);
      setCount(count);
      setPages(pages);
    })();
  }, []);

  return (
    <Container fluid as="main" className="my-3" role="main">
      <Row noGutters>
        <Col xs={12} md className="mr-md-1">
          <Col className="panel shadow-sm py-2">
            <div className="d-flex border-bottom align-items-center justify-content-between">
              <h5>Filter</h5>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Keyword</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Enter keyword"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price range</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  custom
                  required
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                >
                  <option value="all">All</option>
                  <option value="low">Under 15$</option>
                  <option value="med">15$ to 30$</option>
                  <option value="high">30$ +</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  custom
                  required
                  value={availability}
                  onChange={(event) => {
                    setAvailability(event.target.value);
                  }}
                >
                  <option value="all">All</option>
                  <option value="out_of_stock">Out of stock</option>
                  <option value="in_stock">In stock</option>
                </Form.Control>
              </Form.Group>
              <Button
                href={
                  location.pathname +
                  "?" +
                  queryString.stringify({
                    ...params,
                    page: 1,
                    keyword: keyword,
                    price: price,
                    availability: availability,
                  })
                }
                className="w-100"
              >
                Filter
              </Button>
            </Form>
          </Col>
          <Col className="panel shadow-sm py-2 mt-2">
            <div className="d-flex border-bottom align-items-center justify-content-between">
              <h5>Filter by genres</h5>
            </div>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                href={
                  location.pathname +
                  "?" +
                  queryString.stringify({
                    ...params,
                    page: 1,
                    genre: "",
                  })
                }
                className="p-0"
              >
                All
              </ListGroup.Item>
              {genres?.map((genre) => (
                <ListGroup.Item
                  key={genre.id}
                  action
                  href={
                    location.pathname +
                    "?" +
                    queryString.stringify({
                      ...params,
                      page: 1,
                      genre: genre.name,
                    })
                  }
                  className="p-0 text-capitalize"
                >
                  {genre.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Col>
        {books.length !== 0 ? (
          <Col xs={12} md={9} className="ml-md-1">
            <div className="d-block py-3 my-md-0">
              <h4>
                Search results for{" "}
                {params.genre
                  ? params.genre
                  : params.keyword
                  ? params.keyword
                  : "all books"}
              </h4>
            </div>
            <div className="d-block panel border-bottom">
              <Row className="px-3 align-items-center">
                <Col xs={12} xl="auto" className=" text-nowrap mr-auto my-3">
                  Showing {currentPage === 1 ? 1 : (currentPage - 1) *  + limit} to{" "}
                  {(currentPage - 1) * limit + books.length} of {count} results
                </Col>
                <div className="col-auto my-3">
                  <Form.Control
                    className="mr-1"
                    as="select"
                    size="sm"
                    value={params.orderBy ? params.orderBy : "popularity"}
                    custom
                    onChange={(event) => {
                      const url =
                        location.pathname +
                        "?" +
                        queryString.stringify({
                          ...params,
                          orderBy: event.target.value,
                        });
                      window.location.href = url;
                    }}
                  >
                    <option value="popularity">Most popular</option>
                    <option value="price_low_high">Price, low to high</option>
                    <option value="price_high_low">Price, high to low</option>
                    <option value="pubdate_old_new">
                      Publication date, old to new
                    </option>
                    <option value="pubdate_new_old">
                      Publication date, new to old
                    </option>
                  </Form.Control>
                </div>
                <div className="col-auto ml-auto ml-xl-0 my-3">
                  <Pagination currentPage={currentPage} pages={pages} />
                </div>
              </Row>
            </div>
            <div className="d-block panel">
              <Row xs={2} md={4} xl={6} className="px-3 align-items-stretch">
                {books?.map((book) => (
                  <Col key={book.isbn} xs={6} md={3} xl={2} className="my-2">
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>
            </div>
            <div className="d-block panel p-3 mt-2">
              <Pagination currentPage={currentPage} pages={pages} />
            </div>
          </Col>
        ) : (
          <Col xs={12} md={9} className="ml-md-1">
            <div className="d-block py-3 my-md-0">
              <h4>
                Search results for{" "}
                {params.genre ? params.genre : keyword ? keyword : "all books"}
              </h4>
            </div>
            <NoResults />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Books;
