import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/// Error when using bycript ?
//var bcrypt = require('bcryptjs');
import './styles/register.css';

const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')


    const [registered, setRegistered] = useState(false);

    const navigate = useNavigate();

    // Redirect below doesnt work
    useEffect(() => {
        if (registered) {
            navigate('/login');
        }
    }, [registered]);

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
        setRegistered(true);
    }

    /// Function works, I need to hash 
    /// the password and  clearing the form fields once submitted.
    /// Why does it not hash the password from the app.post middleware in app.js ?


    return (
        <>
            <div>
                <br />
                <h1 style={h1Styles}>Register</h1>
                <br />
                <div className='values'>
                    <label for="customer_name" id="forename">Name: </label>
                    <input type="text" name="customer_name" id="customer_name"
                        onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='values'>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='values'>
                    <label for="address" id="address">Address:  </label>
                    <input type="text" name="address" id="addressInput"
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='values'>
                    <label for="password" id="password">Create a new password: </label>
                    <input type="password" name="password" id="createPassword"
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className='lower' type="submit" onClick={register}>Register</button>
                <br />
                <hr />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Register;