import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-white py-3 shadow-sm">
      <Container fluid>
        <p className="text-center mb-0" style={{ color: "#2d3290" }}>
          © 2024 Paw Kingdom. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
