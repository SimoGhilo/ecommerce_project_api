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
    { /* <div key={cart.cart_id}>
    <Card quantity={cart.quantity} cart_id={cart.cart_id} product_id={cart.product_id} />
</div> */}

    ///     2 approaches : either use the card component (return statement above) (sending down props)
    ///      or the logic below: (Both not working)

    return (
        <>
            <div>
                {carts.map((cart) => {
                    let _name = '';  // Use some temp variable for the name
                    let _price = ''; // Use some temp variable for the price
                    if (cart.product_id === 1) {
                        _name = 'Deckchair';
                        _price = 26;
                    } else if (cart.product_id === 2) {
                        _name = 'Stool';
                        _price = 10;
                    } else if (cart.product_id === 3) {
                        _name = 'Table';
                        _price = 77;
                    }
                    <>
                        <div>
                            <p>Items in your cart:</p>
                            <p>{_name}</p>
                            <p>Quantity:</p>
                            <p>{cart.quantity}</p>
                            <h6>Total price</h6>
                            {_price}

                        </div>
                        <p>Complete payment:</p>
                        <form method="post" action="payment">
                            <button type="submit" name="payment" onClick={handleCheckout(cart.cart_id)} >Pay Now</button>
                        </form>
                        <br />
                        <p>Copyright 2022 E-Market</p>
                    </>
                })}
            </div>

        </>
    );
};

export default Cart;