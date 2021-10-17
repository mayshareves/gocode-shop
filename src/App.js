import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import React from "react"
// import Button from './Button';
import { useEffect, useState } from "react";

import MyContext from './MyContext';

function App() {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displaySpinner, setDisplaySpinner] = useState(true);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProducts(products);
        setAllProducts(products);
        let categories = products.map(p => p.category).filter((value, index, array) => array.indexOf(value) === index);
        setCategories(categories)
        setDisplaySpinner(false)
      });
  }, []);
  
  const categorySelected = (category) =>{
    if(category === '/') {
      setProducts(allProducts);
    } else {
      let filteredProducts = allProducts.filter((product) => product.category === category);
      setProducts(filteredProducts);
    }
  }

  return (
    <MyContext.Provider value={[productsInCart, setProductsInCart]}>
    <div className="App">
     {/* <Button/> */}
      <Header categories={categories} onSelectCategory={categorySelected}/>
     <Cart/>
     <hr/>
      <Products products={products}/>
      {displaySpinner && <div className="example">
        <span className="smooth spinner" />
      </div>}
    </div>
    </MyContext.Provider>
  );
}

export default App;
