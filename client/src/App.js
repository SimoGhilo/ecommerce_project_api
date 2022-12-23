import './App.css';
import Login from './components/login';
import { Route, Routes, Link, Redirect, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import Cart from './components/cart';
import Register from './components/register';
import NotFound from './components/notFound';
import Products from './components/products';
import Dashboard from './components/dashboard';
import Checkout from './components/checkout';
import Stool from './components/products/stool'
import Table from './components/products/table'
import Deckchair from './components/products/deckchair'

// retrieving the loginStatus from the Slice using redux

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from './slice/loginSlice';



// Stripe and helpers

// import "@stripe/stripe-js";

const linkStyles = {
  textDecoration: "none",
  color: "#202020",
  fontSize: "1.35rem",

}

const h1Styles = {
  color: "#202020",
  textShadow: "2px 2px rgb(127, 80, 245)",
}



function App() {

  // handling redux state
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.loginStatus.isLoggedIn);
  console.log(isLoggedIn)


  // const [loggedIn, setLoggedIn] = useState(false);

  async function login() {
    const url = 'http://localhost:5000/isLoggedIn';
    let result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include'
    })

    result = result.json();
    return result;
  }

  useEffect(() => {
    async function fetchLogin() {

      let result = await login().then((result) => {
        return result;
      });
      // console.log(result.loggedIn);
      // setLoggedIn(result.loggedIn); // local status change
      dispatch(setLoginStatus(result.loggedIn)) // redux state
    }

    fetchLogin();
  }, [dispatch])

  /*useEffect(() => {
    let result = login();
    result.then((data) => {
      console.log(data.loggedIn);
      console.log(loggedIn)
      // dispatch(data.loggedIn);  // dispatch the component state change to redux state
      //setLoggedIn(data.loggedIn);
    }).catch((error) => { console.log(error) })


    //ERROR HERE
  }, []); */

  async function logout() {
    if (isLoggedIn) {
      dispatch(setLoginStatus(false));
    }
  }

  console.log(isLoggedIn)


  return (
    <>
      <div className="App">
        <h1 className='title' style={h1Styles}><strong>E - Market</strong></h1>
        {isLoggedIn /* loggedIn */ && <nav className="navbar">
          <ul className='container'>
            <li className='link'><Link style={linkStyles} to="/">Home</Link></li>
            <li className='link'><Link style={linkStyles} to="/products">Products</Link></li>
            <li className='link'><Link style={linkStyles} to="/carts">View cart</Link></li>
            <li className='link'><Link style={linkStyles} to="/logout" onClick={logout}>Logout</Link></li>
          </ul>
        </nav>
        }
        {!isLoggedIn /*!loggedIn*/ &&
          <nav className="navbar">
            <ul className='container'>
              <li className='link'><Link style={linkStyles} to="/">Home</Link></li>
              <li className='link'><Link style={linkStyles} to="/register">Register</Link></li>
              <li className='link'><Link style={linkStyles} to="/login">Log in</Link></li>
            </ul>
          </nav>
        }

        {isLoggedIn &&
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/login' element={<Navigate to={'/'} />} />
            <Route path='/register' element={<Navigate to={'/'} />} />
            <Route path='/carts' element={<Cart />} />
            <Route path='/carts/:id/checkout' element={<Checkout />} />
            <Route path='/logout' element={<Login />} />
            <Route path='/products/deckchair' element={<Deckchair />} />
            <Route path='/products/stool' element={<Stool />} />
            <Route path='/products/table' element={<Table />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        }
        {!isLoggedIn &&
          <Routes>
            <Route path='/' element={<Navigate to={'/login'} />} />
            <Route path='/products' element={<Navigate to={'/login'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/carts' element={<Navigate to={'/login'} />} />
            <Route path='/carts/:id/checkout' element={<Navigate to={'/login'} />} />
            {/*<Route path='/logout' element={<Login />} /> */}
            <Route path='/products/deckchair' element={<Navigate to={'/login'} />} />
            <Route path='/products/stool' element={<Navigate to={'/login'} />} />
            <Route path='/products/table' element={<Navigate to={'/login'} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        }
      </div>
    </>
  );
}

export default App;
