import React, { useState, useEffect } from 'react';


const Card = (props) => {

    let [price, setPrice] = useState(0);
    let [name, setName] = useState('');

    let product_id = props.product_id;
    let quantity = props.quantity;


    if (product_id === 1) {
        setName('Deckchair');
        setPrice(26);
    } if (product_id === 2) {
        setName('Stool');
        setPrice(10);
    } if (product_id === 3) {
        setName('Table');
        setPrice(77);
    }

    return (
        <>
            <p>Items in your cart:</p>
            <p>{name}</p>
            <p>Quantity:</p>
            <p>{quantity}</p>
            <h6>Total price</h6>
            <p>£ {quantity * price}</p>
            {console.log(quantity * price)}
        </>
    );
};

export default Card;