import React, { useContext } from "react";

import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import Alert from "../../components/Alert";
import Logo from "../../assets/book.svg";

import { Context as CustomerContext } from "../../context/customerContext";
import { Context } from "../../context/alertContext";

const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const AdminLogin = () => {
  const { signIn } = useContext(CustomerContext);

  return (
    <Container>
      <Row className="align-self-center">
        <Col></Col>
        <Col xs={12} md>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
              const res = await signIn(values);
              actions.setSubmitting(false);
              if (res != null)
              {
                window.location.href = "/admin/dashboard";
              }
            }}
          >
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <Form
                className="panel p-3 mt-3 shadow"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="text-center my-2">
                  <Image width="100px" src={Logo} />
                </div>
                <h1 className="h3 mb-3 font-weight-normal text-center">
                  Please sign in
                </h1>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button block type="submit" disabled={isSubmitting}>
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
