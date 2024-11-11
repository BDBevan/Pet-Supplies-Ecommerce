import { useState, useEffect } from "react";
import { Container, Card, ListGroup, Row, Col, Image } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT_SESSION } from "../utils/mutations";
import "../styles/checkout.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [createCheckoutSession, { loading }] = useMutation(
    CREATE_CHECKOUT_SESSION
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, []);

  const handleCheckout = async () => {
    try {
      // Create line items for Stripe
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Create checkout session
      // In your Checkout.jsx, update the cancelUrl:
      const { data } = await createCheckoutSession({
        variables: {
          input: {
            lineItems,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cart`, // Make sure this matches your route
          },
        },
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId,
      });

      if (error) {
        console.error("Error:", error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Container className="py-5">
      <Card className="checkout-card">
        <Card.Header>
          <h4 className="mb-0">Shopping Cart</h4>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className="align-items-center">
                      <Col xs={3} sm={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                          className="cart-item-image"
                        />
                      </Col>
                      <Col xs={9} sm={6}>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">
                          Quantity: {item.quantity}
                        </small>
                      </Col>
                      <Col xs={12} sm={4} className="text-right">
                        <span className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <Row className="justify-content-between">
                    <Col xs={6}>Subtotal</Col>
                    <Col xs={6} className="text-right">
                      <strong>${cartTotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row className="justify-content-between">
                    <Col xs={6}>Shipping</Col>
                    <Col xs={6} className="text-right">
                      <strong>$5.99</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row className="justify-content-between">
                    <Col xs={6}>Tax (8%)</Col>
                    <Col xs={6} className="text-right">
                      <strong>${(cartTotal * 0.08).toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="total-row">
                  <Row className="justify-content-between">
                    <Col xs={6}>Total</Col>
                    <Col xs={6} className="text-right">
                      <strong>
                        ${(cartTotal + 5.99 + cartTotal * 0.08).toFixed(2)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <button
                    onClick={handleCheckout}
                    className="checkout-button"
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </button>
                </ListGroup.Item>
              </>
            ) : (
              <ListGroup.Item className="text-center">
                Your cart is empty
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Checkout;
