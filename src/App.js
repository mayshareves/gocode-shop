import './App.css';

import React from "react"
// import Button from './Button';
import { useEffect, useState } from "react";

import MyContext from './MyContext';
//https://mui.com/getting-started/usage/

// https://gocode-shop-noam.herokuapp.com/

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import ProductsPage from './pages/Products'

function App() {




  const [productsInCart, setProductsInCart] = useState([]);


  return (
    <Router>
      <MyContext.Provider value={[productsInCart, setProductsInCart]}>
      <div className="App">
       <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
        <Switch>         
            <Route path="/products">
             <ProductsPage></ProductsPage>
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
        </div>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
