import './styles/login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import GoogleLogin from 'react-google-login';



import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../slice/loginSlice';





// helper functions & styles

const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}

const googleStyle = {
    width: "6rem",

}



const Login = () => {

    // handling redux state
    const dispatch = useDispatch();
    let isLoggedIn = useSelector(state => state.loginStatus.isLoggedIn); // Redux login

    const [loggedIn, setLoggedIn] = useState(false); // local login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            dispatch(setLoginStatus(true))
            navigate('/');
        }
    }, [loggedIn, dispatch, navigate])


    async function login() {

        const url = 'http://localhost:5000/login';
        const object = {
            email: email,
            customer_password: password
        }


        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            body: JSON.stringify(object)
        });


        if (result.status === 200) {
            //    console.log('logged in');
            const data = await result.json();
            // set state to logged in
            console.log(data)
            const user = { customer_id: data.customer.customer_id, email: data.customer.email, name: data.customer.customer_name, loggedIn: data.loggedIn }
            setLoggedIn(data.loggedIn);
            dispatch(setLoginStatus(user))
        }

        else {
            console.log('invalid credentials');
            alert('Invalid credentials');
        }



    }



    return (
        <>
            <div>
                <br />
                <h1 style={h1Styles}>Login</h1>
                <br />
                <div className='top'>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='bottom'>
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password-login"
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="lower" type="submit" onClick={login}>Login</button>
                <br />
                <img className='google' style={googleStyle} src="https://cdn-icons-png.flaticon.com/512/888/888853.png" />
                <br />
                <form action="http://localhost:5000/auth/google" method="GET">
                    <input className='gmail' type="submit" value="Press to log in" />
                </form>
                <hr />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Login;