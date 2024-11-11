import React from 'react';

const CartSummary = ({ cartItems }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}: ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotalPrice()}</h3>
    </div>
  );
};

export default CartSummary;</li>