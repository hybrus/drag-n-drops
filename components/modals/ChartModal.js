import React, { useState } from 'react'
import { Modal, Button, Col, Form, Row } from 'react-bootstrap'
import { useLayoutContext, useModalsContext } from '../context';

export const ChartModal = () => {
    const { layouts, setLayouts } = useLayoutContext();
    const { modals, setModals } = useModalsContext();
    const [count, setCount] = useState(3)

    const onAction = (e) => {
        e.preventDefault()
        let graphData = [...new Array(count)].map((key, num) => {
            let item = {
                label: e.target.elements[`label[${num}]`].value,
                value: e.target.elements[`value[${num}]`].value
            }

            e.target.elements[`label[${num}]`].value = ""
            e.target.elements[`value[${num}]`].value = ""

            return item;
        })
        setCount(3)
        setLayouts([...layouts, { type: modals?.showChartInput, graphData: graphData, title: e.target.elements.title.value }])
        setModals({ ...modals, showChartInput: false })
    }


    return (
        <Modal show={!!modals?.showChartInput} onHide={() => setModals({ ...modals, showChartInput: false })}>
            <Modal.Header closeButton>
                <Modal.Title>{modals?.showChartInput} Input</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className='mb-1'>Title</Form.Label>
                        <Form.Control className='mb-2 mt-0' name="title" type="text" placeholder="input widget title . . ." required />
                    </Form.Group>
                    {[...new Array(count)].map((key, num) => {
                        return (
                            <Row key={num} className='border rounded my-2 py-2 border-scondary'>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className='mb-1'>Label {num + 1}</Form.Label>
                                        <Form.Control className='mb-2 mt-0' name={`label[${num}]`} type="text" placeholder="input label . . ." required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className='mb-1'>Value {num + 1}</Form.Label>
                                        <Form.Control className='mb-2 mt-0' name={`value[${num}]`} type="number" placeholder="input value . . ." required />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )
                    })}
                    <div className='w-100 text-end'>
                        <Button onClick={() => setCount(count + 1)} variant='outline-primary btn-sm me-2'><i className="fa-solid fa-plus"></i></Button>
                        <Button disabled={count <= 3} onClick={() => setCount(count - 1)} variant='outline-danger btn-sm'><i className="fa-solid fa-minus"></i></Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" type='submit'>
                        Submit
                    </Button>
                    <Button variant="outline-secondary" type="button" onClick={() => setModals({ ...modals, showChartInput: false })}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}