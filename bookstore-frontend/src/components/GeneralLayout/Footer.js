import React from "react";

import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <small className="text-white-50">© 2020 Book Livraria | All rights reserved</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
