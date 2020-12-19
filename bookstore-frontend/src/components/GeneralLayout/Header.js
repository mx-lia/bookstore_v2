import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context as CustomerContext } from "../../context/customerContext";
import { Context as ShoppingCartContext } from "../../context/shoppingCartContext";

import { Container, Navbar, Nav, Button, Image } from "react-bootstrap";

import { ReactComponent as AccountIcon } from "../../assets/account.svg";
import { ReactComponent as BasketIcon } from "../../assets/basket.svg";
import { ReactComponent as ExitIcon } from "../../assets/exit.svg";

import Search from "./Search";
import Logo from "../../assets/logo.svg";

const Header = () => {
  const {
    state: { user },
    signOut,
  } = useContext(CustomerContext);

  const {
    state: { totalCount, totalSum },
  } = useContext(ShoppingCartContext);

  const history = useHistory();

  return (
    <header>
      <Container fluid>
        <Navbar className="flex-wrap flex-md-nowrap justify-content-between px-0 py-3">
          <Navbar.Brand className="col-md-3 col px-0 mx-0" href="/">
            <Image width="200px" src={Logo} />
          </Navbar.Brand>
          <Button
            href={user ? "/account/personal" : "/login"}
            variant="primary"
            className="d-inline-flex align-items-center order-md-3 ml-md-2"
          >
            <AccountIcon fill="#fff" className={user ? "" : "mr-md-1"} />
            <span className="hidden-text">{user ? "" : "Sign in/Join"}</span>
          </Button>
            {user && (
              <Button
              variant="primary"
              className="d-inline-flex align-items-center order-md-3 ml-2"
              onClick={() => {
                signOut(history);
              }}
            >
              <ExitIcon fill="#fff" />
            </Button>
          )}
          <Search />
        </Navbar>
      </Container>
      <section className="shadow" role="menubar">
        <Container fluid className="d-flex flex-row">
          <div className="nav-scroller flex-fill">
            <Nav className="nav-underline container-fluid mx-0 my-auto">
              <Nav.Item>
                <Nav.Link href="/books">All books</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/books?availability=in_stock">
                  In stock
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/books?availability=out_of_stock">
                  Out of stock
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="basket-panel d-flex flex-row align-items-center">
            <div className="text-white text-nowrap border-right px-4">
              {Number.parseFloat(totalSum.toPrecision(4))} $
            </div>
            <div>
              <Button
                href="/shoppingCart"
                variant="default"
                className="d-inline-flex align-items-center"
              >
                <BasketIcon fill="#fff" />
                <span className="mx-1">{totalCount}</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </header>
  );
};

export default Header;
