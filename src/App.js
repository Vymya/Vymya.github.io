import React from 'react';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Cart from './components/cart/cart';
import Favourites from './components/favourites/favourites';
import Home from './components/Home';

//создаем и экспортируем переменную с контекстом, он нужен чтобы при наличии товара в корзине/избранном на главной странице отображались нужные стили кнопок без перезагрузки страницы, т.к. при изменении контекста перерисовываются все компоненты, которые к контексту подключены
export const AppContext = React.createContext({})

function App() {
  //state хранение товаров
  const [productsData, setProductsData] = React.useState([])
  //state состояние корзины
  const [cartState, setCartState] = React.useState(false)
  //state хранение товаров в корзине
  const [cartItems, setCartItems] = React.useState([])
  //state хранение товаров в избранном
  const [favouriteItems, setFavouriteItems] = React.useState([])
  //state для поиска
  const [search, setSearch] = React.useState('')
  //state для хранения состояния прогрузки товаров на главной
  const [loading, setLoading] = React.useState(true)

  //работа с испровизированной базой данных с товарами в формате json
  //используем надстройку в виде Хука useEffect чтобы запрос к серверу выполнялся лишь 1 раз при первой отрисовке страницы, иначе запросов будет много и это нагрузка на сервер, для того чтобы useEffect отработал 1 раз в конце ставим пустой массив []
  React.useEffect(() => {

    /*
      fetch('https://635581ea483f5d2df3b5c1c7.mockapi.io/products').then((data) => {
        return data.json()
      }).then((dataJson) => {
        setProductsData(dataJson)
      })
    */

      //отдельная функция для таблиц на сервере, чтобы сперва выполнялись запросы к серверу, а только после этого данные заносились в state на фронте
      async function axiosData() {
        //здесь учимся обращаться к базе не только через fetch, но и через axios
        const productsData = await axios.get('https://635581ea483f5d2df3b5c1c7.mockapi.io/products')
        
        //обращение к json с товарами из корзины пользователя
        //товары из корзины, которые лежат на сервере, теперь будут сохраняться в state и храниться в корзине после перезагрузки страницы
        const cartData = await axios.get('https://635581ea483f5d2df3b5c1c7.mockapi.io/cart')

        //обращение к json с товарами из избранного
        const favouritesData = await axios.get('https://635581ea483f5d2df3b5c1c7.mockapi.io/favourites')

        setProductsData(productsData.data)
        setCartItems(cartData.data)
        setFavouriteItems(favouritesData.data)

        //меняем состояние прогрузки товаров на false - значит товары загружены и можно менять заглушки на настоящие товары
        setLoading(false)
    }
    //в конце вызываем эту функцию
    axiosData()
  }, [])

  //функция удаления товара из корзины
  //логика фильтра - если в массиве с товарами есть id товара, который мы удаляем, то фильтр его не выведет
  const removeCartItem = (id) => {
    axios.delete(`https://635581ea483f5d2df3b5c1c7.mockapi.io/cart/${id}`)
    setCartItems((data) => data.filter(item => Number(item.id) !== Number(id)))
  }

  //функции проверки есть ли товар в корзине и избранном, будет использована для состояния стилей кнопок
  const isCartAdded = (id) => {
    return cartItems.some((item) => item.id === id)
  }
  const isFavouriteAdded = (id) => {
    return favouriteItems.some((item) => item.id === id)
  }

  
  return (
    //сюда в контекст передаем стейты и функции
    <AppContext.Provider value={{
      productsData, 
      cartItems, 
      favouriteItems, 
      setProductsData, 
      setCartItems, 
      setFavouriteItems, 
      isCartAdded, 
      isFavouriteAdded
    }}>
      <div className="App">
          {/* компонент корзины выводим через тернарный оператор, добавляем пропс closeCart на закрытие корзины для кнопки Х*/}
          {cartState ? <Cart 
            removeCartItem={removeCartItem} 
            cartItems={cartItems} 
            //пропс-функция для сложения стоимости каждого объекта в корзине, после запятой указываем изначальное значение - 0
            totalPrice={
              cartItems.reduce((allItems, item) => allItems + item.price, 0)
            } 
            closeCart={()=>setCartState(false)} 
            /> : null
          }
            {/* для кнопки Корзина в компоненте хедера пишем пропс с функцией для открытия корзины */}
          <Header 
            openCart={()=>setCartState(true)} 
            cartItems={cartItems}
          />
          <Routes>
            <Route path='/favourites' element={
              <Favourites/>
            }
            />
            <Route path='/' element={
              <Home 
                productsData={productsData} 
                cartItems={cartItems} 
                setCartItems={setCartItems} 
                favouriteItems={favouriteItems} 
                setFavouriteItems={setFavouriteItems} 
                search={search}
                setSearch={setSearch} 
                loading={loading}
              />
            }
            />
          </Routes>
          <Footer/>
      </div>
    </AppContext.Provider>
  );
}

export default App;