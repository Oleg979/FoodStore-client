import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Toastme } from 'toastmejs'

export default ({ setProductModalShow, incNumOfItems, title, price, desc, image, id, wholeItem }) => {
    const addToCart = () => {
        const config = document.body.clientWidth <= 630 ? {
            timeout: 2000,
            positionY: "bottom",
            positionX: "center",
            distanceY: 20,
            distanceX: 20,
            zIndex: 100,
            theme: "default"
        } : {
                timeout: 2000,
                positionY: "bottom",
                positionX: "right",
                distanceY: 20,
                distanceX: 20,
                zIndex: 100,
                theme: "default"
            };
        const mytoast = new Toastme(config);
        incNumOfItems(price);
        mytoast.success("Добавлено в корзину!");
    }
    return (

        <Card>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {desc}
                </Card.Text>
                <div className="buttons">
                    <Button variant="info" onClick={() => setProductModalShow(true, wholeItem)}>Подробнее</Button>
                    <Button variant="success" onClick={addToCart}>Купить за {price}₽</Button>
                </div>
            </Card.Body>
        </Card>

    )
}
