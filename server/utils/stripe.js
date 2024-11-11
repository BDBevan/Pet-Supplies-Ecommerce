const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

const retrievePaymentIntent = async (id) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(id);
        return paymentIntent;
    } catch (error) {
        console.error('Error retrieving payment intent:', error);
        throw error;
    }
};

module.exports = {
    createPaymentIntent,
    retrievePaymentIntent,
};