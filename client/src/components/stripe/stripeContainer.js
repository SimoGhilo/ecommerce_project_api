import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm';
import React from 'react';


const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripeContainer;