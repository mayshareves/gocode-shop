import { useContext } from "react";
import MyContext from '../../MyContext';
import Button from '@mui/material/Button';

import './Product.css';
function Product({image, title, price, id, amount}) {
    const [productsInCart, setProductsInCart] = useContext(MyContext);

    return (
        <div className="product-card ">
            <div className="product-image">
                <img alt="" src={image} />
            </div>
            <div className="product-info">
                <h5>{title}</h5>
                <h6>{`$ ${price}`}</h6>
            </div>
            <div>
                <Button varient="outlined" onClick={()=>{
                    let newProductsList = [];
                    // If exist
                    let findIndex = productsInCart.findIndex((product)=> product.id === id)
                    if(findIndex > -1){ //exists
                        newProductsList = productsInCart.map((product) =>{
                            if(product.id === id) {
                                    product.amount++;
                            }
                            return product;
                        })
                    } else { // not exists
                        newProductsList = [...productsInCart, {id, title, price, image, amount: 1}]
                    }
                    console.log(111, newProductsList)
                    setProductsInCart(newProductsList)}}>+</Button>
                <span>{amount}</span>
                {amount && <Button varient="contained" onClick={()=>{
                    let newProductsList = [];
                    // If exist
                    let findIndex = productsInCart.findIndex((product)=> product.id === id)
                    let isNeedDelete = false;
                    if(findIndex > -1){ //exists
                        newProductsList = productsInCart.map((product) =>{
                            if(product.id === id) {
                                if(product.amount >1)
                                    {product.amount--;}
                                    else{
                                        // delete from list
                                        isNeedDelete = true;
                                    }
                            }
                            return product;
                        })
                        if(isNeedDelete){
                            newProductsList = productsInCart.filter((product) => product.id !==id)
                        }
                    } else { // not exists
                        newProductsList = [...productsInCart]
                        //newProductsList = [...productsInCart, {id, title, price, image, amount: 1}]
                    }
                    setProductsInCart(newProductsList)}}>-</Button>}
            </div>
        </div>
    )
}

export default Product;