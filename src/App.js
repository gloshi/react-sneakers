import React, { useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import AppContext from '../src/components/context';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [favorite, setFavorite] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResp = await axios.get(
        "https://63e4f4bb4474903105f5cb0d.mockapi.io/cart"
      );
      const favoritesResp = await axios.get(
        "https://63e524c58e1ed4ccf6eecdae.mockapi.io/favorite"
      );
      const itemsResp = await axios.get(
        "https://63e4f4bb4474903105f5cb0d.mockapi.io/items"
      );

      setIsLoading(false);
      setItems(itemsResp.data);
      setCartItems(cartResp.data);
      setFavorite(favoritesResp.data);
    }
    fetchData();
  }, []);

  //https://63e4f4bb4474903105f5cb0d.mockapi.io/cart
  // const onAddToCart = (obj) => {
  //   setCartItems((prev) => [...prev, obj]);
  //   axios.post("https://63e4f4bb4474903105f5cb0d.mockapi.io/cart", obj);
  // };
  // const onAddToCart = async (obj) => {
  //   console.log(obj)
  //   try {
  //     if (cartItems.find((favObj) => favObj.id === obj.id)) {
  //       axios.delete(`https://63e4f4bb4474903105f5cb0d.mockapi.io/cart/${obj.id}`);
  //     } else {
  //       const { data } = await axios.post('https://63e4f4bb4474903105f5cb0d.mockapi.io/cart', obj);
  //       setCartItems((prev) => [...prev, data]);
  //     }
  //   } catch (error) {
  //     alert('Не удалось добавить в фавориты');
  //   }
  //   console.log(obj)
  // };

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://63e4f4bb4474903105f5cb0d.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
      axios.post("https://63e4f4bb4474903105f5cb0d.mockapi.io/cart", obj);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://63e524c58e1ed4ccf6eecdae.mockapi.io/favorite/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://63e524c58e1ed4ccf6eecdae.mockapi.io/favorite/",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const inputValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63e4f4bb4474903105f5cb0d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items,cartItems, favorite,isItemAdded,onAddToFavorite,setCartOpened,setCartItems}}>
      <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          searchValue={searchValue}
          items={items}
          cartItems={cartItems}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          setSearchValue={setSearchValue}
          inputValue={inputValue}
          isLoading={isLoading}
        />
      </Route>
      <Route path="/favorites" exact>
        <Favorites items={favorite}  />
      </Route>
    </div>
    </AppContext.Provider>
  );
}

export default App;
