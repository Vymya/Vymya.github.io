import style from "./header.module.css"
import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        <header>
            <Link to='/'>
                <h1 className={style.logo}>ПОДУШКИ</h1>
            </Link>
            <nav>
                <Link to='/favourites'>
                    <a className={style.navItem}>Избранное</a>
                </Link>
                <div className={style.cart}>
                    <a className={style.navItem} onClick={props.openCart}>Корзина</a>
                    <span className={style.itemCount}>{props.cartItems.length}</span>
                </div>
            </nav>
        </header>
    )
}

export default Header