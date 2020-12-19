import React, { useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";

import OrderForm from "../components/OrderForm/OrderForm";

import { Context as ShoppingCartContext } from "../context/shoppingCartContext";

const OrderCheckout = () => {
  const {
    state: { books, totalSum, totalCount },
  } = useContext(ShoppingCartContext);

  return (
    <Container fluid as="main" className="my-3" role="main">
      <Row className="mx-0">
        <Col xs={12} md={{ order: 1 }} className="px-0 my-1 my-md-0">
          <div className="panel d-flex flex-column shadow-sm">
            <div className="panel-pink d-flex flex-column p-3">
              <h5 className="text-light">Order Summary</h5>
              <div className="d-flex flex-row justify-content-between text-white">
                <div>{totalCount} items</div>
                <div>{Number.parseFloat(totalSum.toPrecision(4))} $</div>
              </div>
            </div>
            <div className="p-3">
              {books?.map((element) => (
                <div
                  key={element.book.isbn}
                  className="d-flex flex-row justify-content-between py-2 border-bottom"
                >
                  <div>
                    <div>{element.book.title}</div>
                    <div>
                      {element.book.bookAuthors?.map(
                        (bookAuthor) =>
                          ` ${bookAuthor.author.firstName} ${bookAuthor.author.lastName},`
                      )}
                    </div>
                    <div>x {element.quantity}</div>
                  </div>
                  <div>
                    {Number.parseFloat(
                      (
                        Number.parseFloat(element.book.price.toPrecision(4)) *
                        element.quantity
                      ).toPrecision(4)
                    )}{" "}
                    $
                  </div>
                </div>
              ))}
              <div className="d-flex flex-row justify-content-between py-1 border-bottom">
                <div>Sub-total</div>
                <div>{Number.parseFloat(totalSum.toPrecision(4))} $</div>
              </div>
              <div className="d-flex flex-row justify-content-between py-1 border-bottom">
                <div>Delivery</div>
                <div>Free</div>
              </div>
              <div className="d-flex flex-row justify-content-between py-1">
                <div>Total</div>
                <div>{Number.parseFloat(totalSum.toPrecision(4))} $</div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          md={{ span: 8, order: 0 }}
          className="panel mr-md-2 shadow-sm py-3"
        >
          <div className="mb-3 border-bottom">
            <h5>Fill with valid information</h5>
          </div>
          <OrderForm />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderCheckout;
