import React, { useState, useEffect } from 'react'
import { Table, Alert, Button } from 'react-bootstrap'

export default ({ cartPrice, items, amounts, add, remove, clearCart }) => {


    return (
        <div style={{ padding: "5%" }}>
            {Object.keys(amounts).length == 0 ? <Alert variant="danger">Вы не добавили ни одного товара.</Alert> :
                <><Table striped bordered hover responsive small={document.body.clientWidth <= 630}>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Количество</th>
                            <th>Стоимость</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(amounts).map(item => {
                            const i = items.filter(i => i._id == item)[0];
                            return (
                                <tr>
                                    <td>{i.title}</td>
                                    <td><span>{amounts[item]} шт.</span> <div><Button variant={"success"} onClick={() => add(i)}>+1</Button><Button variant={"danger"} onClick={() => remove(i)}>-1</Button></div></td>
                                    <td>{i.price} * {amounts[item]} = {i.price * amounts[item]}₽</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
                </>}
            <Alert variant="primary">
                Общая сумма заказа: <h1>{cartPrice}₽</h1>
            </Alert>
            {Object.keys(amounts).length != 0 && <><Button variant={"success"} id="submit-order">Оформить заказ</Button> <Button variant={"danger"} id="submit-order" onClick={clearCart}>Очистить корзину</Button></>}
        </div>
    )
}
