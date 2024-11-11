import React from "react";
import { Button, Stack, Image } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="cart-item p-3 border-bottom"
    >
      <Image
        src={item.image}
        alt={item.name}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <h6>{item.name}</h6>
        <p className="text-muted mb-0">${item.price}</p>
        <div className="d-flex align-items-center mt-2">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      <h5 className="mb-0">${(item.price * item.quantity).toFixed(2)}</h5>
      <Button
        variant="link"
        className="text-danger"
        onClick={() => onRemove(item.id)}
      >
        <FaTrash />
      </Button>
    </Stack>
  );
};

export default CartItem;
