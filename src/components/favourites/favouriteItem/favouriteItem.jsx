import React from "react"
import style from "./favouriteItem.module.css"

const FavouriteItem = (props) => {

    //изменение состояния кнопки добавления в корзину
    const [productButtonChange, setProductButtonChange] = React.useState(false)
    //функция, которую вставим в onClick на кнопку, в нее дополнительно добавили функционал по добавлению товара в корзину
    const onClickProductButton = () => {
        let id = props.id
        let title = props.title
        let description = props.description
        let price = props.price
        let img = props.img
        props.onClickProductButton({id, title, description, price, img})

        setProductButtonChange(!productButtonChange)
    }
    //изменение состояния кнопки добавления в избранное, добавление товара в массив с избранным
    const [favouriteButtonChange, setFavouriteButtonChange] = React.useState(true)
    const onClickFavouriteButton = () => {
        props.onClickFavouriteButton(props.id)
    }


    return (
        <div className={style.productItem}>
            
            {/*<button className={favouriteButtonChange ? style.favouriteButtonChange : style.favouriteButton} onClick={onClickFavouriteButton}>{favouriteButtonChange ? 'В избранном' : 'Добавить в избранное'}</button>*/}
            <button className={style.favouriteButtonChange} onClick={onClickFavouriteButton}>Удалить из избранного</button>
            <img className={style.productImg} src={props.img} alt='Подушка'></img>
            <p className={style.productTitle}>{props.title}</p>
            <p className={style.productDescription}>{props.description}</p>
            <p className={style.price}>Цена</p>

            <div className={style.productPrice}>
                <span>{props.price} руб.</span>
                <button className={productButtonChange ? style.productButtonChange : style.productButton} onClick={onClickProductButton}>
                    <img src={productButtonChange ? '/img/check.png' : '/img/plus.png'} alt='' />
                </button>
            </div>
        </div>
    )
}

export default FavouriteItem