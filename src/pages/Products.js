import Header from '../components/Header/Header';
import Products from '../components/Products/Products';
import Cart from '../components/Cart/Cart';
import { useState, useEffect } from "react";

function ProductsPage(){
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [displaySpinner, setDisplaySpinner] = useState(true);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [productsFilteredPrice, setProductsFilteredPrice] = useState([]);
  


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
          setCategory(null)
        } else {
          let filteredProducts = allProducts.filter((product) => product.category === category);
          setProducts(filteredProducts);
          setCategory(category)
        }
      }
    
      const filterByPrice = (price) => {
          let filteredProducts = allProducts.filter((product) => product.price >= price[0] && product.price <= price[1]);
          setProducts(filteredProducts);
      }

    return  (
        <div>
             <Header categories={categories} onSelectCategory={categorySelected} onFilterPrice={filterByPrice} />
              <Cart />
              <hr />
              <Products products={products} />
              {displaySpinner && <div className="example">
                <span className="smooth spinner" />
              </div>}
        </div>
    )
}

export default ProductsPage;