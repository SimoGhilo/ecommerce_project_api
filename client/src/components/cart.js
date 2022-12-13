import React, { useEffect, useState } from 'react';
import Card from './card'


const Cart = () => {


    let [carts, setCarts] = useState([]);



    useEffect(() => {
        fetch('http://localhost:5000/carts').then((response) => {
            response.json().then((data) => {
                setCarts(data);
            })
        })
    }, []);


    async function handleCheckout(id) {

        try {
            const response = await fetch(`http://localhost:5000/carts/:${id}/checkout`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(id)

            })

            return response.json();

        } catch (error) {

            console.error(error.message);

        }

    };



    return (
        <div>
            {
                carts.map((cart) => (
                    <div key={cart.cart_id}>
                        <div>
                            <div >
                                <Card quantity={cart.quantity} cart_id={cart.cart_id} product_id={cart.product_id} name={cart.name} price={cart.price} />
                            </div>
                        </div>
                        <p>Complete payment:</p>
                        <form method="post" action="payment">
                            <button type="submit" name="payment" onClick={handleCheckout(cart.cart_id)} >Pay Now</button>
                        </form>
                        <br />
                        <p>Copyright 2022 E-Market</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;