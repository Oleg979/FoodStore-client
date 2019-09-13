import React from 'react';
import { Navbar, NavDropdown, Form, Button, Nav } from 'react-bootstrap'

export default ({ logOut, cartPrice }) => {
    return (
        <>
            <Navbar bg="light" expand="lg" className="navbar-fixed">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={require("../assets/burger.png")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        style={{ marginRight: "10px" }}
                    />
                    {'FoodStore'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Главная</Nav.Link>
                        <Nav.Link href="#link">Каталог</Nav.Link>

                    </Nav>
                    <Form inline>
                        <Button variant="success">Корзина {cartPrice == 0 ? "(пусто)" : `(${cartPrice}₽)`}</Button>
                        <Button variant="outline-success" onClick={() => {
                            fetch(`http://localhost:5000/item/`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-access-token": localStorage.getItem("token")
                                },
                                body: JSON.stringify({
                                    "title": "Роллы Веган",
                                    "type": "Роллы",
                                    "desc": "Роллы специально для вегетарианцев: болгарский перец, чука, огурец, укроп, лист салата, ореховый соус и ничего более!",
                                    "image": "https://сушивесла.рф/pics/583e8fe4e4b0cb96763a1375?width=357https://xn--80adjkr6adm9b.xn--p1ai/pics/583e92bae4b0cb96763a13ca?width=357",
                                    "price": 309,
                                })
                            }).then(console.log)
                        }}>Мой профиль</Button>
                        <Button variant="outline-danger" onClick={() => logOut()}>Выход из профиля</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Navbar bg="light" expand="lg" className="not-fixed">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={require("../assets/burger.png")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        style={{ marginRight: "10px" }}
                    />
                    {'FoodStore'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-naadasdv" />
                <Navbar.Collapse id="basic-navbar-naasdsadv">

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

