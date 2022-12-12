import React from 'react';

const Login = () => {
    return (
        <>
            <div>
                <h1>Login</h1>

                <form action="/login" method="POST">
                    <div>
                        <label for="email">Email: </label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div>
                        <label for="password">Password: </label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <br />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Login;