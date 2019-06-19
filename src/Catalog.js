import React from "react";

const Catalog = props => {
  return (
    <ul className="phones">
      {props.phones.map(phone => (
        <li className="thumbnail" key={phone.id}>
          <a
            href={"#"}
            className="thumb"
            onClick={() => {
              props.onPhoneSelected(phone.id);
            }}
          >
            <img alt={phone.name} src={phone.imageUrl} />
          </a>
          <div className="phones__btn-buy-wrapper">
            <a
              href={"#"}
              className="btn btn-success"
              onClick={() => props.addToCart(phone.name)}
            >
              Add
            </a>
          </div>

          <a
            href='#'
            onClick={() => {
              props.onPhoneSelected(phone.id);
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
