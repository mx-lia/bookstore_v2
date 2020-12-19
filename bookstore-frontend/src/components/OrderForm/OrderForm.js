import React, { useEffect, useContext } from "react";

import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

import { Formik } from "formik";
import { validationSchema } from "./form-config";

import { Context as ShoppingCartContext } from "../../context/shoppingCartContext";
import { Context as CustomerContext } from "../../context/customerContext";
import { Context } from "../../context/alertContext";

import { createOrder } from "../../actions/orderActions";

const OrderForm = () => {
  const { addAlert} = useContext(Context);
  
  const {
    state: { user },
    setCurrentCustomer,
  } = useContext(CustomerContext);

  const {
    state: { books },
  } = useContext(ShoppingCartContext);

  useEffect(() => {
    (async () => {
      await setCurrentCustomer();
    })();
  }, []);

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values) => {
        await createOrder(values, books, addAlert);
        window.location.href = "/account/history";
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <Form noValidate autoComplete="false" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="firstName"
              type="text"
              value={values.firstName || ""}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="lastName"
              type="text"
              value={values.lastName || ""}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={values.email || ""}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row}>
            <Col lg={6}>
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                value={values.country || ""}
                onChange={handleChange}
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Col>
            <Col lg={6}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                value={values.city || ""}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="street"
                type="text"
                value={values.street || ""}
                onChange={handleChange}
                isInvalid={!!errors.street}
              />
              <Form.Control.Feedback type="invalid">
                {errors.street}
              </Form.Control.Feedback>
            </Col>
            <Col lg={2}>
              <Form.Label>Building</Form.Label>
              <Form.Control
                name="buildingNo"
                type="text"
                value={values.buildingNo || ""}
                onChange={handleChange}
                isInvalid={!!errors.buildingNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.buildingNo}
              </Form.Control.Feedback>
            </Col>
            <Col lg={2}>
              <Form.Label>Flat</Form.Label>
              <Form.Control
                name="flatNo"
                type="text"
                value={values.flatNo || ""}
                onChange={handleChange}
                isInvalid={!!errors.flatNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.flatNo}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              name="postalCode"
              type="text"
              value={values.postalCode || ""}
              onChange={handleChange}
              isInvalid={!!errors.postalCode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.postalCode}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>+375</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="phoneNumber"
                type="text"
                value={values.phoneNumber || ""}
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button type="submit">Order</Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
