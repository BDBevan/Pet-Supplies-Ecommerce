import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Navigation = () => {
  const isLoggedIn = Auth.loggedIn();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Paw Kingdom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/collections">
              Shop
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/account">
                  My Account
                </Nav.Link>
                <Button variant="link" onClick={() => Auth.logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline-primary"
                onClick={() => {
                  /* Open login modal */
                }}
              >
                Login / Sign Up
              </Button>
            )}
            <Nav.Link as={Link} to="/cart">
              Cart (0)
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
