import React, {useState, useEffect} from 'react'
import {Form, Button, Modal, Navbar, FormControl} from 'react-bootstrap'
import {Container,Row,Col} from 'reactstrap'
import { AlarmOn, Done, Delete, Settings, AlarmOff, Alarm, Restore } from '@material-ui/icons';
import moment from 'moment'
import BootstrapTable from 'react-bootstrap-table-next';

function Tareas (props) {
    const [errorTime, setErrorTime] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [task, setTask] = useState({})
    const [initInterval, setInitInterval] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [editData,setEditData] = useState(false) 

    function resetTime() {
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(()=>{
                if (initInterval.timeSeconds==0) {
                    handleDone(initInterval.index)
                    clearInterval(interval)
                } else {
                    let obj = {...initInterval}
                    obj.timeSeconds=initInterval.timeSeconds-1
                    obj.timeExpend=initInterval.timeExpend+1
                    setInitInterval(obj)
                    let newArray = initInterval.orderArray.map (val=>{
                        if (val.index==initInterval.index) {
                            val.totDiference=secondsToString(initInterval.timeSeconds)
                            val.totTimeExpend=secondsToString(initInterval.timeExpend)
                        }
                        return val
                    })
                    props.addData(newArray)
                }
            }, 1000)
        } else if (!isActive && initInterval.timeSeconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive,initInterval]);

    useEffect(()=>{
        setFilterData(props.dataInitial)
    },[props.dataInitial])

    const withPointer = {cursor: 'pointer'};

    const columns_initial = [
        {
            dataField: 'index',
            text: '#',
            sort: true
        },
        {
            dataField: 'nombreTarea',
            text: 'Nombre tarea',
            sort: true
        },
        {
            dataField: 'totHour',
            text: 'Tiempo Total',
            sort: true
        },
        {
            dataField: 'totDiference',
            text: 'Tiempo Restante',
            sort: true
        },
        {
            dataField: 'opciones',
            text: 'Opciones',
            formatter: ((cell, row)=>{
                return <>
                    {
                        !row.initTime
                        ?   <>   
                            <Alarm
                                fontSize="small"
                                style={withPointer}
                                id={row.index}
                                onClick={(e)=>initClock(e.currentTarget.id)}
                            />
                            <Delete
                                fontSize="small"
                                style={withPointer}
                                id={row.index}
                                onClick={(e)=>deleteData("initial",e.currentTarget.id)}
                            />
                            <Settings
                                fontSize="small"
                                style={withPointer}
                                id={row.index}
                                onClick={(e)=> {
                                    let found = props.dataInitial.find(value=>value.index==e.currentTarget.id)
                                    setEditData(true)
                                    setTask({
                                        description:found.nombreTarea,
                                        durationTask:found.totHour,
                                        index:found.index
                                    })
                                    setShowModal(true)
                                }}
                            />
                            </>
                        :   <>
                            <AlarmOff
                                fontSize="small"
                                style={withPointer}
                                id={row.index}
                                onClick={(e)=>setIsActive(false)}
                            />
                            <AlarmOn
                                fontSize="small"
                                style={withPointer}
                                id={row.index}
                                onClick={(e)=>setIsActive(true)}
                            />
                            <Restore
                                fontSize="small"
                                style={withPointer}
                                id={row.index}
                                onClick={(e)=>initClock(e.currentTarget.id)}
                            />
                            </>
                    }
                    <Done
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>handleDone(e.currentTarget.id)}
                    />
                </>  
            })
        }
    ]

    const columns_terminated = [
        {
            dataField: 'index',
            text: '#',
            sort: true,
            width:"200"
        },
        {
            dataField: 'nombreTarea',
            text: 'Nombre tarea',
            sort: true
        },
        {
            dataField: 'totHour',
            text: 'Tiempo Total',
            sort: true,
        },
        {
            dataField: 'totTimeExpend',
            text: 'Tiempo Consumido',
            sort: true,
        },
        {
            dataField: 'opciones',
            text: 'Opciones',
            formatter: ((cell, row)=>{
                return <>
                    <Delete
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>deleteData("terminated",e.currentTarget.id)}
                    />
                </>
            })
        }
    ]

    const initClock = (index) => {
        let found = props.dataInitial.find(value=>value.index==index)
        found.initTime = true
        var arrayDeCadenas = found.totDiference.split(':');
        let filter = props.dataInitial.filter(value=>value.index!=index)
        let orderArray = []
        orderArray.push(found)
        orderArray = orderArray.concat(filter)
        props.addData(orderArray)
        let timeSeconds = (parseInt(arrayDeCadenas[0])*3600)+(parseInt(arrayDeCadenas[1])*60)+parseInt(arrayDeCadenas[2])
        setInitInterval({
            timeSeconds,
            orderArray,
            index,
            timeExpend:1
        })
        setIsActive(true)
    }   

    const deleteData = (name,position) => {
        let data = []
        if (name==="initial") {
            data = props.dataInitial.filter(val => val.index!=position)
            props.addData(data)
        } else if (name==="terminated") {
            data = props.dataTerminated.filter(val => val.index!=position)
            props.createData(data)
        }
    }

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
            let randomPercent = Math.trunc(80 + Math.random() * (100 - 80))
            let timeSeconds = (parseInt(hour)*3600)+(parseInt(min)*60)+parseInt(sec)
            let objectRandom = {
                index:countData+1,
                nombreTarea: Math.random().toString(36).substring(10),
                fecha:moment(inicioFecha, 'MM/DD/YYYY').add(Math.trunc(Math.random()*10),'day').format('MM/DD/YYYY'),
                totHour,
                totTimeExpend: secondsToString(Math.trunc(Math.floor(timeSeconds*randomPercent)/100)),
                edition: false
            }
            arrayData.push(objectRandom)
        }
        props.createData(arrayData)
    }

    const secondsToString = (seconds) => {
        //funcion para convertir de segundos a horas
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
    }

    const constCreateTask = () => {
        //funcion donde se crean las tareas nuevas
        let index=0
        props.dataInitial.forEach(value=>{
            if (index<value.index) {
                index=value.index
            }
        })
        let fecha = moment().format('MM/DD/YYYY')
        let objSend = {
            index:index+1,
            nombreTarea: task.description,
            fecha,
            totHour: task.durationTask,
            totDiference: task.durationTask,
            initTime: false
        }
        let array = props.dataInitial
        array.push(objSend)
        props.addData(array)
    }

    const updateTask = () => {
        //funcion donde se actualizan las tareas
        let updateData = props.dataInitial.map( val => {
            if (val.index==task.index) {
                val.nombreTarea=task.description
                val.totHour= task.durationTask
                val.totDiference= task.durationTask
            }
            return val
        })
        props.addData(updateData)
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

    const handleDone = (position) => {
        let found = props.dataInitial.find(val=>val.index==position)
        let data = props.dataInitial.filter(val => val.index!=position)
        let index=0
        props.dataTerminated.forEach(value=>{
            if (index<value.index) {
                index=value.index
            }
        })
        found = {...found,index:index+1}
        let array = props.dataTerminated
        array.push(found)
        props.addData(data)
        props.createData(array)
    }

    const handleCloseModal = () => {
        setShowModal(!showModal)
        setTask({})
        setEditData(false)
    }

    let {description,durationTask} = task
    let disButton=Object.keys(task).length!==0&&task.hasOwnProperty('description')&&task.hasOwnProperty('durationTask')&&!errorTime?false:true
    
    return (
        <Container fluid>
            <Modal show={showModal} onHide={()=>handleCloseModal()}>
                <Modal.Header closeButton>
                    {
                        editData
                        ?   <Modal.Title>Edición de Tarea</Modal.Title>
                        :   <Modal.Title>Creación de Tarea</Modal.Title>
                    }
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
                    <Button variant="primary" disabled={disButton} onClick={()=>{
                        editData?updateTask():constCreateTask()
                        handleCloseModal()
                    }}>{editData?"Actualizar Tarea":"Crear Tarea"}</Button>
                </Modal.Footer>
            </Modal>
            <Row style={{padding:"10px"}}>
                <Col md="7"/>
                <Col md="3">
                    <Button variant="secondary" size="lg" onClick={()=>{createData()}}>Random Tareas Finalizadas</Button>
                </Col>
                <Col md="2">
                    <Button variant="secondary" size="lg" onClick={()=>{handleCloseModal()}}>Crear Tarea</Button>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Tareas Pendientes</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline>
                                <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" />
                                <Button variant="outline-info">Busqueda</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="table-wrapper-scroll-y my-custom-scrollbar">
                        <BootstrapTable
                            bootstrap4
                            keyField="index"
                            data={ filterData }
                            columns={ columns_initial }
                            striped bordered hover
                        />
                    </div>
                </Col>
                <Col md="6">
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Tareas Finalizadas</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline>
                                <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" />
                                <Button variant="outline-info">Busqueda</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="table-wrapper-scroll-y my-custom-scrollbar">
                        <BootstrapTable
                            bootstrap4
                            keyField="index"
                            data={ props.dataTerminated }
                            columns={ columns_terminated }
                            defaultSorted={[{dataField: 'index',order: 'asc'}]}
                            striped bordered hover
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Tareas