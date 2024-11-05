import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CartSummary from "../components/Cart/CartSummary";

const Checkout = () => {
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Shipping Information</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={shippingForm.firstName}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={shippingForm.lastName}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            lastName: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) =>
                      setShippingForm({
                        ...shippingForm,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={shippingForm.phone}
                    onChange={(e) =>
                      setShippingForm({
                        ...shippingForm,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) =>
                      setShippingForm({
                        ...shippingForm,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            city: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        value={shippingForm.state}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            state: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={shippingForm.zipCode}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            zipCode: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h4 className="mb-0">Payment Information</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={paymentForm.cardNumber}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        cardNumber: e.target.value,
                      })
                    }
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    value={paymentForm.cardName}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        cardName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={paymentForm.expiry}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            expiry: e.target.value,
                          })
                        }
                        placeholder="MM/YY"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        value={paymentForm.cvv}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="123"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100"
                >
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <CartSummary
            subtotal={99.99} // Replace with actual cart subtotal
            shipping={5.99} // Replace with actual shipping cost
            tax={8.99} // Replace with actual tax calculation
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
