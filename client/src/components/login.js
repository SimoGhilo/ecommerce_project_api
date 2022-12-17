import './styles/login.css';
import React, { useState } from 'react';

// helper functions & styles

const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}



const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        const url = 'http://localhost:5000/login';
        const object = {
            email: email,
            customer_id: 3,  // How to fix this ? auto increment in the database ?
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


        if (result.status === 200) {
            console.log('logged in');
        }

        else {
            console.log('invalid credentials');
        }

        /*TESTING ABOVE*/

        //result = await result.json();
        //console.log(result[0]);

        /// Login not working ?


    }

    /// Login implementation doesn't work
    return (
        <>
            <div>
                <h1 style={h1Styles}>Login</h1>
                <div className='top'>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='bottom'>
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" onClick={login}>Login</button>
                <br />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Login;