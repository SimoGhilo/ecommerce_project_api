import './App.css';
import Login from './components/login';
import { Route, Routes, Link } from "react-router-dom"
import Cart from './components/cart';
import Register from './components/register';
import NotFound from './components/notFound';
import Products from './components/products';
import Dashboard from './components/dashboard';
import Checkout from './components/checkout';
import Stool from './components/products/stool'
import Table from './components/products/table'
import Deckchair from './components/products/deckchair'

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
  return (
    <div className="App">
      <h1 className='title' style={h1Styles}><strong>E - Market</strong></h1>
      <nav className="navbar">
        <ul className='container'>
          <li className='link'><Link style={linkStyles} to="/">Home</Link></li>
          <li className='link'><Link style={linkStyles} to="/register">Register</Link></li>
          <li className='link'><Link style={linkStyles} to="/login">Log in</Link></li>
          <li className='link'><Link style={linkStyles} to="/products">Products</Link></li>
          <li className='link'><Link style={linkStyles} to="/carts">View cart</Link></li>
          {/* <li><Link to="/logout">Logout</Link></li> */}
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/carts' element={<Cart />} />
        <Route path='/carts/:id/checkout' element={<Checkout />} />
        <Route path='/logout' element={<Login />} />
        <Route path='/products/deckchair' element={<Deckchair />} />
        <Route path='/products/stool' element={<Stool />} />
        <Route path='/products/table' element={<Table />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
