import { useState, useEffect } from "react";
import { Container, Card, ListGroup, Row, Col, Image } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import "../../public/checkout.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, []);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const handleCheckout = () => {
    getCheckout({
      variables: {
        products: cartItems.map((item) => item._id),
      },
    });
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
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
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
