import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

function Navegacion () {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/menu/principal">Navegación</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/menu/principal">Creación de Tareas</Nav.Link>
                    <Nav.Link href="#link">Graficas</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navegacion