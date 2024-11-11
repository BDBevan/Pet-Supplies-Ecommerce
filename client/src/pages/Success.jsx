import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const Success = () => {
  const { setCartItems } = useOutletContext();

  useEffect(() => {
    // Clear the cart and reset count
    localStorage.removeItem("cartItems");
    localStorage.setItem("counts", "0");
    setCartItems(0);
  }, [setCartItems]);

  return (
    <Container className="py-5">
      <Card>
        <Card.Body className="text-center">
          <h2 className="mb-4">Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Success;
