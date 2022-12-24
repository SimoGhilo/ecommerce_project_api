import React, { useEffect, useState } from 'react';
import Card from './card'
import './styles/cart.css';


const Cart = () => {


    let [carts, setCarts] = useState([]);
    const [refetch, setReFetch] = useState(0);


    useEffect(() => {
        fetch('http://localhost:5000/carts').then((response) => {
            response.json().then((data) => {
                setCarts(data);
            })
        })
    }, [refetch]);


    console.log(carts.map((cart) => { return cart.customer_id }));


    return (
        <>
            <p>Your carts:</p>
            <div className='checkout'>
                {

                    carts.map((cart) => (
                        <div key={cart.cart_id}>
                            <div>
                                <div className='cart' >
                                    <Card setReFetch={setReFetch} refetch={refetch} quantity={cart.quantity} cart_id={cart.cart_id} product_id={cart.product_id} name={cart.name} price={cart.price} customer_id={cart.customer_id} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <br />
            <hr />
            <p>Copyright 2022 E-Market</p>
        </>
    );
};

export default Cart;