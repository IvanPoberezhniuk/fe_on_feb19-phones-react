import React from "react";
import { getAll, getById } from "./api/phone";
import Basket from "./Basket";
import Filter from "./Filter";
import Catalog from "./Catalog";
import "./App.css";

class App extends React.Component {
  state = {
    phones: getAll(),
    selectedPhone: null,
    basketItems: []
  };

  addToCart = phone => {
    let isInBasket = this.state.basketItems.find(
      phoneInBasket => phoneInBasket.id === phone.id
    );

    if (isInBasket) {
      this.setState(prevState => ({
        basketItems: prevState.basketItems.map(phoneInBasket => {
          if (phoneInBasket.id === phone.id) {
            phoneInBasket.count++;
            return phoneInBasket;
          } else {
            return phoneInBasket;
          }
        })
      }));
    } else {
      this.setState(prevState => ({
        basketItems: [
          ...prevState.basketItems,
          { name: phone.name, id: phone.id, count: 1 }
        ]
      }));
    }
  };

  removeFromCart = phone => {
    let index = this.state.basketItems.findIndex(
      phoneInBasket => phoneInBasket.id === phone.id
    );

    if (phone.count > 1) {
      this.setState(prevState => ({
        basketItems: prevState.basketItems.map(phoneInBasket => {
          if (phoneInBasket.id === phone.id) {
            phoneInBasket.count--;
          }
          return phoneInBasket;
        })
      }));
    } else {
      this.setState(prevState => {
        prevState.basketItems.splice(index, 1);

        return {
          returnbasketItems: prevState.basketItems
        };
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Filter />
              <Basket
                basketItems={this.state.basketItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
            <div className="col-md-10">
              {this.state.selectedPhone ? (
                <Viewer
                  addToCart={this.addToCart}
                  phone={this.state.selectedPhone}
                  onBack={() => {
                    this.setState({
                      selectedPhone: null
                    });
                  }}
                />
              ) : (
                <Catalog
                  addToCart={this.addToCart}
                  phones={this.state.phones}
                  onPhoneSelected={phoneId => {
                    this.setState({
                      selectedPhone: getById(phoneId)
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Viewer extends React.Component {
  state = {
    id: 0
  };

  handleClick = elem => {
    this.setState({
      id: elem.target.id
    });
  };

  render() {
    return (
      <div>
        <img
          alt=""
          className="phone"
          src={this.props.phone.images[this.state.id]}
        />
        <button onClick={this.props.onBack}>Back</button>
        <button
          onClick={() =>
            this.props.addToCart(this.props.phone.name, this.props.phone.id)
          }
        >
          Add to basket
        </button>

        <h1>{this.props.phone.name}</h1>
        <p>{this.props.phone.description}</p>

        <ul className="phone-thumbs">
          {this.props.phone.images.map(imageUrl => (
            <li>
              <img
                id={this.props.phone.images.indexOf(imageUrl)}
                alt=""
                src={imageUrl}
                onClick={this.handleClick}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
