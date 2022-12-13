import React, { useState, useEffect } from 'react';


const Card = (props) => {


    let product_id = props.product_id;
    let quantity = props.quantity;
    let name = props.name;
    let price = props.price;
    console.log('In cart component');
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