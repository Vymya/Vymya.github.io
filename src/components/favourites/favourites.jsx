import React from "react";
import axios from "axios";
import style from "./favourites.module.css";
import FavouriteItem from "./favouriteItem/favouriteItem";
import { AppContext } from "../../App";

const Favourites = (props) => {

    const context = React.useContext(AppContext)
    const imgPillow = '/img/pillow.webp'

    const onClickProductButton = (cartObj) => {
        //выводим все товары из массива и к ним добавляем новый объект
        context.setCartItems([...context.cartItems, cartObj])
        //также добавляем товары корзины в массив на сервер
        axios.post('https://635581ea483f5d2df3b5c1c7.mockapi.io/cart', cartObj)
    }
    const removeFavouriteButton = (id) => {
        axios.delete(`https://635581ea483f5d2df3b5c1c7.mockapi.io/favourites/${id}`)
        context.setFavouriteItems((data) => data.filter(item => Number(item.id) !== Number(id)))
    }

    return (
        <div className={style.productSection}>
            <div className={style.search}>
                <h2>Избранные товары</h2>
            </div>
            <div className={style.products}>
                {
                    context.favouriteItems.map(obj => {
                        return(
                            <FavouriteItem
                                key={obj.id} 
                                id={obj.id} 
                                title={obj.title} 
                                description={obj.description} 
                                price={obj.price} 
                                img={imgPillow} 
                                onClickProductButton={
                                    (cartObj) => {
                                        onClickProductButton(cartObj)
                                    }
                                }
                                onClickFavouriteButton={
                                    (id) => {
                                        removeFavouriteButton(id)
                                        alert('Товар удален из избранного: ' + obj.title + ' подушка')
                                    }
                                }
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Favourites