import React, { useContext, useEffect } from "react";

import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";

import { Formik } from "formik";
import * as yup from "yup";

import { Context as CustomerContext } from "../../context/customerContext";

const customerSchema = yup.object({
  firstName: yup.string().required("Permission type is required"),
  lastName: yup.string().required("Permission type is required"),
  email: yup.string().required("Permission type is required"),
  postalCode: yup.string().nullable(),
  country: yup.string().nullable(),
  city: yup.string().nullable(),
  street: yup.string().nullable(),
  buildingNo: yup.string().nullable(),
  flatNo: yup.string().nullable(),
  phoneNumber: yup.string().nullable(),
});

const PersonalInfo = () => {
  const {
    state: { user },
    setCurrentCustomer,
    updateCustomer,
  } = useContext(CustomerContext);

  useEffect(() => {
    (async () => {
      await setCurrentCustomer();
    })();
  }, []);

  return (
    <div className="panel shadow-sm py-2 px-3">
      <div className="border-bottom">
        <h5>Personal info</h5>
      </div>
      {user && (
        <div className="mt-2">
          <Formik
            onSubmit={async (values, actions) => {
              await updateCustomer(values);
              actions.setSubmitting(false);
              actions.resetForm();
            }}
            initialValues={user}
            validationSchema={customerSchema}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              resetForm,
              isSubmitting,
              values,
              errors,
            }) => (
              <Form noValidate autoComplete="false" onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    First name
                  </Form.Label>
                  <Col lg={9}>
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Last name
                  </Form.Label>
                  <Col lg={9}>
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Email
                  </Form.Label>
                  <Col lg={9}>
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Country
                  </Form.Label>
                  <Col lg={9}>
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
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    City
                  </Form.Label>
                  <Col lg={9}>
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
                  <Form.Label column lg={3}>
                    Street
                  </Form.Label>
                  <Col lg={9}>
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
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Building No.
                  </Form.Label>
                  <Col lg={9}>
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
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Flat No.
                  </Form.Label>
                  <Col lg={9}>
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
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Postal Code
                  </Form.Label>
                  <Col lg={9}>
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}>
                    Phone
                  </Form.Label>
                  <Col lg={9}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>+375</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="phoneNumber"
                        type="text"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        isInvalid={!!errors.phoneNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column lg={3}></Form.Label>
                  <Col lg={9}>
                    <Button
                      variant="secondary"
                      type="reset"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-1"
                    >
                      Save changes
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
