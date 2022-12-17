import React from 'react';
import { Link } from 'react-router-dom';
import './styles/product.css';

const linkStyles = {
    textDecoration: "none",
    color: "#202020",
    fontSize: "1.35rem",

}


const Product = (props) => {

    // helper functions

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

    function titleCase(string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    async function createCart() {
        const url = 'http://www.localhost:5000/carts';
        const object = {
            cart_id: ((Math.random()) * 100 + (Math.random()) * 100) / 2,
            product_id: props.product_id,
            quantity: 1,
            customer_id: 13 /// will change later, FK to be added in Postgres?
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)

        })

        result = await result.json();
    };


    return (
        <div>
            <div>
                <img src={src} />
                <br />
                <Link className='link' style={linkStyles} to={`/products/${props.name}`}>{titleCase(props.name)}</ Link>
                <p>£ {props.price}</p>
                {/*<p>{titleCase(props.description)}</p>*/}
                <br />
                <button onClick={createCart}><p>Add to your cart</p></button>
            </div>
        </div>
    )
}

export default Product;