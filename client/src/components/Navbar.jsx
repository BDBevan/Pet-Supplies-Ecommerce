import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Modal,
  Tab,
  Button,
  Form,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
import "./Navbar.css";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Clear search after submission
    }
  };

  return (
    <>
      <Navbar className="paw-pattern-bg py-3 shadow-sm">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          {/* Logo Section */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/images/pawk.avif"
              alt="Paw Kingdom"
              height="40"
              className="me-2"
            />
            <span className="fs-4 fw-bold">Paw Kingdom</span>
          </Navbar.Brand>

          {/* Auth/Cart Section */}
          <div className="d-flex align-items-center gap-3">
            {Auth.loggedIn() ? (
              <>
                <Button
                  as={Link}
                  to="/account"
                  variant="outline-primary"
                  className="rounded-pill btn-custom-outline"
                >
                  My Account
                </Button>
                <Button
                  variant="link"
                  onClick={Auth.logout}
                  className="text-decoration-none"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline-primary"
                onClick={() => setShowModal(true)}
                className="rounded-pill btn-custom-outline"
                style={{
                  color: "black",
                  borderColor: "#2d3290",
                  "&:hover": {
                    backgroundColor: "#2d3290",
                  },
                }}
              >
                Login / Sign Up
              </Button>
            )}
            <Nav.Link
              as={Link}
              to="/checkout"
              className="position-relative d-flex align-items-center"
            >
              <FaShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0<span className="visually-hidden">items in cart</span>
              </span>
            </Nav.Link>
          </div>
        </Container>
      </Navbar>

      {/* Login/Signup Modal */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        className="auth-modal"
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
