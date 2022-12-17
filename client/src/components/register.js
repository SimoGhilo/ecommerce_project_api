import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
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
            customer_name: name,
            address: address,
            email: email,
            customer_password: password
        }

        /*  axios.post(url, object, {
              headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:5000/'
              },
          }).catch(err => {
              console.error(err);
          }); 
          
          EITHER WAY WORKS , AXIOS AND AJAX CALL
          */

        const result = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',

            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(object)
        });

        result = await result.json();
    }

    /// Function works, but now I will have to find a way to redirect to the dashboard, hash 
    /// the password and  clearing the form fields once submitted.
    /// Why does it not hash the password from the app.post middleware in app.js ?


    return (
        <>
            <div>
                <h1>Register</h1>
                <div className='field'>
                    <label for="customer_name">Name: </label>
                    <input type="text" name="customer_name" id="customer_name"
                        onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='field'>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='field'>
                    <label for="address">Address: </label>
                    <input type="text" name="address" id="address"
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='field'>
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