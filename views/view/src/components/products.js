import React, { useEffect, useState } from 'react';
import Product from './product';


const Products = () => {
    let [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://localhost:5000/products').then((response) => {
            response.json().then((data) => {
                setProducts(data);
            });
        });
    }, [])


    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <Product price={product.price} name={product.name} description={product.description} />
                </div>
            ))}
        </div>
    );
};

export default Products;

// Use react links to each single product above ?

// The useEffect is it right ? is the endpoint set up correctly ? Do you need to useState ?
// Why react is not supported in my routes ? 