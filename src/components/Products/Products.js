import Product from "../Product/Product";
import './Products.css';
function Products(props) {
    return (
        <div className="products">
            {props.products.map(product=>(
                <Product key={product.id} product={product}></Product>
            ))}
        </div>
    )
}

export default Products;