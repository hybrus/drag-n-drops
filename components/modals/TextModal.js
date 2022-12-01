import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useLayoutContext, useModalsContext } from '../context';

export const TextModal = () => {
    const { layouts, setLayouts } = useLayoutContext();
    const { modals, setModals } = useModalsContext();
    const [text, setText] = useState("")

    const onAction = () => {
        setLayouts([...layouts, { type: "TextBox", data: text }])
        setText("")
        setModals({ ...modals, showTextBoxInput: false })
    }


    return (
        <Modal show={!!modals?.showTextBoxInput} onHide={() => setModals({ ...modals, showTextBoxInput: false })}>
            <Modal.Header closeButton>
                <Modal.Title>TextBox Input</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control as="textarea" rows={5} value={text} onChange={e => { setText(e.currentTarget.value) }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onAction} disabled={!text}>
                    Submit
                </Button>
                <Button variant="outline-secondary" onClick={() => setModals({ ...modals, showTextBoxInput: false })}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}