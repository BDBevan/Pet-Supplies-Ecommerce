import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Search Bar */}
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={6} className="mx-auto">
            <Form onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search for pet supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-sm"
              />
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Main Content - Full Height Split Sections */}
      <div className="flex-grow-1 d-flex">
        {/* Dogs Section */}
        <Link to="/collections/dog" className="category-section">
          <div className="category-content position-absolute top-50 start-50 translate-middle text-center">
            <div className="mb-4" style={{ fontSize: "120px" }}>
              🐕
            </div>
            <h2 className="display-1 fw-bold mb-3" style={{ color: "#2d3290" }}>
              DOGS
            </h2>
            <p className="fs-4 mb-3" style={{ color: "#2d3290" }}>
              Find supplies for your furry friend
            </p>
          </div>
        </Link>

        {/* Cats Section */}
        <Link to="/collections/cat" className="category-section">
          <div className="category-content position-absolute top-50 start-50 translate-middle text-center">
            <div className="mb-4" style={{ fontSize: "120px" }}>
              🐱
            </div>
            <h2 className="display-1 fw-bold mb-3" style={{ color: "#2d3290" }}>
              CATS
            </h2>
            <p className="fs-4 mb-3" style={{ color: "#2d3290" }}>
              Discover perfect cat supplies
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
