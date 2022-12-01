import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useLayoutContext, useModalsContext } from '../context';

export const ImageModal = () => {
    const { layouts, setLayouts } = useLayoutContext();
    const { modals, setModals } = useModalsContext();
    const [text, setText] = useState("")

    const onAction = () => {
        setLayouts([...layouts, { type: "Image", data: text }])
        setText("")
        setModals({ ...modals, showImageInput: false })
    }

    const handleChange = (e) => {
        let file = e.target?.files[0];
        if (!file)
            return
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setText(reader.result);
        };
    }


    return (
        <Modal show={!!modals?.showImageInput} onHide={() => setModals({ ...modals, showImageInput: false })}>
            <Modal.Header closeButton>
                <Modal.Title>Image Input</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='w-100' style={{
                    backgroundImage: `url('${text}')`, height: '200px', backgroundSize: 'cover', backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}></div>
                <input type="file" accept="image/*" onChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onAction} disabled={!text}>
                    Submit
                </Button>
                <Button variant="outline-secondary" onClick={() => setModals({ ...modals, showImageInput: false })}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}