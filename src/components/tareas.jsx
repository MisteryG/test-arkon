import React, {useState} from 'react'
import {Form, Button, Modal, Table, Navbar, Nav, FormControl} from 'react-bootstrap'
import {Container,Row,Col} from 'reactstrap'
import { AlarmOn, Done, Delete, Settings } from '@material-ui/icons';
import moment from 'moment'

function Tareas (props) {
    const [errorTime, setErrorTime] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [task, setTask] = useState({})

    const withPointer = {cursor: 'pointer'};

    const createData = () => {
        //aqui es donde se crean datos al azar
        let inicioFecha = moment().subtract(7, 'days').calendar()
        let arrayData = []
        let countData = 50
        while(countData--){
            let hour = 0 + Math.random() * (2 - 0) | 0;
            let min = 0 + Math.random() * (59 - 0) | 0;
            let sec = 0 + Math.random() * (59 - 0) | 0;
            hour=hour===0?"00":`0${hour}`
            min=min<10?`0${min}`:min
            sec=sec<10?`0${sec}`:sec
            let totHour = hour===2?"02:00:00":`${hour}:${min}:${sec}`
            let objectRandom = {
                nombreTarea: Math.random().toString(36).substring(10),
                fecha:moment(inicioFecha, 'MM/DD/YYYY').add(Math.trunc(Math.random()*10),'day').format('MM/DD/YYYY'),
                totHour
            }
            arrayData.push(objectRandom)
        }
        props.createData(arrayData)
        console.log(arrayData)
    }

    const handleChange = ( event ) => {
        let property = event.target.id
        let value = event.target.value
        if (property==="durationTask") {
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
    let disButton=Object.keys(task).length!==0&&task.hasOwnProperty('description')&&task.hasOwnProperty('durationTask')&&!errorTime?false:true
    
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
                    <Button variant="primary" disabled={disButton} onClick={()=>{console.log("prueba",task)}}>Crear Tarea</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col md="7"/>
                <Col md="3">
                    <Button variant="secondary" size="lg" onClick={()=>{createData()}}>Random Tareas Finalizadas</Button>
                </Col>
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
                            <th>Nombre tarea</th>
                            <th>Tiempo</th>
                            <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Nombre</td>
                                <td>01:00:00</td>
                                <td>
                                    <AlarmOn
                                        fontSize="small"
                                        style={withPointer}
                                        onClick={()=>console.log("prueba-reloj")}
                                    />
                                    <Done
                                        fontSize="small"
                                        style={withPointer}
                                        onClick={()=>console.log("prueba-paloma")}
                                    />
                                    <Delete
                                        fontSize="small"
                                        style={withPointer}
                                        onClick={()=>console.log("prueba-borrar")}
                                    />
                                    <Settings
                                        fontSize="small"
                                        style={withPointer}
                                        onClick={()=>console.log("prueba-settings")}
                                    />
                                </td>
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
                                <th>Nombre tarea</th>
                                <th>Tiempo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.dataTerminated.length>0
                                ? props.dataTerminated.map((val,index)=>{
                                    return (
                                        <tr id={index}>
                                            <td>{index+1}</td>
                                            <td>{val.nombreTarea}</td>
                                            <td>{val.totHour}</td>
                                            <td>
                                                <Delete
                                                    fontSize="small"
                                                    style={withPointer}
                                                    id={index}
                                                    onClick={(e)=>console.log("prueba-reloj",e.currentTarget.id)}
                                                />
                                                <Settings
                                                    fontSize="small"
                                                    style={withPointer}
                                                    id={index}
                                                    onClick={(e)=>console.log("prueba-settings",e.currentTarget.id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                                : null
                            }                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Tareas