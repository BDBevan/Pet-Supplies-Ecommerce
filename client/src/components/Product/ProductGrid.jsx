import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites,
}) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product._id}>
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(product._id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
