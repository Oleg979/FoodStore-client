import React, { Component } from 'react';
import Navbar from './Navbar'
import LoginPage from './Login'
import RegisterPage from './Register'
import VerifyPage from './Verify'
import CardList from './CardList';
import Cart from './Cart'
import Main from './Main'

export default class App extends Component {
  state = {
    loggedIn: false,
    page: "login",
    cartPrice: 0,
    cart: {}
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token == null || token == undefined) this.setPage("login");
    else this.setPage("main")
    const price = localStorage.getItem("cartPrice");
    if (price != null && price != undefined) this.setState({ cartPrice: price })
    const db = JSON.parse(localStorage.getItem("cartItems"));
    if (db != null && db != undefined) this.setState({ cart: db })
  }


  setPage = page => {
    this.setState({ page });
  }

  incNumOfItems = (price) => {
    this.setState({ cartPrice: Number(this.state.cartPrice) + price }, () => {
      localStorage.setItem("cartPrice", (this.state.cartPrice))
    })
  }

  decNumOfItems = (price) => {
    this.setState({ cartPrice: Number(this.state.cartPrice) - price }, () => {
      localStorage.setItem("cartPrice", (this.state.cartPrice))
    })
  }

  addToCart = item => {
    const id = item._id;
    this.incNumOfItems(item.price)
    this.state.cart[id] ? this.setState({ cart: { ...this.state.cart, [id]: this.state.cart[id] + 1 } }, () => {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cart))
    }) : this.setState({ cart: { ...this.state.cart, [id]: 1 } }, () => {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cart))
    })
  }

  removeFromCart = item => {
    const id = item._id;
    this.decNumOfItems(item.price)
    if (this.state.cart[id] == 1) {
      const tmp = { ...this.state.cart };
      delete tmp[id];
      this.setState({ cart: tmp }, () => {
        localStorage.setItem("cartItems", JSON.stringify(this.state.cart))
      })
      return
    }

    this.setState({ cart: { ...this.state.cart, [id]: this.state.cart[id] - 1 } }, () => {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cart))
    });
  }

  clearCart = () => {
    this.setState({cart: {}, cartPrice: 0});
    localStorage.removeItem("cartItems")
    localStorage.removeItem("cartPrice")
  }

  logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    this.setPage("login");
  }

  setProductModalShow = bool => this.setState({ productModalShow: bool })

  render = () =>
    <div className="app">
      {this.state.page === "main" &&
        <>
          <Navbar logOut={this.logOut} cartPrice={this.state.cartPrice} setPage={this.setPage} />
          <CardList incNumOfItems={this.addToCart} />
          <footer className="page-footer font-small blue">

            <div className="footer-copyright text-center py-3">© 2019 Copyright:
        <a href="https://mdbootstrap.com/education/bootstrap/"> FoodStore.com</a>
            </div>

          </footer>
        </>
      }
      {this.state.page === "login" && <LoginPage setPage={this.setPage} />}
      {this.state.page === "register" && <RegisterPage setPage={this.setPage} />}
      {this.state.page === "verify" && <VerifyPage setPage={this.setPage} />}
      {this.state.page === "cart" && <>
        <Navbar logOut={this.logOut} cartPrice={this.state.cartPrice} setPage={this.setPage} />
        <Cart cartPrice={this.state.cartPrice} items={JSON.parse(localStorage.getItem("items"))} amounts={this.state.cart} add={this.addToCart} remove={this.removeFromCart} clearCart={this.clearCart}/>
       
      </>}
      {this.state.page === "title" && <>
        <Navbar logOut={this.logOut} cartPrice={this.state.cartPrice} setPage={this.setPage} />
        <Main/>
      </>}


    </div>

}

