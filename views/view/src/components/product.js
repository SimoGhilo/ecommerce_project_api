import React from 'react';
import Products from './products';

const Product = (props) => {
    return (
        <div>
            <div>
                <img src='../public/shopping-cart.png' />
                <br />
                <h4>{props.name}</h4>
                <p>{props.price}</p>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Product;