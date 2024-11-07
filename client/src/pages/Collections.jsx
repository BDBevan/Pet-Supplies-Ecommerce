import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { category } = useParams();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 bg-light py-4">
        <Container>
          {/* Filters and Sort */}
          <Row className="mb-4">
            <Col md={8}>
              <Form.Control
                type="search"
                placeholder="Search for pet supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2 mb-md-0"
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Products Grid Placeholder */}
          <Row>
            <Col>
              <div className="text-center">
                <p>Showing products for {category}</p>
                <div className="bg-white p-4 rounded shadow-sm">
                  Product grid will go here
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll to Top Button */}
        <Button onClick={scrollToTop} className="scroll-to-top" variant="light">
          <FaArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default Collections;
