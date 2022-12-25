import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./paymentForm.css";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: 'Source Code Pro',
            fontSize: "1rem",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "ffffff" },
            "::placeholder": { color: "ffffff" }
        },
        invalid: {
            iconColor: "ffffff",
            color: "ffffff"
        }
    }
}

const PaymentForm = (props) => {

    const { amount } = props;

    const [success, setSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:5000/payment", {
                    amount: amount * 100,
                    id: id,
                })

                if (response.data.success) {

                    console.log("Payment successful");
                    setSuccess(true)
                }
            } catch (e) {
                console.log("Error", e);
            }
        } else {

            console.log(error.message)
        }


    };



    return (
        <>
            {
                !success ?
                    (<form onSubmit={handleSubmit}>
                        <fieldset className="formGroup">
                            <div className="formRow">
                                <CardElement options={CARD_OPTIONS} />
                            </div>
                        </fieldset>
                        <button>Pay with Stripe</button>
                    </form>)
                    :
                    (<div>
                        <h2>Payment successful!</h2>
                    </div>)
            }

        </>
    );
};

export default PaymentForm;