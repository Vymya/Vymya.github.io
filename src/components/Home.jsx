import Banner from "./banner/banner"
import Products from "./products/products"

const Home = (props) => {
    return(
        <>
            <Banner/>
            <Products 
                productsData={props.productsData} 
                cartItems={props.cartItems} 
                setCartItems={props.setCartItems} 
                favouriteItems={props.favouriteItems} 
                setFavouriteItems={props.setFavouriteItems} 
                search={props.search} 
                setSearch={props.setSearch}
                loading={props.loading}
            />
        </>
    )
}

export default Home