import React, { Component } from 'react';
import Navbar from './Navbar'
import LoginPage from './Login'
import RegisterPage from './Register'
import VerifyPage from './Verify'
import CardList from './CardList';

export default class App extends Component {
  state = {
    loggedIn: false,
    page: "login",
    cartPrice: 0
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token == null || token == undefined) this.setPage("login");
    else this.setPage("main")
  }


  setPage = page => {
    this.setState({ page });
  }

  incNumOfItems = (price) => this.setState({ cartPrice: this.state.cartPrice + price })

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
          <Navbar logOut={this.logOut} cartPrice={this.state.cartPrice} />
          <CardList incNumOfItems={this.incNumOfItems} />
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

    </div>

}

