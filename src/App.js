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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProducts(products);
        setAllProducts(products);
        let categories = products.map(p => p.category).filter((value, index, array) => array.indexOf(value)===index);
        console.log(111, categories)
        setCategories(categories)
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
    </div>
  );
}

export default App;
