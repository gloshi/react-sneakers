import React from "react";
import Info from "./Info";
import AppContext from "./context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onRemove, onCloseCart, items = [] }) {
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { cartItems, setCartItems } = React.useContext(AppContext);

 //https://63e524c58e1ed4ccf6eecdae.mockapi.io/orders
 //https://63e4f4bb4474903105f5cb0d.mockapi.io/cart

 const onClickOrder = async () => {
  try {
    setIsLoading(true);
    const { data } = await axios.post('https://63e524c58e1ed4ccf6eecdae.mockapi.io/orders', {
      items: cartItems,
    });
    setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete('https://63e4f4bb4474903105f5cb0d.mockapi.io/cart' + item.id);
      await delay(1000);
    }
  } catch (error) {
    alert('Ошибка при создании заказа :(');
  }
  setIsLoading(false);
};

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина{" "}
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
            onClick={onCloseCart}
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    disabled={isLoading}
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className="greenButton" onClick={onClickOrder}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />{" "}
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
