import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search query from URL when component mounts or URL changes
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
      // Here you would typically trigger your search functionality
      handleSearch(searchQuery);
    }
  }, [searchParams]);

  // Handle local search
  const handleLocalSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm.trim() });
      handleSearch(searchTerm.trim());
    }
  };

  // Function to handle search
  const handleSearch = (query) => {
    // Implement your search logic here
    // This could be a GraphQL query or API call
    console.log("Searching for:", query);
    // Update your products display based on search results
  };

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
              <Form onSubmit={handleLocalSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search for pet supplies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2 mb-md-0"
                />
              </Form>
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
                <p>
                  {searchTerm
                    ? `Showing results for "${searchTerm}"`
                    : `Showing products for ${category || "all categories"}`}
                </p>
                <div className="bg-white p-4 rounded shadow-sm">
                  Product grid will go here
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll to Top Button */}
        <Button
          onClick={scrollToTop}
          className="scroll-to-top"
          variant="light"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2d3290",
            color: "white",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <FaArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default Collections;
