import { useContext } from "react";
import MyContext from '../../MyContext';
import Button from '@mui/material/Button';

import './Product.css';
function Product({image, title, price, id}) {
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
            <Button varient="viewport" onClick={()=>{
                setProductsInCart([...productsInCart, {id, title, price, image}])}}>+</Button>
        </div>
    )
}

export default Product;