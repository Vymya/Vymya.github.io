import style from "./cartItem.module.css"

const CartItem = (props) => {
    return(
        <div className={style.cart_item}>
            <img className={style.cart_img} src={props.img} alt="" />
            <h3 className={style.cart_title}>
                {props.title} подушка
                <br />
                <span className={style.cart_price}>{props.price} руб.</span>
            </h3>
            <button className={style.close_btn} onClick={()=>props.removeCartItem(props.id)}>X</button>
        </div>
    )
}

export default CartItem