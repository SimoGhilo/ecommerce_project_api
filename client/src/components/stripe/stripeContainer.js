import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './paymentForm';
import React from 'react';



const PUBLIC_KEY = "pk_test_51MGghLEhCjW3jh5Vr5ytwNs2T6zLmw2Rk8TPIZMCbtp3ozTJ3Ws3SvqODIrfw9J3EoIiQ7E1GNaVlZMaQxQu4ro600GxU0rEBr"


const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {

    const { amount } = props;
    const { name, cart_id } = props;
    const { handleCheckout, checkout } = props;
    const { checkedout, setCheckedout } = props;
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm amount={amount} name={name} cart_id={cart_id} handleCheckout={handleCheckout} checkout={checkout} checkedout={checkedout} setCheckedOut={setCheckedout} />
        </Elements>
    );
};

export default StripeContainer;