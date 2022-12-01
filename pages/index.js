import { useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap"
import { BarChart, LineChart } from "../components/charts";
import { useLayoutContext, useModalsContext } from "../components/context";
import { TextModal, ImageModal, ChartModal } from "../components/modals";


const HomePage = () => {
    const tools = [
        { name: 'TextBox', icon: 'fa-font' },
        { name: 'Image', icon: 'fa-image' },
        { name: 'LineChart', icon: 'fa-chart-line' },
        { name: 'BarChart', icon: 'fa-chart-simple' }
    ]

    const { layouts, setLayouts } = useLayoutContext();
    const { modals, setModals } = useModalsContext();

    const trashbin = useRef();

    const toolDragItem = useRef();
    const layoutDragItem = useRef();

    const dragStart = (type, e) => {
        let target = e.currentTarget.id;
        if (type == 'tools')
            toolDragItem.current = target
        if (type == 'layouts') {
            layoutDragItem.current = target
            trashbin.current.classList.remove('d-none')
        }
    }

    const dragEnd = (e) => {
        toolDragItem.current = null;
        trashbin.current.classList.add('d-none')
    }

    const onDragOverLayout = (e) => {
        e.preventDefault();
        if (!toolDragItem.current)
            return
        e.currentTarget.classList.add('border')
        e.currentTarget.classList.add('border-primary')
        e.currentTarget.classList.add('opacity-50')

    }
    const onDragLeaveLayout = (e) => {
        if (!toolDragItem.current)
            return
        e.currentTarget.classList.remove('border')
        e.currentTarget.classList.remove('border-primary')
        e.currentTarget.classList.remove('opacity-50')
    }

    const onDropLayout = (e) => {
        switch (toolDragItem.current) {
            case 'TextBox':
                setModals({ ...modals, showTextBoxInput: true })
                break;
            case 'Image':
                setModals({ ...modals, showImageInput: true })
                break;
            case 'BarChart':
            case 'LineChart':
                setModals({ ...modals, showChartInput: toolDragItem.current })
            default:
                break;
        }
        trashbin.current.classList.add('d-none')
        onDragLeaveLayout(e)
        toolDragItem.current = null;
    }

    const onDragOverItem = (e) => {
        e.preventDefault();
        if (!layoutDragItem.current)
            return
        e.currentTarget.classList.add('border')
        e.currentTarget.classList.add('border-info')
        e.currentTarget.classList.add('opacity-50')

    }

    const onDragLeaveItem = (e) => {
        if (!layoutDragItem.current)
            return
        e.currentTarget.classList.remove('border')
        e.currentTarget.classList.remove('border-info')
        e.currentTarget.classList.remove('opacity-50')
    }

    const onDropItem = (e) => {
        if (!layoutDragItem.current)
            return
        let tempLayouts = [...layouts];
        let dragItemContent = tempLayouts[layoutDragItem.current];
        tempLayouts.splice(layoutDragItem.current, 1);
        tempLayouts.splice(e.currentTarget.id, 0, dragItemContent);
        setLayouts(tempLayouts);

        onDragLeaveItem(e)
        layoutDragItem.current = null;
    }

    const trashOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('opacity-50')
    }
    const trashLeave = (e) => {
        e.currentTarget.classList.remove('opacity-50')
    }

    const trashDrop = (e) => {
        let tempLayouts = layouts.filter((item, i) => layoutDragItem.current != i);
        setLayouts(tempLayouts);
        trashbin.current.classList.add('d-none')
        trashLeave(e)
    }

    const renderLayouts = (input) => {
        switch (input?.type) {
            case 'TextBox':
                return <Card.Text>{input.data}</Card.Text>
            case 'Image':
                return <Card.Img src={input.data} />
            case 'BarChart':
                return <BarChart graphData={input.graphData} title={input.title} />
            case 'LineChart':
                return <LineChart graphData={input.graphData} title={input.title} />
            default:
                break;
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={2} className="border mt-3 bg-dark text-light p-4">
                        <h5>Tools</h5>
                        <div className="main-h">
                            {tools.map(tool => {
                                return (
                                    <div key={tool.name}
                                        className="cursor-grab btn mb-2 text-start btn-light w-100"
                                        id={tool.name}
                                        onDragStart={dragStart.bind(this, 'tools')}
                                        onDragEnd={dragEnd}
                                        draggable
                                    >
                                        <i className="text-muted ms-auto fa-solid fa-grip-lines-vertical"></i>
                                        <i className={`ms-3 me-1 text-primary fa-solid ${tool.icon}`}></i>
                                        <span>{tool.name}</span>
                                    </div>
                                )
                            })}
                            <div style={{ height: '150px' }}
                                onDragLeave={trashLeave}
                                className="alert alert-danger mt-5 w-100 d-flex align-items-center justify-content-center d-none"
                                onDragOver={trashOver}
                                onDrop={trashDrop}
                                ref={trashbin}
                            >
                                <i className="h1 fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </Col>
                    <Col md={10} className="border mt-3 text-dark bg-light p-4" >
                        <h5>Layout</h5>
                        <div
                            className="w-100 bg-white p-4 shadow main-h overflow-auto"
                            onDragLeave={onDragLeaveLayout}
                            onDrop={onDropLayout}
                            onDragOver={onDragOverLayout}
                        >
                            {layouts.map((el, i) => {
                                return (
                                    <div className="cursor-grab"
                                        draggable key={i}
                                        onDrop={onDropItem}
                                        id={i}
                                        onDragStart={dragStart.bind(this, 'layouts')}
                                        onDragLeave={onDragLeaveItem}
                                        onDragEnd={dragEnd}
                                        onDragOver={onDragOverItem}
                                    >
                                        <Card className="w-100 mb-2">
                                            <Card.Body>
                                                {renderLayouts(el)}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}

                            {!layouts?.length && <span className="text-muted">grab some tools here . . . </span>}
                        </div>
                    </Col>
                </Row>

            </Container>
            <TextModal />
            <ImageModal />
            <ChartModal />
        </>
    )
}

export default HomePage