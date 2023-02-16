import { Container, Navbar as Nbar } from 'react-bootstrap';

export const Navbar = () => {
    return (
        <Nbar bg="primary" variant='dark' expand="lg">
            <Container>
                <Nbar.Brand>Drag and Drop Items</Nbar.Brand>
            </Container>
        </Nbar>
    )
}