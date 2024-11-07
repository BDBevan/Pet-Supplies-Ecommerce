import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('your-publishable-key-here');
    }
    return stripePromise;
};

export default getStripe;