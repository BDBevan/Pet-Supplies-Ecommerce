import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    const handleRemove = () => {
        onRemove(item.id);
    };

    const handleQuantityChange = (event) => {
        onUpdateQuantity(item.id, event.target.value);
    };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    min="1"
                />
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;