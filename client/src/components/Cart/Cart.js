import { useContext } from "react";
import MyContext from '../../MyContext';
import Products from '../Products/Products'
function Cart() {
    const [productsInCart] = useContext(MyContext);

    return (
        <div style={{maxWidth: "500px"}}>
            <Products products={productsInCart}/>
        </div>
    )
}

export default Cart;