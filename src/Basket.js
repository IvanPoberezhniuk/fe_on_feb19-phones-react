import React from "react";

const randomstring = require("randomstring");

const Basket = props => {
  const { basketItems, removeFromCart } = props;

  const renderLi = phone => {
    return (
      <li key={randomstring.generate(5)}>
        {phone.name}: {phone.count + " "}
        <button onClick={() => removeFromCart(phone)}>x</button>
      </li>
    );
  };

  return (
    <section>
      <p>Shopping Cart</p>
      <ul>{basketItems.map(phone => renderLi(phone))}</ul>
    </section>
  );
};

export default Basket;
