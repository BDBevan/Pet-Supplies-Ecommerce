import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Search Bar */}
      <Container className="my-4">
        <Form onSubmit={handleSearch} className="d-flex justify-content-center">
          <Form.Group className="w-50">
            <Form.Control
              type="search"
              placeholder="Search for pet supplies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-pill"
            />
          </Form.Group>
        </Form>
      </Container>

      {/* Main Content - Full Height Split Sections */}
      <div className="flex-grow-1 d-flex">
        {/* Dogs Section */}
        <Link
          to="/collections/dog"
          className="w-50 text-decoration-none position-relative"
          style={{
            background: "#f8f9fa",
            overflow: "hidden",
          }}
        >
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h2 className="display-1 fw-bold text-primary mb-3">DOGS</h2>
            <p className="fs-4 text-primary">
              Find supplies for your furry friend
            </p>
          </div>
        </Link>

        {/* Cats Section */}
        <Link
          to="/collections/cat"
          className="w-50 text-decoration-none position-relative"
          style={{
            background: "#f8f9fa",
            overflow: "hidden",
          }}
        >
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h2 className="display-1 fw-bold text-primary mb-3">CATS</h2>
            <p className="fs-4 text-primary">Discover perfect cat supplies</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
