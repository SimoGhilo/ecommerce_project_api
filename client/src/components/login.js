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


    /////////////   Google Token Login   //////////////

    /// Testing below
    /*  async function googleLogin1() {
          const url = 'http://localhost:5000/google';
          let result = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:5000'
              },
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'include',
  
  
          })
  
          console.log(result)
      } */

    async function googleLogin() {
        const url = 'http://localhost:5000/google/callback';
        //let object = 
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5000'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            body: JSON.stringify({ access_token: "ya29.a0AX9GBdWi4JfSf5FHvDRMuoUSZPLmlmplJbSbluQyVYoNd0xEat4HOa5_xejF-GtIrXVANiWu5jMXJPyd84RCmsjckTbc1GABaWJ6FyaWyRKiUZ85YzJzJtLJHRuO-RukW-ksxgWx3WrcGOYwQvZGAglHPZjAkd8aCgYKAXgSAQASFQHUCsbCuZGvyVH_pMcLsLZX90hLqg0166" })

        },)

        if (result.status === 200) {
            //    console.log('logged in');
            const data = await result.json();
            // set state to logged in
            console.log(data)
            const user = { customer_id: data.customer.customer_id, email: data.customer.email, name: data.customer.customer_name, loggedIn: data.loggedIn }
            setLoggedIn(data.loggedIn);
            dispatch(setLoginStatus(user))
        }


        /// Working on google log in here *******

    }

    /* Google Oauth login

  async function handleGoogleLogin() {
      const url = 'http://localhost:5000/google';
      let response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'include',

      })
      console.log(response)
  }

  */




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
                <img className='google' style={googleStyle} src="https://cdn-icons-png.flaticon.com/512/888/888853.png" onClick={googleLogin} />
                <br />
                <hr />
                <p>Copyright 2022 E-Market</p>
            </div>
        </>
    );
};

export default Login;