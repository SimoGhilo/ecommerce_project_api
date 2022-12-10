import React from 'react';

const Register = () => {
    return (
        <>
            <div>
                <h1>Register</h1>
                <form action="/register" method="POST">
                    <div>
                        <label for="customer_name">Name: </label>
                        <input type="text" name="customer_name" id="customer_name" required />
                    </div>
                    <div>
                        <label for="email">Email: </label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div>
                        <label for="address">Address: </label>
                        <input type="text" name="address" id="address" />
                    </div>
                    <div>
                        <label for="password">Create a new password: </label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
};

export default Register;