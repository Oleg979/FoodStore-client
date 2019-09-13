import React, { useEffect, useState } from 'react'
import { Modal, Alert, Col, Button, Form, Row } from 'react-bootstrap'

export default ({ show, setProductModalShow, item }) => {
    let { title, image, price, rate, desc, type, numOfBuyers } = item;
    let [comments, setComments] = useState([])
    useEffect(() => {
        if (item == {}) return;
        fetch(`http://localhost:5000/comment/${item._id}`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(data => data.json())
            .then(comments => {
                setComments(comments);
                console.log(comments)
            })
    }, [item])


    const send = () => {
        const date = new Date();
        const com = document.getElementById("exampleFormControlTextarea1").value;
        document.getElementById("exampleFormControlTextarea1").value = "";
        setComments([...comments, {
            text: com,
            userName: localStorage.getItem("name"),
            creationDate: date.toLocaleDateString() + " " + date.toLocaleTimeString()
        }])
        fetch(`http://localhost:5000/comment/`, {
            method: "POST",
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: item._id,
                text: com,
                creationDate: date.toLocaleDateString() + " " + date.toLocaleTimeString()
            })
        })
            .then(data => data.json())
            .then(comments => {
                console.log(comments)
            })
    }
    return (
        <Modal
            dialogClassName="modal-90w"
            show={show}
            onHide={() => setProductModalShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Подробнее о товаре {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="container">

                    <h1 class="my-4">{title}
                    </h1>
                    <Alert variant="primary">
                        Товар относится к категории "{type}"
  </Alert>

                    <div class="row">

                        <div class="col-md-8">
                            <img class="img-fluid" src={image} alt="" />
                        </div>

                        <div class="col-md-4">
                            <h3 class="my-3">Описание товара</h3>
                            <p>{desc}</p>
                            <Alert variant="success">
                                Данный товар покупали <h1>{numOfBuyers} раз</h1>
                            </Alert>
                            <Alert variant="warning">
                                Средняя оценка покупателей: <h1>{rate} из 5</h1>
                            </Alert>
                            <Alert variant="error">
                                <Form.Control id="rate" type="range" min="1" max="5" defaultValue="4" onChange={e => document.getElementById("sendrate").innerText = "Оценить на " + e.target.value} />
                            </Alert>
                            <Button className="send" id="sendrate">Оценить на 4</Button>

                        </div>

                    </div>

                    <h3 class="my-4">Оставить комментарий</h3>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>

                    <Button className="send" onClick={send}>Отправить</Button>


                </div>
                <div class="container">
                    <div class="comments">
                        <h3 class="title-comments">Комментарии ({comments.length})</h3>
                        <ul class="media-list">
                            {comments.map(comment => (
                                <li class="media" key={comment._id}>
                                    <div class="media-body">
                                        <div class="media-heading">
                                            <div class="author">{comment.userName}</div>
                                            <div class="metadata">
                                                <span class="date">{comment.creationDate}</span>
                                            </div>
                                        </div>
                                        <div class="media-text text-justify">{comment.text}</div>

                                        <hr />
                                    </div>
                                </li>
                            ))}


                        </ul>
                    </div>
                </div>

            </Modal.Body>
        </Modal>

    );
}