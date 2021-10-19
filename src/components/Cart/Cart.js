import { useContext, useEffect } from "react";
import MyContext from '../../MyContext';
import Products from '../Products/Products'
function Cart() {
    const [productsInCart, setProductsInCart] = useContext(MyContext);

    return (
        <div>
            <h2>My Cart</h2>
            <Products products={productsInCart}/>
        </div>
    )
}

export default Cart;