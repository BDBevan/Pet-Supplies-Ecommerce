import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { category } = useParams();

  return (
    <div className="flex-grow-1 bg-light py-4">
      <Container>
        {/* Category Title */}
        {/* <h1 className="text-primary mb-4 text-center">
          {category === "dog" ? "Dogs" : "Cats"} Supplies
        </h1> */}

        {/* Filters and Sort */}
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="search"
              placeholder="Search for pet supplies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2 mb-md-0"
              className="shadow-sm"
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="shadow-sm"
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
            {/* This is where your ProductGrid component would go */}
            <div className="text-center">
              <p>Showing products for {category}</p>
              {/* You can replace this with your actual product grid */}
              <div className="bg-white p-4 rounded shadow-sm">
                Product grid will go here
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Collections;
