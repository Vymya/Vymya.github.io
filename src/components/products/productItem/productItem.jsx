import React from "react"
import style from "./productItem.module.css"
import ContentLoader from "react-content-loader"
import { AppContext } from "../../../App"

const ProductItem = (props) => {

    const context = React.useContext(AppContext)

    //изменение состояния кнопки добавления в корзину
    //удалено, т.к. состояние кнопки теперь отслеживается через context
    //const [productButtonChange, setProductButtonChange] = React.useState(props.isCartAdded)

    //функция, которую вставим в onClick на кнопку, в нее дополнительно добавили функционал по добавлению товара в корзину
    const onClickProductButton = () => {
        let id = props.id
        let myId = props.myId
        let title = props.title
        let description = props.description
        let price = props.price
        let img = props.img
        props.onClickProductButton({id, myId, title, description, price, img})

        //setProductButtonChange(!productButtonChange)
    }
    //изменение состояния кнопки добавления в избранное, добавление товара в массив с избранным
    //const [favouriteButtonChange, setFavouriteButtonChange] = React.useState(props.isFavouriteAdded)
    const onClickFavouriteButton = () => {
        let id = props.id
        let myId = props.myId
        let title = props.title
        let description = props.description
        let price = props.price
        let img = props.img
        props.onClickFavouriteButton({id, myId, title, description, price, img})
        
        //setFavouriteButtonChange(!favouriteButtonChange)
    }


    return (
        <div className={style.productItem}>
            {/* через тернарный оператор реализуем 2 состояния прогрузки товаров, в trut заглушки, в falsе товары */}
            {
                props.loading ? 
                    <ContentLoader 
                        speed={2}
                        width={465}
                        height={407}
                        viewBox="0 0 465 407"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        {...props}
                    >
                    <rect x="0" y="67" rx="2" ry="2" width="458" height="213" /> 
                    <rect x="0" y="15" rx="2" ry="2" width="206" height="26" /> 
                    <rect x="0" y="298" rx="2" ry="2" width="159" height="26" /> 
                    <rect x="0" y="324" rx="2" ry="2" width="255" height="26" /> 
                    <rect x="0" y="375" rx="2" ry="2" width="154" height="28" /> 
                    <rect x="411" y="361" rx="2" ry="2" width="40" height="40" />
                    </ContentLoader> : 
                    <>
                        <button className={context.isFavouriteAdded(props.myId) ? style.favouriteButtonChange : style.favouriteButton} onClick={onClickFavouriteButton}>{context.isFavouriteAdded(props.myId) ? 'Удалить из избранного' : 'Добавить в избранное'}</button>
                        <img className={style.productImg} src={props.img} alt='Подушка'></img>
                        <p className={style.productTitle}>{props.title}</p>
                        <p className={style.productDescription}>{props.description}</p>
                        <p className={style.price}>Цена</p>
            
                        <div className={style.productPrice}>
                            <span>{props.price} руб.</span>
                            <button className={context.isCartAdded(props.myId) ? style.productButtonChange : style.productButton} onClick={onClickProductButton}>
                                <img src={context.isCartAdded(props.myId) ? '/img/check.png' : '/img/plus.png'} alt='' />
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default ProductItem