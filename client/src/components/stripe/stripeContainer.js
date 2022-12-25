import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm';
import React from 'react';



const PUBLIC_KEY = "pk_test_51MGghLEhCjW3jh5Vr5ytwNs2T6zLmw2Rk8TPIZMCbtp3ozTJ3Ws3SvqODIrfw9J3EoIiQ7E1GNaVlZMaQxQu4ro600GxU0rEBr"


const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {

    const { amount } = props;
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm amount={amount} />
        </Elements>
    );
};

export default StripeContainer;