import React from 'react';

const CartSummary = ({ items, total }) => {
    return (
        <div className="cart-summary">
            <h2>Cart Summary</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total}</h3>
        </div>
    );
};

export default CartSummary;