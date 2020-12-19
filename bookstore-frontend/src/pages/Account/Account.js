import React from "react";

import { Container, Row, Col, ListGroup } from "react-bootstrap";

import { Switch } from "react-router-dom";
import UserPrivateRoute from "../../components/PrivateRoutes/UserPrivateRoute";

import PersonalInfo from "./PersonalInfo";
import Favourites from "./Favourites";
import OrderHistory from "./OrderHistory";

const Account = () => {
  return (
    <Container fluid as="main" className="my-3" role="main">
      <Row noGutters>
        <Col xs={12} md className="mr-md-1">
          <Col className="panel shadow-sm py-2">
            <h5 className="m-0">My Account</h5>
          </Col>
          <Col className="panel shadow-sm py-2 mt-1">
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                href="/account/personal"
                className="px-0 py-1"
              >
                Personal Info
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="/account/favourites"
                className="px-0 py-1"
              >
                Favourites
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="/account/history"
                className="px-0 py-1"
              >
                Order History
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Col>
        <Col xs={12} md={9} className="ml-md-1 mt-2 mt-md-0">
          <Switch>
            <UserPrivateRoute
              exact
              path="/account/personal"
              component={PersonalInfo}
            />
            <UserPrivateRoute
              exact
              path="/account/favourites"
              component={Favourites}
            />
            <UserPrivateRoute
              exact
              path="/account/history"
              component={OrderHistory}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
