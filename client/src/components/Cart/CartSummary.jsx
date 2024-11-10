import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartSummary = ({ subtotal, shipping = 0, tax = 0 }) => {
  const total = subtotal + shipping + tax;

  return (
    <Card>
      <Card.Body>
        <h5 className="mb-4">Order Summary</h5>
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4 fw-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link to="/checkout">
          <Button variant="primary" className="w-100">
            Proceed to Checkout
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
