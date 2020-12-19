import React, { useContext } from "react";

import { Container, Card, Row, Col, Button } from "react-bootstrap";

import ShoppingCartItem from "../components/ShoppingCart/ShoppingCartItem";
import EmptyCart from "../components/ShoppingCart/EmptyCart";

import { Context as ShoppingCartContext } from "../context/shoppingCartContext";

const ShoppingCart = () => {
  const {
    state: { books, totalSum },
  } = useContext(ShoppingCartContext);

  return (
    <React.Fragment>
      {books.length !== 0 && (
        <Container fluid as="main" className="my-3" role="main">
          <h4 className="my-3">Your shopping cart</h4>
          {books?.map((element) => (
            <ShoppingCartItem
              key={element.book.isbn}
              book={element.book}
              quantity={element.quantity}
            />
          ))}
          <Card className="panel shadow-sm mt-1 mb-3 py-2 px-3 rounded-0">
            <Card.Body>
              <Row no-gutters>
                <Col xs={12} xl={5} className="ml-auto">
                  <dl className="d-flex flex-row text-nowrap">
                    <dt className="mr-3">Delivery cost</dt>
                    <dd className="ml-auto">FREE</dd>
                  </dl>
                  <dl className="d-flex flex-row text-nowrap">
                    <dt className="mr-3">Total</dt>
                    <dd className="text-pink ml-auto">{Number.parseFloat(totalSum.toPrecision(4))} $</dd>
                  </dl>
                  <div className="d-flex flex-row justify-content-end">
                    <Button
                      href="/checkout"
                      className="text-light ml-auto w-50"
                    >
                      Checkout
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      )}
      {books.length === 0 && <EmptyCart />}
    </React.Fragment>
  );
};

export default ShoppingCart;
