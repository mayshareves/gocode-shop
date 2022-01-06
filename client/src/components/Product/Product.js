import { useContext } from "react";
import MyContext from '../../MyContext';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import './Product.css';
import { Link } from 'react-router-dom';
import { CardActions, CardActionArea } from '@mui/material';

function Product({image, title, price, id, amount}) {
    const [productsInCart, setProductsInCart] = useContext(MyContext);
    const getAmount = () => {
        let findProduct = productsInCart.find((product) => product._id === id)
        if(findProduct) {
            return findProduct.amount;}
        return ''
    }

    const addCount = () => {
        let newProductsList = [];
        // If exist
        let findIndex = productsInCart.findIndex((product) => product._id === id)
        if (findIndex > -1) { //exists
            newProductsList = productsInCart.map((product) => {
                if (product._id === id) {
                    product.amount++;
                }
                return product;
            })
        } else { // not exists
            newProductsList = [...productsInCart, { _id: id, title, price, image, amount: 1 }]
        }
        console.log(111, newProductsList)
        setProductsInCart(newProductsList)
    }

    const lowerCount = () => {
        let newProductsList = [];
        // If exist
        let findIndex = productsInCart.findIndex((product) => product._id === id)
        let isNeedDelete = false;
        if (findIndex > -1) { //exists
            newProductsList = productsInCart.map((product) => {
                if (product._id === id) {
                    if (product.amount > 1) { product.amount--; }
                    else {
                        // delete from list
                        isNeedDelete = true;
                    }
                }
                return product;
            })
            if (isNeedDelete) {
                newProductsList = productsInCart.filter((product) => product.id !== id)
            }
        } else { // not exists
            newProductsList = [...productsInCart]
        }
        setProductsInCart(newProductsList)
    }

    return (
        <div className="product-card ">
        <Card sx={{ width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Link to={`/product/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={image}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <div class="price">{price} $</div>
          </CardContent>
        </CardActionArea>
        </Link>
        <CardActions>
                 <Button varient="outlined" onClick={()=>addCount()}>+</Button>
                <span>{getAmount()}</span>
                <Button varient="contained" onClick={()=>lowerCount()}>-</Button>
        </CardActions>
      </Card>
      </div>
    )
}

export default Product;