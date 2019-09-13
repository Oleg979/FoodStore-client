import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { BASE_URL } from '../config/fetchConfig'
import { Toastme } from 'toastmejs'

export default ({ setPage }) => {
    let [code, setCode] = useState("");

    const verify = () => {
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
        if (code.trim().length < 1) {
            mytoast.error("Код слишком короткий!");
            return;
        }

        fetch(`http://localhost:5000/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                verificationCode: code,
                email: localStorage.getItem("email"),
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                if (!data.success) {
                    mytoast.error(data.text);
                    return;
                }
                setPage("login");
                mytoast.success("Успешная верификация! Теперь вы можете войти.");
            })


    }

    return (
        <div className="verify">
            <h1>Подтвердите свою почту</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Код подтверждения</Form.Label>
                    <Form.Control type="number" placeholder="123456" onChange={e => setCode(e.target.value)} />
                    <Form.Text className="text-muted">
                        Код был отправлен на вашу почту {localStorage.getItem("email")}
                    </Form.Text>
                </Form.Group>


                <Button variant="primary" onClick={verify}>
                    Подтвердить
                </Button>
            </Form>
        </div>
    )

}
