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
} from "react-router-dom";

import ProductsPage from './pages/Products'
import ProductPage from './pages/product';

function App() {




  const [productsInCart, setProductsInCart] = useState([]);


  return (
    <Router>
      <MyContext.Provider value={[productsInCart, setProductsInCart]}>
      <div className="App">
        <Switch>         
            <Route path="/products">
             <ProductsPage></ProductsPage>
            </Route>
            <Route path="/product/:id">
             <ProductPage></ProductPage>
            </Route>
            <Route path="/">
              <ProductsPage/>
            </Route>
        </Switch>
        </div>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
