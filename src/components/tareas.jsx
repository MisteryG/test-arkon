import React, {useEffect,useState} from 'react'
import {Form, Button, Modal, Table, Navbar, Nav, FormControl} from 'react-bootstrap'
import {Container,Row,Col,Label} from 'reactstrap'

function Tareas (props) {
    const [errorTime, setErrorTime] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [task, setTask] = useState({})

    const handleChange = ( event ) => {
        let property = event.target.id
        let value = event.target.value
        if (property=="durationTask") {
            // validacion para la hora que no pase de las dos horas y cumpla con el formato
            setErrorTime(true)
            let regex = /((?:0?[0-1]):[0-5][0-9]:[0-5][0-9])|2:00:00/gm;
            let m;
            while ((m = regex.exec(value)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                m.forEach((match, groupIndex) => {
                    setErrorTime(false)
                });
            }
        }
        setTask( { ...task, [property]:value})
    }

    let {description,durationTask} = task

    return (
        <Container fluid>
            <Modal show={showModal} onHide={()=>setShowModal(!showModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Creación de Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="p-3 bg-dark text-white my-3">
                        <Form.Group>
                            <Form.Label>Descripcion tarea</Form.Label>
                            <Form.Control type="description" placeholder="Ingresa tu descripción" value={description} id="description" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duracion tarea</Form.Label>
                            <Form.Control type="durationTask" placeholder="00:00:00" value={durationTask} id="durationTask" onChange={handleChange}/>
                            {
                                errorTime
                                ?   <Form.Text className="text-muted">
                                        Error en la hora, recuerda que no puede ser arriba de dos horas.
                                    </Form.Text>
                                :   null
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModal(!showModal)}>Cerrar</Button>
                    <Button variant="primary" onClick={()=>{console.log("prueba",task)}}>Crear Tarea</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col md="10"/>
                <Col md="2">
                    <Button variant="secondary" size="lg" onClick={()=>{setShowModal(!showModal)}}>Crear Tarea</Button>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Tareas Pendientes</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link >Ordenar por tiempo</Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" />
                                <Button variant="outline-info">Busqueda</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md="6">
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Tareas Finalizadas</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link >Ordenar por tiempo</Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" />
                                <Button variant="outline-info">Busqueda</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Tareas