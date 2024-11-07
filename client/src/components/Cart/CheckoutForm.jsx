import React, { useState } from 'react';

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div>
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div>
                <label>Zip Code</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <div>
                <label>Card Number</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Expiration Date</label>
                <input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
            </div>
            <div>
                <label>CVV</label>
                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CheckoutForm;