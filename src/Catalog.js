import React from "react";

const Catalog = props => {
  const { addToCart, phones, onPhoneSelected } = props;

  return (
    <ul className="phones">
      {phones.map(phone => (
        <li className="thumbnail" key={phone.id}>
          <a
            href="#"
            className="thumb"
            onClick={event => event.preventDefault()}
            onClick={() => onPhoneSelected(phone.id + "cart")}
          >
            <img alt={phone.name} src={phone.imageUrl} />
          </a>
          <div className="phones__btn-buy-wrapper">
            <button
              href={event => event.preventDefault()}
              className="btn btn-success"
              onClick={() => addToCart(phone)}
            >
              Add
            </button>
          </div>

          <a
            href="event => event.preventDefault()"
            onClick={() => {
              onPhoneSelected(phone.id);
            }}
          >
            {phone.name}
          </a>

          <p>{phone.snippet}</p>
        </li>
      ))}
    </ul>
  );
};

export default Catalog;