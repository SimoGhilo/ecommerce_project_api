import React from 'react';


const Product = (props) => {

    // helper functions

    let src = ''

    if (props.name === 'deckchair') {
        src = '../media/deckchair.jpg';
    }

    if (props.name === 'stool') {
        src = '../media/stool.jpg';
    }

    if (props.name === 'table') {
        src = '../media/table.jpg';
    }

    function titleCase(string) {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    async function createCart() {
        const url = 'http://www.localhost:5000/carts';
        const object = {
            cart_id: (Math.random()) * 100 + (Math.random()) * 100,
            product_id: props.product_id,
            quantity: 1,
            customer_id: 13
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
                <h4>{titleCase(props.name)}</h4>
                <p>£ {props.price}</p>
                <p>{titleCase(props.description)}</p>
                <br />
                <button onClick={createCart}>Add to your cart</button>

            </div>
        </div>
    )
}

export default Product;