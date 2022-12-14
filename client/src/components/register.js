import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
/// Error when using bycript ?
//var bcrypt = require('bcryptjs');


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')

    /*async function hashPassword(password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async function changePassword(password) {
        try {
            const hashedPassword = await hashPassword(password);
            setPassword(hashedPassword)
        } catch (error) {
            console.log(error)
        }
        console.log(password)
    }

    useEffect(() => {

        changePassword(password);

    }, [password])

    TRIED TO USE BCRYPT BUT DID NOT WORK */




    async function register() {
        const url = 'http://localhost:5000/customers';
        const object = {
            customer_id: 27,  // How to fix this ? auto increment in the database ?
            customer_name: name,
            address: address,
            email: email,
            customer_password: password
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)
        });

        result = await result.json();
    }

    /// Function works, but now I will have to find a way to redirect to the dashboard, hash 
    /// the password and sort out the id as well as clearing the form fields once submitted.


    return (
        <>
            <div>
                <h1>Register</h1>
                <div>
                    <label for="customer_name">Name: </label>
                    <input type="text" name="customer_name" id="customer_name"
                        onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label for="address">Address: </label>
                    <input type="text" name="address" id="address"
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label for="password">Create a new password: </label>
                    <input type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" onClick={register}>Register</button>
                <br />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Register;