import React, { useState, useEffect } from 'react';


const Card = (props) => {

    const [cart_id, setCart_id] = useState(0);

    let product_id = props.product_id;
    let quantity = props.quantity;
    let name = props.name;
    let price = props.price;
    let customer_id = props.customer_id;


    async function handleRemove() {

        await setCart_id(props.cart_id)

        removeFromCart(cart_id)
    };
    /// Removing an item from the cart , not working

    console.log(cart_id);

    async function removeFromCart(cart_id) {

        const url = `http:localhost:5000/carts/:${cart_id}`
        await fetch(url, {
            method: 'DELETE',
            success: function () {
                alert('Item removed successfully')
            },
            error: function () {
                alert('Error removing item')
            }

        });
    }

    async function handleCheckout() {

        console.log('checking cart_id', props.cart_id);
        await checkout(props.cart_id)
    }

    async function checkout(cart_id) {

        const object = {

            customer_id: customer_id,
            price: price,
            product_id: product_id,
            quantity: quantity
        }
        try {
            const response = await fetch(`http://localhost:5000/carts/:${cart_id}/checkout`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(object)

            })

            return response.json();

        } catch (error) {

            console.error(error.message);

        }

    };





    return (
        <>
            <p>{name}</p>
            <p>Quantity:</p>
            <p>{quantity}</p>
            <h6>Price</h6>
            <p>£ {quantity * price}</p>
            <button onClick={handleRemove}>Remove from your cart</button>
            <br />
            <p>Complete payment:</p>
            <button type="submit" name="payment" onClick={handleCheckout} >Pay Now</button>
            <br />
        </>
    );
};

export default Card;