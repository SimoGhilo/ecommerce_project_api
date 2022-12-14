import React, { useState, useEffect } from 'react';


const Card = (props) => {

    const [cart_id, setCart_id] = useState(0);

    let product_id = props.product_id;
    let quantity = props.quantity;
    let name = props.name;
    let price = props.price;


    async function handleRemove() {

        await setCart_id(props.cart_id)

        removeFromCart(cart_id)
    };
    /// Removing an item from the cart

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
    return (
        <>
            <p>{name}</p>
            <p>Quantity:</p>
            <p>{quantity}</p>
            <h6>Price</h6>
            <p>£ {quantity * price}</p>
            <button onClick={handleRemove}>Remove from your cart</button>
        </>
    );
};

export default Card;