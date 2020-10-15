import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
// componente que se encarga de cambiar la pagina de acuerdo a la seleccion del usuario
// entre el menu principal y las graficas
function Navegacion () {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="/menu/principal">Navegación</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/menu/principal">Creación de Tareas</Nav.Link>
                    <Nav.Link href="/menu/graficas">Graficas</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navegacion