import React, { useState, useEffect, useContext } from "react";

import { Container, Row, Col, Image, Button } from "react-bootstrap";

import { ReactComponent as AvailableIcon } from "../assets/available.svg";
import { ReactComponent as NotAvailableIcon } from "../assets/not-available.svg";
import { ReactComponent as ShippingIcon } from "../assets/shipping.svg";

import { useParams } from "react-router-dom";
import { Context as CustomerContext } from "../context/customerContext";
import { Context as ShoppingCartContext } from "../context/shoppingCartContext";
import { Context } from "../context/alertContext";

import { getBook } from "../actions/bookActions";
import { createFavourite } from "../actions/favouriteBookActions";

import noImage from "../assets/noimage.png";

const BookDetails = () => {
  const { addAlert } = useContext(Context);
  const [book, setBook] = useState();
  const [inCart, setInCart] = useState(false);
  const {
    state: { user },
  } = useContext(CustomerContext);
  const { addItem, isInCart } = useContext(ShoppingCartContext);

  const { isbn } = useParams();

  useEffect(() => {
    (async () => {
      setBook(await getBook(isbn, addAlert));
    })();
    setInCart(isInCart(isbn));
  }, [isbn]);

  return (
    <Container fluid as="main" className="my-3" role="main">
      {book && (
        <Row>
          <Col className="mb-1">
            <div className="border p-2" color="#666">
              <span>Categories: </span>
              {book.bookGenres?.map((bookGenre) => (
                <span key={bookGenre.genre.id}>{bookGenre.genre.name} / </span>
              ))}
            </div>
          </Col>
        </Row>
      )}
      {book && (
        <Row className="mx-0">
          <Col xs={12} md={9} className="panel mr-md-2 shadow-sm">
            <Row>
              <Col xs={12} md={4} className="text-center">
                <Image
                  thumbnail
                  src={book.src ? book.src : noImage}
                  className="border-0 rounded-0"
                />
              </Col>
              <Col xs={12} md={8}>
                <h4 className="pt-3 pb-1 border-bottom">{book.title}</h4>
                <h5>
                  By
                  {book.bookAuthors?.map(
                  (bookAuthor) =>
                    ` ${bookAuthor.author.firstName} ${bookAuthor.author.lastName},`
                )}
                </h5>
                <div>{book.description}</div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md className="px-0">
            <div className="panel d-flex flex-column px-3 shadow-sm">
              <h3 className="border-bottom text-pink py-3">{book.price}$</h3>
              <div className="d-inline-flex align-items-center font-weight-bold my-3">
                <ShippingIcon width="32" height="32" className="mr-1" />
                Free delivery worldwide
              </div>
              {book.availableQuantity === 0 ? (
                <div className="d-inline-flex align-items-center my-3">
                  <NotAvailableIcon width="32" height="32" className="mr-1" />
                  Out of stock
                </div>
              ) : (
                  <div className="d-inline-flex align-items-center my-3">
                    <AvailableIcon width="32" height="32" className="mr-1" />
                  In stock
                  </div>
                )}
              <div className="border-top py-3">
                <Button
                  className="w-100 mt-2"
                  disabled={
                    book.availableQuantity === 0 || inCart ? true : false
                  }
                  onClick={() => {
                    addItem(book);
                    setInCart(true);
                  }}
                >
                  {inCart ? "Book is already in cart" : "Add to cart"}
                </Button>
                <Button
                  variant="light"
                  className="w-100 mt-2"
                  disabled={user ? false : true}
                  onClick={() => createFavourite(book.isbn, addItem)}
                >
                  {user
                    ? "Add to favourites"
                    : "Favourites is blocked for guests"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
      {book && (
        <Row className="panel mx-0 mt-2 pb-3 shadow-sm">
          <h5 className="border-bottom w-100 mx-3 py-3">Book details</h5>
          <Col xs={12} md={6}>
            <p>
              <strong>Format</strong>: {book.format} | {book.pages} pages
            </p>
            <p>
              <strong>Publication date</strong>: {book.publicationDate}
            </p>
            <p>
              <strong>Publisher</strong>:
              {book.bookPublishers?.map(
                (bookPublisher) => ` ${bookPublisher.publisher.name},`
              )}
            </p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              <strong>Language</strong>: {book.language}
            </p>
            <p>
              <strong>ISBN</strong>: {book.isbn}
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BookDetails;
