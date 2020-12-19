import React, { useState, useEffect, useContext } from "react";

import { Container, Jumbotron, Row, Col } from "react-bootstrap";

import BookCard from "../components/BookCard";

import { getBooks } from "../actions/bookActions";

import { Context } from "../context/alertContext";

const Home = () => {
  const { addAlert } = useContext(Context);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const { books } = await getBooks({ limit: 6, page: 1 }, addAlert);
      setBooks(books);
    })();
  }, []);

  return (
    <Container fluid as="main" className="my-3" role="main">
      <Jumbotron className="text-light">
        <Col md={6}>
          <h1 className="display-4 font-italic">Read around the world</h1>
          <p className="lead">
            Book Livraria is a leading international book retailer with a unique
            offer over 20 million books and free delivery worldwide (with no
            minimum spend).
          </p>
        </Col>
      </Jumbotron>
      <div className="d-block panel shadow-sm">
        <Row xs={2} md={4} xl={6} className="px-3">
          {books?.map((book) => (
            <Col key={book.isbn} xs={6} md={3} xl={2} className="my-2">
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Home;
