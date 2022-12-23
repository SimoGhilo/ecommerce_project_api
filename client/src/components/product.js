import React from 'react';
import { Link } from 'react-router-dom';
import './styles/product.css';

const linkStyles = {
    textDecoration: "none",
    color: "#202020",
    fontSize: "1.35rem",

}

const links = {
    empty: '',
    deckchair: "https://images.unsplash.com/photo-1513681929100-fa03b42121d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGVja2NoYWlyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    stool: "https://images.unsplash.com/photo-1625418419248-54a6a90c6776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3Rvb2x8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    table: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=709&q=80"
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

    console.log(props.product_id);
    return (
        <div>
            <div className="card">
                {<img className='product' src={links[props.name]} />}
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