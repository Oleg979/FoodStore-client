import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Toastme } from 'toastmejs'
import config from '../config/fetchConfig'

export default ({ setPage }) => {
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");
    let [name, setName] = useState("");
    let [repeatPass, setRepeatPass] = useState("");

    const register = () => {
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
        if (email.trim().length < 10 || pass.trim().length < 5 || name.trim().length < 3 || pass !== repeatPass) {
            if (email.trim().length < 10) mytoast.error("Адрес электронной почты должен быть не менее 10 символов!");
            if (pass.trim().length < 5) mytoast.error("Пароль должен быть не менее 5 символов!")
            if (name.trim().length < 3) mytoast.error("Имя должно быть не менее 3 символов!")
            if (pass !== repeatPass) mytoast.error("Пароли не совпадают!")
            return;
        }

        fetch(`http://localhost:5000/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password: pass,
                name
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                if (!data.auth) {
                    mytoast.error(data.text);
                    return;
                }
                localStorage.setItem("email", email)
                setPage("verify");
                mytoast.success("Успешная регистрация! Теперь введите код верификации, отправленный на почту " + email);
            })



    }

    return (
        <div className="register">
            <h1>Регистрация</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control type="email" placeholder="example@gmail.com" onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        Ваш адрес электронной почты будет виден другим пользователям
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Как вас зовут?</Form.Label>
                    <Form.Control type="email" placeholder="Иван Иванов" onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="123456" onChange={e => setPass(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control type="password" placeholder="123456" onChange={e => setRepeatPass(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={register}>
                    Зарегистрироваться
                    </Button>
                <Button variant="secondary" onClick={() => setPage("login")}>
                    У меня уже есть аккаунт
                </Button>
            </Form>
        </div>
    )

}
