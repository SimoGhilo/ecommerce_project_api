import React from 'react';
import Products from './products';

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


    return (
        <div>
            <div>
                <img src={src} />
                <br />
                <h4>{titleCase(props.name)}</h4>
                <p>£ {props.price}</p>
                <p>{titleCase(props.description)}</p>
                <br />
                <button>Add to cart</button>
            </div>
        </div>
    )
}

export default Product;