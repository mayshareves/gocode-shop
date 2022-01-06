import { useParams } from "react-router"
import { useState, useEffect } from "react";
import Product from '../components/Product/Product';

function ProductPage() {
    const { id }= useParams()
    const [product, setProduct] = useState(null);
    let size = {maxHeight: '300px', maxWidth: '300px'}
    useEffect(() => {
        console.log(22, id)
      fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .then((res) => {
            setProduct(res);
            console.log(res)
        });
    }, [id]);
    return (
        <div style={size}>
            <Product image={product?.image} title={product?.title} price={product?.price} id={product?._id}></Product>
        </div>
    )
}

export default ProductPage;