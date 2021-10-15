import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import React from "react"
// import Button from './Button';
import { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displaySpinner, setDisplaySpinner] = useState(true);

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
    <div className="App">
     {/* <Button/> */}
      <Header categories={categories} onSelectCategory={categorySelected}/>
      <Products products={products}/>
      {displaySpinner && <div className="example">
        <span className="smooth spinner" />
      </div>}
    </div>
  );
}

export default App;
