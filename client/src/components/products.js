import React, { useEffect, useState } from 'react';
import Product from './product';


const Products = () => {
    let [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/products').then((response) => {
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
            <br />
            <p>Copyright 2022 E-Market</p>
        </div>
    );
};

export default Products;

