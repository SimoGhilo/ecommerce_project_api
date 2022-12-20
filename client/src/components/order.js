import React, { useState, useEffect } from 'react';

const Order = (props) => {

    const [name, setName] = useState('');

    useEffect(() => {

        if (props.product_id === 1) {
            setName('Deckchair');
        }

        if (props.product_id === 2) {
            setName('Stool');
        }

        if (props.product_id === 3) {
            setName('Table');
        }

    }, [])

    return (
        <>
            <div>
                <h5 className="customer-orders">Order number: {props.id}</h5>
                <p>Product: {name}</p>
                <p>Quantity: {props.quantity}</p>
                <p>Total cost: £ {props.amount}</p>
                <p>Order status: {props.order_status}</p>
            </div>
        </>
    );
};

export default Order;