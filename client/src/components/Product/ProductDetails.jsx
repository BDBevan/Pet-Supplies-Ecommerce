import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Container className="py-4">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/collections" }}>
          Collections
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-4">
        <Col md={6}>
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-start">
            <h2>{product.name}</h2>
            <Button
              variant="link"
              className="p-0"
              onClick={() => onToggleFavorite(product._id)}
            >
              {isFavorite ? (
                <FaHeart className="text-danger" />
              ) : (
                <FaRegHeart />
              )}
            </Button>
          </div>
          <h4 className="text-primary mb-4">${product.price.toFixed(2)}</h4>
          <p className="mb-4">{product.description}</p>

          <Form className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: "100px" }}
              />
            </Form.Group>
            <Button
              variant="primary"
              size="lg"
              onClick={() => onAddToCart(product, quantity)}
            >
              Add to Cart
            </Button>
          </Form>

          <hr />
          <h5>Product Details</h5>
          <ul>
            {product.details?.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
