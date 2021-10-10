import Header from './Header/Header'
import Products from './Products/Products'
function Main(props) {
    return (
    <div>
        <Header />
        <Products products={props.products}/>
      </div>
    )
}

export default Main;