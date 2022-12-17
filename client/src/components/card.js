import React, { useState, useEffect } from 'react';


// helper function & styles 

function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}


const Card = (props) => {

    // Setting images paths

    let src = ''

    if (props.name === 'deckchair') {
        src = "./media/deckchair.jpg";
    }

    if (props.name === 'stool') {
        src = "./media/stool.jpg";
    }

    if (props.name === 'table') {
        src = "./media/table.jpg";
    }

    const buttonAmountStyle = {
        height: "1.2rem",
        width: "0.5rem"
    }

    // const [cart_id, setCart_id] = useState(0);
    const [toggleQuantity, setToggleQuantity] = useState(props.quantity);
    const [togglePrice, setTogglePrice] = useState(props.price);

    let product_id = props.product_id;
    let quantity = props.quantity;
    let name = props.name;
    let price = props.price;
    let customer_id = props.customer_id;

    useEffect(() => {
        if ((toggleQuantity || togglePrice) <= 0) {
            setToggleQuantity(0);
        }

    }, [toggleQuantity, togglePrice]);

    function useHandleIncrement() {
        setToggleQuantity(toggleQuantity + 1)

    }
    function useHandleDecrement() {
        setToggleQuantity(toggleQuantity - 1)

    }

    function handleRemove() {

        removeFromCart(props.cart_id)
    };
    /// Removing an item from the cart, does not work

    // console.log(cart_id);

    async function removeFromCart(cart_id) {

        const url = `http:localhost:5000/carts/${cart_id}`
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
            const response = await fetch(`http://localhost:5000/carts/${cart_id}/checkout`, {
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
            <p>{titleCase(name)}</p>
            <img src={src} />
            <p>Quantity:</p>
            <p><button style={buttonAmountStyle} onClick={useHandleIncrement}>+</button>{toggleQuantity}<button style={buttonAmountStyle} onClick={useHandleDecrement}>-</button></p>
            <h6>Price</h6>
            <p>£ {togglePrice * toggleQuantity}</p>
            <button onClick={handleRemove}>Remove from your cart</button>
            <br />
            <p>Complete payment:</p>
            <button type="submit" name="payment" onClick={handleCheckout} >Pay Now</button>
            <br />
        </>
    );
};

export default Card;