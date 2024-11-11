import { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListGroup,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT_SESSION } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "../styles/checkout.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [createCheckoutSession, { loading }] = useMutation(
    CREATE_CHECKOUT_SESSION
  );
  const navigate = useNavigate();
  const { setCartItems: setGlobalCartItems } = useOutletContext();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    updateCartTotal(items);
  }, []);

  const updateCartTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    updateCartTotal(items);
    // Update global cart count
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("counts", totalItems.toString());
    setGlobalCartItems(totalItems);
  };

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...cartItems];
    const newQuantity = updatedItems[index].quantity + change;

    if (newQuantity > 0) {
      updatedItems[index].quantity = newQuantity;
      setCartItems(updatedItems);
      updateLocalStorage(updatedItems);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    localStorage.setItem("counts", "0");
    setGlobalCartItems(0);
    setCartItems([]);
    setCartTotal(0);
  };

  const handleCheckout = async () => {
    try {
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const { data } = await createCheckoutSession({
        variables: {
          input: {
            lineItems,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/checkout`,
          },
        },
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId,
      });

      if (error) {
        console.error("Error:", error);
        navigate("/checkout");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      navigate("/checkout");
    }
  };

  return (
    <Container className="py-5">
      <Card className="checkout-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Shopping Cart</h4>
          {cartItems.length > 0 && (
            <Button variant="link" className="text-danger" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index} className="position-relative">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="position-absolute top-0 end-0 btn btn-link text-danger"
                      style={{ padding: "0.5rem", fontSize: "1.2rem" }}
                    >
                      ×
                    </button>
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
                      <Col xs={9} sm={4}>
                        <h6 className="my-0">{item.name}</h6>
                        <div className="d-flex align-items-center mt-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(index, -1)}
                            className="me-2"
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(index, 1)}
                            className="ms-2"
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} className="text-end">
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
                    <Col xs={6} className="text-end">
                      <strong>${cartTotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row className="justify-content-between">
                    <Col xs={6}>Shipping</Col>
                    <Col xs={6} className="text-end">
                      <strong>$5.99</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row className="justify-content-between">
                    <Col xs={6}>Tax (8%)</Col>
                    <Col xs={6} className="text-end">
                      <strong>${(cartTotal * 0.08).toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="total-row">
                  <Row className="justify-content-between">
                    <Col xs={6}>Total</Col>
                    <Col xs={6} className="text-end">
                      <strong>
                        ${(cartTotal + 5.99 + cartTotal * 0.08).toFixed(2)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <button
                    onClick={handleCheckout}
                    className="checkout-button w-100"
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
