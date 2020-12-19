import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

import { ReactComponent as ExitIcon } from "../../assets/exit.svg";

import { Context as CustomerContext } from "../../context/customerContext";

const AdminHeader = ({ title, subtitle }) => {
  const {
    signOut,
  } = useContext(CustomerContext);

  const history = useHistory();

  return (
    <header>
      <Container fluid className="py-3">
        <Row>
          <Col xs="auto" className="ml-auto">
            <Button
              variant="default"
              className="d-inline-flex align-items-center"
              onClick={() => {
                signOut(history);
              }}
            >
              <ExitIcon fill="#fff" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center text-white">
            <h4>{title}</h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center text-white-50">
            <h5>{subtitle}</h5>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default AdminHeader;
