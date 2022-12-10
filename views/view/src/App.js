import './App.css';
import Login from './components/login';
import { Route, Routes } from "react-router-dom"
import Cart from './components/cart';
import Register from './components/register';
import NotFound from './components/notFound';
import Products from './components/products';
import Dashboard from './components/dashboard';
import Checkout from './components/checkout';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Log in</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/carts/:id' element={<Cart />} />
        <Route path='/carts/:id/checkout' element={<Checkout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
