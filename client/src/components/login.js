
import React, { useState } from 'react';

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        const url = 'http://localhost:5000/login';
        const object = {
            email: email,
            customer_id: 27,  // How to fix this ? auto increment in the database ?
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

    /// Login implementation doesn't work
    return (
        <>
            <div>
                <h1>Login</h1>
                <div>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
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