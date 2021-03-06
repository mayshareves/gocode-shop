import Product from "../Product/Product";
import './Products.css';
function Products(props) {
    return (
        <div className="products">
            {props.products.map(product=>(
                <Product key={product._id} image={product.image} title={product.title} price={product.price} id={product._id} amount={product.amount}></Product>
            ))}
        </div>
    )
}

export default Products;