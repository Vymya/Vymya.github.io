import ProductItem from "./productItem/productItem"
import style from "./products.module.css"
import axios from "axios"

const Products = (props) => {

    const imgPillow = '/img/pillow.webp'
    //делаем функцию асинхронной async, чтобы указанная часть функции выполнялась после того, как дождется выполнения предыдущей, это нужно для правильно взаимодействия с сервером, конкретно здесь - с добавлением в корзину товара с правильным id
    const onClickProductButton = async (cartObj) => {
        try {
            //если товар с таким id уже есть в корзине, то произойдет его удаление, если такого id в корзине нет - то else он добавляется в корзину
            const findCartItem = props.cartItems.find((item) => item.myId === cartObj.myId)
            if (findCartItem) {
                axios.delete(`https://635581ea483f5d2df3b5c1c7.mockapi.io/cart/${findCartItem.id}`)
                props.setCartItems(data => data.filter(item => item.myId !== cartObj.myId))
            } else {
                //также добавляем товары корзины в массив на сервер
                const {data} = await axios.post('https://635581ea483f5d2df3b5c1c7.mockapi.io/cart', cartObj)
                    //'const {data} = await' значит, что эта строка выполнится первой в асинхронной функции, а только затем будет выполнен код ниже
                //выводим все товары из массива и к ним добавляем новый объект
                props.setCartItems([...props.cartItems, data])
                    //'data' - это как раз товар с нужным id, который сперва записывается в массив на сервере, а затем уходит на фронтенд с таким же id
            }
        }
        catch {
            alert('Не удалось добавить товар в Корзину')
        }
    }
    const onClickFavouriteButton = async (favouriteObj) => {
        const findFafouriteItem = props.favouriteItems.find(item => item.myId === favouriteObj.myId)
        try {
            if (findFafouriteItem) {
                axios.delete(`https://635581ea483f5d2df3b5c1c7.mockapi.io/favourites/${findFafouriteItem.id}`)
                props.setFavouriteItems(data => data.filter(item => item.myId !== favouriteObj.myId))
            } else {
                const {data} = await axios.post('https://635581ea483f5d2df3b5c1c7.mockapi.io/favourites', favouriteObj)
                props.setFavouriteItems([...props.favouriteItems, data])
            }
        }
        catch {
            alert('Не удалось добавить товар в Избранное')
        }
    }
    const search = (inputValue) => {
        props.setSearch(inputValue.target.value)
    }

    //создаем переменную с функцией вывода карточек товара
    const renderProductItem = () => {
        //создаем отдельную переменную для вывода по значению из поля поиска товаров
        const filterItems = props.productsData.filter((item) => item.title.toLowerCase().includes(props.search.toLowerCase()))
        //здесь мы через тернарную функцию при прогрузке товаров создаем пустой массив, чтобы заглушки вывелись 3 раза, можно указать любое значение, если список товаров больше
        return(props.loading ? [...Array(3)] : filterItems).map ((obj, index) => {
                return(
                    <ProductItem 
                        //эта конструкция заменит все пропсы obj., закомментированные ниже, мы передаем весь объект целиком, вместо того чтобы вытаскивать из него отдельные поля
                        //конструкция нужна потому, что программа не работает из-за ошибок, которые возникают из-за массива с 3 undefined элементами, браузер не понимает как к этим объектам массива применить эти пропсы
                        {...obj}
                            /*
                            key={obj.id} 
                            id={obj.id} 
                                создаем пропс myId, это дополнительный id, который не будет динамическим, чтобы удаление из корзины работало без ошибок по этому id
                            myId={obj.myId} 
                            title={obj.title} 
                            description={obj.description} 
                            price={obj.price}
                            */
                        //при отсутствии key в консоли браузера ошибка - у каждого элемента должен быть key, его можно создать отдельно, указав рядом с obj еще один идентификатор - index (порядковый номер элемента массива)
                        key={index} 
                        img={imgPillow} 
                        //'loading' - пропс, который отвечает за состояние прогрузки товаров, пока загружаются стоят заглушки
                        loading={props.loading} 
                        //'isAdded' - пропс, который отвечает за состояние кнопок, если товар добавлен в корзину/избранное, то кнопка даже после перезагрузки в нужном стиле. Функция выдает true/false
                        //isCartAdded={props.cartItems.some((item) => item.myId === obj.myId)} 
                        //isFavouriteAdded={props.favouriteItems.some((item) => item.myId === obj.myId)} 
                        onClickProductButton={
                            (cartObj) => {
                                onClickProductButton(cartObj)
                            }
                        }
                        onClickFavouriteButton={
                            (favouriteObj) => {
                                onClickFavouriteButton(favouriteObj)
                            }
                        }
                    />
                )
            })
    }

    return (
        <div className={style.productSection}>
            <div className={style.search}>
                <h2>{props.search ? 'Поиск подушек: '+props.search : 'Все подушки'}</h2>
                <div className={style.searchBlock}>
                    <img src="/img/search.png" alt="Поиск товаров" />
                    <input onChange={search} placeholder="Поиск по товарам" />
                </div>
            </div>
            <div className={style.products}>
                {
                    renderProductItem()
                }
            </div>
        </div>
    )
}

export default Products