import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = ({ message = "An error occurred." }) => {
  return (
    <Container className="py-5 text-center">
      <Alert variant="danger">
        <Alert.Heading>Oops!</Alert.Heading>
        <p>{message}</p>
      </Alert>
      <Button as={Link} to="/" variant="primary">
        Return to Home
      </Button>
    </Container>
  );
};

export default Error;
