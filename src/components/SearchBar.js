import React, { useState } from 'react'
import { Accordion, Card, Button, Form, Row, Col } from 'react-bootstrap'

export default ({ search, noSearch }) => {
    let [name, setName] = useState("");
    let [price, setPrice] = useState(99);
    let [type, setType] = useState("");
    let [onlyComments, setOnlyComments] = useState(false)
    return (
        <div>
            <Accordion>

                <Card.Header>
                    <Accordion.Toggle as={Button} variant="info" eventKey="0">
                        Найти еду по вкусу
    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail" >
                                <Form.Label column sm={2}>
                                    Название блюда
</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Бургер с курицей" onChange={e => setName(e.target.value)} value={name}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Максимальная цена - <span id="max">{price}₽</span>
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control id = "pr" type="range" min="49" max="599" defaultValue={price} onChange={e => document.getElementById("max").innerText = e.target.value + "₽"}/>
                                </Col>
                            </Form.Group>
                            <fieldset>
                                <Form.Group as={Row}>
                                    <Form.Label as="legend" column sm={2}>
                                        Категория блюда
</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            checked={type == "Бургеры"}
                                            type="radio"
                                            label="Бургеры"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            onClick={() => setType("Бургеры")}
                                        />
                                        <Form.Check
                                            checked={type == "Роллы"}
                                            type="radio"
                                            label="Роллы"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            onClick={() => setType("Роллы")}
                                        />
                                        <Form.Check
                                            checked={type == "Напитки"}
                                            type="radio"
                                            label="Напитки"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios3"
                                            onClick={() => setType("Напитки")}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row} controlId="formHorizontalCheck" >
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Form.Check label="Только с отзывами" onChange={e => setOnlyComments(e.target.value)} checked={onlyComments}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} onClick={() => {
                                search({ name: name.trim(), price: Number(document.getElementById("max").innerHTML.split("₽")[0]), type, onlyComments })
                            }}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button>Искать</Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} onClick={() => {
                                setType(""); setName(""); setPrice(99); document.getElementById("pr").value = 99; setOnlyComments(false); document.getElementById("max").innerHTML = "99₽";
                                noSearch();
                            }}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button>Сбросить</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>

            </Accordion>
        </div>
    )
}
