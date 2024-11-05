import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/paw-logo.png" // Add your logo image here
              alt="Paw Kingdom"
              height="30"
              className="me-2"
            />
            Paw Kingdom
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/collections/dog">
                Dogs
              </Nav.Link>
              <Nav.Link as={Link} to="/collections/cat">
                Cats
              </Nav.Link>
            </Nav>

            <Nav className="d-flex align-items-center">
              {Auth.loggedIn() ? (
                <>
                  <Button
                    as={Link}
                    to="/account"
                    variant="outline-primary"
                    className="me-3"
                  >
                    My Account
                  </Button>
                  <Nav.Link onClick={Auth.logout} className="me-3">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => setShowModal(true)}
                  className="me-3"
                >
                  Login / Sign Up
                </Button>
              )}
              <Nav.Link
                as={Link}
                to="/cart"
                className="position-relative d-flex align-items-center"
              >
                <FaShoppingCart size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0 {/* Replace with actual cart count */}
                  <span className="visually-hidden">items in cart</span>
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login/Signup Modal */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
