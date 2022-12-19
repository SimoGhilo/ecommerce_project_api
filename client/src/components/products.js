import React, { useEffect, useState } from 'react';
import Product from './product';
import './styles/products.css';




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
        <>
            <div className="wrapper">
                {products.map((product) => (
                    <div key={product.id} className="box">
                        <Product price={product.price} name={product.name} description={product.description} product_id={product.id} />
                    </div>
                ))}
                <br />
            </div>
            <div className="bottom">
                <hr />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Products;

