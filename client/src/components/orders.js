import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Order from './order';


const Orders = () => {
    // const dispatch = useDispatch();
    let user = useSelector((state) => state.loginStatus.isLoggedIn);
    // console.log(user)
    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        fetch('http://localhost:5000/orders', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include'
        }).then((response) => {

            response.json().then((data) => {
                setOrders(data);
            });
        });
    }, [])


    return (
        <div>
            <h2>Your orders:</h2>
            {orders.map((order) => (
                <div className="order" key={order.id}>
                    <Order id={order.id} product_id={order.product_id} order_status={order.order_status} amount={order.amount} quantity={order.quantity} customer_id={order.customer_id} />
                </div>
            ))}
            <br />
            <hr />
            <p>Copyright 2022 E-Market</p>
        </div>
    );
};

export default Orders;