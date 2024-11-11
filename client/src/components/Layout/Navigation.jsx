import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import Auth from "../../utils/auth";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/paw-logo.svg";

const Navigation = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleSignupShow = () => setShowSignup(true);
  const handleSignupClose = () => setShowSignup(false);

  return (
    <>
      <Navbar bg="white" expand="lg" fixed="top" className="border-bottom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="Paw Kingdom"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/collections?pet=dog">
                Dog
              </Nav.Link>
              <Nav.Link as={Link} to="/collections?pet=cat">
                Cat
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto align-items-center">
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/favorites">
                    Favorites
                  </Nav.Link>
                  <Nav.Link as={Link} to="/orders">
                    My Orders
                  </Nav.Link>
                  <Nav.Link as={Link} to="/account">
                    <FaUser /> Account
                  </Nav.Link>
                </>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={handleLoginShow}
                  className="me-2"
                >
                  Login
                </Button>
              )}
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginForm show={showLogin} handleClose={handleLoginClose} />
      <SignupForm show={showSignup} handleClose={handleSignupClose} />
    </>
  );
};

export default Navigation;
