import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Welcome to Paw Kingdom</h1>
              <p>Your one-stop shop for premium cat and dog supplies</p>
              <Link to="/collections">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <img
                src="/hero-image.jpg"
                alt="Happy pets"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section */}
      <section className="categories-section">
        <Container>
          <h2 className="text-center mb-4">Shop by Pet</h2>
          <Row>
            <Col md={6}>
              <Card className="category-card">
                <Card.Img variant="top" src="/cat-category.jpg" />
                <Card.Body>
                  <Card.Title>Cat Supplies</Card.Title>
                  <Link to="/collections?pet=cat">
                    <Button variant="outline-primary">Shop Cat</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="category-card">
                <Card.Img variant="top" src="/dog-category.jpg" />
                <Card.Body>
                  <Card.Title>Dog Supplies</Card.Title>
                  <Link to="/collections?pet=dog">
                    <Button variant="outline-primary">Shop Dog</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <Container>
          <h2 className="text-center mb-4">Featured Products</h2>
          <Row>{/* Add ProductCard components here */}</Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
