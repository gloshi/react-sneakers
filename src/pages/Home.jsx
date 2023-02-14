import Card from "../components/Card";
import React from "react";



function Home({
  cartItems,
  searchValue,
  items,
  onAddToFavorite,
  onAddToCart,
  setSearchValue,
  inputValue,
  isLoading
}) {

  

  const renderItems = () => {
    return (isLoading ? [...Array(10)] :items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  ))
      .map((item, index) => (
        <Card
          key={index}
          onClickFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          
          loading={isLoading}
          {...item}
        />
      ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex align-center">
          <img width={18} height={18} src="/img/search.svg" alt="search" />
          {searchValue && (
            <img
              className="clear cu-p"
              onClick={() => setSearchValue("")}
              src="/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <input
            onChange={inputValue}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="sneakers d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
