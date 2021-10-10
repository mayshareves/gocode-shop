import './Product.css';
function Product(props) {
    return (
        <div className="product-card ">
            <div className="product-image">
                <img src={props.product.image} />
            </div>
            <div className="product-info">
                <h5>{props.product.title}</h5>
                <h6>{`${props.product.price}`}</h6>
            </div>
        </div>
    )
}

export default Product;