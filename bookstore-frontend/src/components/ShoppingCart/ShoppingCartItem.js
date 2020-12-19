import React, { useContext } from "react";

import { Card, Row, Col, Button, Image } from "react-bootstrap";

import QuantityControl from "./QuantityControl";

import { ReactComponent as FavoriteIcon } from "../../assets/favorite.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

import noImage from "../../assets/noimage.png";

import { Context as ShoppingCartContext } from "../../context/shoppingCartContext";
import { Context as CustomerContext } from "../../context/customerContext";
import { Context } from "../../context/alertContext";

import { createFavourite } from "../../actions/favouriteBookActions";

const ShoppingCartItem = ({ book, quantity }) => {
  const { addAlert } = useContext(Context);
  const { removeItem } = useContext(ShoppingCartContext);
  const {
    state: { user },
  } = useContext(CustomerContext);

  return (
    <Card.Body className="panel shadow-sm my-1 py-2 px-3 rounded-0">
      <Row noGutters>
        <Col xs={12} md="auto">
          <Card.Body>
            <div className="d-flex flex-row">
              <Image
                className="mx-auto"
                width="130px"
                src={book.src ? book.src : noImage}
              />
            </div>
          </Card.Body>
        </Col>
        <Col xs={12} md>
          <Card.Body>
            <Card.Title as="h5">{book.title}</Card.Title>
            <Card.Subtitle>
              {book.bookAuthors?.map(
                (bookAuthor) =>
                  ` ${bookAuthor.author.firstName} ${bookAuthor.author.lastName},`
              )}
            </Card.Subtitle>
            <Card.Text>
              {book.language}, {book.format}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col xs={12} md="auto" className="ml-auto">
          <Card.Body>
            <div className="d-flex flex-row justify-content-between">
              <div className="mr-4">
                <QuantityControl book={book} quantity={quantity} />
              </div>
              <div className="d-flex flex-column">
                <h4 className="text-pink">
                  {Number.parseFloat(
                    (
                      Number.parseFloat(book.price.toPrecision(4)) * quantity
                    ).toPrecision(4)
                  )}{" "}
                  $
                </h4>
                <small>
                  {book.price}$ x {quantity}
                </small>
              </div>
            </div>
          </Card.Body>
        </Col>
        <Col xs={12} md="auto" className="ml-auto ml-md-0">
          <Card.Body>
            <div className="d-flex flex-row flex-md-column justify-content-between">
              <Button
                variant="danger"
                className="d-inline-flex align-items-center mb-md-1"
                disabled={user ? false : true}
                onClick={() => createFavourite(book.isbn, addAlert)}
              >
                <FavoriteIcon fill="#fff" className="pr-md-1" />
                <span>Add to favorite</span>
              </Button>
              <Button
                variant="light"
                className="d-inline-flex align-items-center mb-md-1"
                onClick={() => removeItem(book)}
              >
                <DeleteIcon className="pr-md-1" />
                <span>Delete</span>
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card.Body>
  );
};

export default ShoppingCartItem;
