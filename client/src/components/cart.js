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


    console.log(carts.map((cart) => { return cart.customer_id }));


    return (
        <>
            <p>Your carts:</p>
            <div>
                {

                    carts.map((cart) => (
                        <div key={cart.cart_id}>
                            <div>
                                <div >
                                    <Card quantity={cart.quantity} cart_id={cart.cart_id} product_id={cart.product_id} name={cart.name} price={cart.price} customer_id={cart.customer_id} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Cart;