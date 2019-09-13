import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Toastme } from 'toastmejs'


export default ({ setPage }) => {
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");

    const logIn = () => {
        const config = {
            timeout: 5000,
            positionY: "bottom",
            positionX: "right",
            distanceY: 20,
            distanceX: 20,
            zIndex: 100,
            theme: "default"
        };
        const mytoast = new Toastme(config);
        if (email.trim().length < 10 || pass.trim().length < 5) {
            if (email.trim().length < 10) mytoast.error("Адрес электронной почты должен быть не менее 10 символов!");
            if (pass.trim().length < 5) mytoast.error("Пароль должен быть не менее 5 символов!")
            return;
        }

        fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password: pass,
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                if (!data.auth) {
                    mytoast.error(data.text);
                    return;
                }
                setPage("main");
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.name);
                mytoast.success("Успешная авторизация!");
            })


    }

    return (
        <div className="login">
            <h1>Авторизация</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control type="email" placeholder="example@gmail.com" onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        Ваш адрес электронной почты будет виден другим пользователям
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="123456" onChange={e => setPass(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={logIn}>
                    Войти
                </Button>
                <Button variant="secondary" onClick={() => setPage("register")}>
                    Создать аккаунт
                </Button>
            </Form>
        </div>
    )

}
