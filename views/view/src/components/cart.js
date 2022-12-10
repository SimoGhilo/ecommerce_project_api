import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cart = () => {
    let name = '';
    let [carts, setCarts] = useState([]);
    //let { id } = useParams()


    useEffect(() => {
        fetch('https://localhost:5000/carts').then((response) => {
            response.json().then((data) => {
                setCarts(data);
            })
        })
    }, []);

    async function handleCheckout(id) {
        const response = await fetch(`https://localhost:5000/carts/:${id}/checkout`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)

        })

        return response.json()
    };



    return (
        <>

            if (cart.product_id === 1) {
                name = 'Deckchair'
            }
            if (cart.product_id === 2) {
                name = 'Wooden Stool'
            }
            if (cart.product_id === 3) {
                name = 'Table'
            }
            <div>
                {carts.map((cart) => (
                    <>
                        <div>
                            <p>{name}</p>
                            <p>Your cart: </p>
                            <p>{cart.quantity}</p>
                        </div>
                        <p>Complete payment:</p>
                        <form method="post" action="payment">
                            <button type="submit" name="payment" onClick={handleCheckout(cart.cart_id)} >Pay Now</button>
                        </form>
                    </>
                ))}
            </div>
        </>
    );
};

export default Cart;