import React, {useState, useEffect} from 'react'
import {Form, Button, Modal, Navbar} from 'react-bootstrap'
import {Container,Row,Col} from 'reactstrap'
import { AlarmOn, Done, Delete, Settings, AlarmOff, Alarm, Restore } from '@material-ui/icons';
import moment from 'moment'
import GenericTable from '../generic/table'
import { secondsToString, arrayToSeconds } from '../constants/constants'
import { useLayoutEffect } from 'react';
// componente donde se registran las tareas y se ve el historico
function Tareas (props) {
    // constante para reseteo de variables en caso de que se salga de la pagina o se de refresh cuando este un conteo
    const [refresh,setRefresh] = useState(false)
    // variable para manejo de errores en el tiempo en el modal
    const [errorTime, setErrorTime] = useState(false)
    // variable para mostrar o no el modal de creacion edicion
    const [showModal, setShowModal] = useState(false)
    // check del modal para escoger ingreso manual o por select
    const [selectorModal, setSelectorModal] = useState(false)
    // variable para la tarea del modal
    const [task, setTask] = useState({})
    // variable para el control del tiempo del  intervalo
    const [initInterval, setInitInterval] = useState({});
    // variable para el control de la pausa, inicio, termino y reset del intervalo
    const [isActive, setIsActive] = useState(false);
    // variable donde esta la informacion filtrada de la primer tabla
    const [filterData, setFilterData] = useState([])
    // varibale para la seleccion de la edicion o creacion en el modal
    const [editData,setEditData] = useState(false)
    // filtro que se debe de tomar para la clasificacion por tiempo
    const [timeClasificationFilter, setTimeClasificationFilter] = useState(0)

    const resetTime = () => {
        // funcion para el reinicio de tiempo
        // se coloca tiempo inicial, se cambia la variable para los iconos en la tabla
        // se pasa la data al redux
        setIsActive(false);
        let newArray = initInterval.orderArray.map (val=>{
            if (val.index==initInterval.index) {
                val.totDiference=val.totHour
                val.totTimeExpend=secondsToString(initInterval.timeExpend)
                val.initTime=false
            }
            return val
        })
        setInitInterval({})
        props.addData(newArray)
    }

    useLayoutEffect(()=>{
        // funcion para que en caso de detener el contador por refresh o cambio de pagina
        // los iconos de contador regresen al estado inicial se envia data al redux
        let setStart = props.dataInitial.map(value=>{
            value.initTime=false
            return value
        })
        props.addData(setStart)
    },[refresh])

    useEffect(() => {
        //use effect que sirve para el manejo de contadores
        //inicio, pausa, detener o reiniciar
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
        return () => clearInterval(interval)
    }, [isActive,initInterval]);

    useEffect(()=>{
        //use effect que sirve para filtrar la tabla de acuerdo a la duracion de tareas
        //de acuerdo a lo seleccionado por el usuario
        if(timeClasificationFilter==0) {
            setFilterData(props.dataInitial)
        } else if (timeClasificationFilter==1) {
            let newArray = props.dataInitial.filter(val=>arrayToSeconds(val.totHour)<=1800)
            setFilterData(newArray)
        } else if (timeClasificationFilter==2) {
            let newArray = props.dataInitial.filter(val=>arrayToSeconds(val.totHour)>1800&&arrayToSeconds(val.totHour)<=3600)
            setFilterData(newArray)
        } else if (timeClasificationFilter==3) {
            let newArray = props.dataInitial.filter(val=>arrayToSeconds(val.totHour)>3600)
            setFilterData(newArray)
        }
    },[props.dataInitial, timeClasificationFilter])

    //cursor de mano para cuando se coloca sobre algun icono de accion
    const withPointer = {cursor: 'pointer'};

    const functionFormatter = (cell, row, rowIndex) => {
        //funcion para darle formato a la columna opciones en la primer tabla
        return <span>
        {
            !row.initTime
            ?   <>
                <i data-toggle="tooltip" data-placement="bottom" title="Iniciar tarea">
                    <Alarm
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>{
                            resetTaskArray()
                            initClock(e.currentTarget.id)
                        }}
                    />
                </i>
                <i data-toggle="tooltip" data-placement="bottom" title="Borrar tarea">
                    <Delete
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>deleteData("initial",e.currentTarget.id)}
                    />
                </i>
                <i data-toggle="tooltip" data-placement="bottom" title="Editar tarea">
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
                            if (durationTask==="00:00:00"||durationTask==="00:30:00"||durationTask==="00:45:00"||durationTask==="01:00:00"){
                                selectorModal(true)
                            }
                        }}
                    />
                </i>
                </>
            :   <>
                <i data-toggle="tooltip" data-placement="bottom" title="Detener tarea">
                    <AlarmOff
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>setIsActive(false)}
                    />
                </i>
                <i data-toggle="tooltip" data-placement="bottom" title="Iniciar tarea">
                    <AlarmOn
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>setIsActive(true)}
                    />
                </i>
                <i data-toggle="tooltip" data-placement="bottom" title="Reiniciar tarea">
                    <Restore
                        fontSize="small"
                        style={withPointer}
                        id={row.index}
                        onClick={(e)=>resetTime()}
                    />
                </i>
                </>
        }
        <i data-toggle="tooltip" data-placement="bottom" title="Finalizar tarea">
            <Done
                fontSize="small"
                style={withPointer}
                id={row.index}
                onClick={(e)=>handleDone(e.currentTarget.id)}
            />
        </i>
        </span> 
    }

    const columns_initial = [
        //columnas para la primer tabla
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
            text: 'Tiempo Restante'
        },
        {
            dataField: 'initTime',
            text: 'Opciones',
            formatter: functionFormatter
        }
    ]

    const columns_terminated = [
        // columnas para la primer tabla
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

    const resetTaskArray = () => {
        //funcion donde se coloca el inittime en false
        //y se reinicia el contador junto con sus iconos
        let updateData = props.dataInitial.map( val => {
            val.initTime = false
            return val
        })
        props.addData(updateData)
    }

    const initClock = (index) => {
        // iniciar el conteo descendiente de la actividad seleccionada inicia el intervalo
        let found = props.dataInitial.find(value=>value.index==index)
        let timeExpend = 1
        if (found.hasOwnProperty('totTimeExpend')) {
            timeExpend = arrayToSeconds(found.totTimeExpend)
        }
        found.initTime = true
        let timeSeconds = arrayToSeconds(found.totDiference)
        let filter = props.dataInitial.filter(value=>value.index!=index)
        let orderArray = []
        orderArray.push(found)
        orderArray = orderArray.concat(filter)
        props.clearInitialData()
        props.addData(orderArray)
        setInitInterval({
            timeSeconds,
            orderArray,
            index,
            timeExpend
        })
        setIsActive(true)
    } 

    const deleteData = (name,position) => {
        // elimina informacion de cualquiera de las dos tablas
        setIsActive(false)
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
        //50 elementos con fechas y tiempos aleatorios
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
            let timeSeconds = arrayToSeconds(totHour)
            let objectRandom = {
                index:countData+1,
                nombreTarea: Math.random().toString(36).substring(10),
                fecha:moment(inicioFecha, 'MM/DD/YYYY').add(Math.trunc(0 + Math.random() * (7 - 0)),'day').format('MM/DD/YYYY'),
                totHour,
                totTimeExpend: secondsToString(Math.trunc(Math.floor(timeSeconds*randomPercent)/100)),
                edition: false
            }
            arrayData.push(objectRandom)
        }
        props.createData(arrayData)
    }

    const constCreateTask = () => {
        //funcion donde se crean las tareas nuevas
        //del modal de creacion
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
        //del modal actualizar
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
        //funcion que valida que se encuentre la tarea en el rango de horas
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
                m.forEach(() => {
                    setErrorTime(false)
                });
            }
        }
        setTask( { ...task, [property]:value})
    }

    const handleDone = (position) => {
        //funcion que detiene el contador en caso de que este corriendo
        //finaliza la tarea seleccionada
        setIsActive(false)
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
        //funcion que controla los estados necesarios al cerrar el modal
        setShowModal(!showModal)
        setTask({})
        setSelectorModal(false)
        setEditData(false)
    }

    //variables necesarias en el modal
    let {description,durationTask} = task
    //se activa o desactiva el boton guardar del modal
    let disButton=Object.keys(task).length!==0&&task.hasOwnProperty('description')&&task.hasOwnProperty('durationTask')&&!errorTime?false:true
    
    return (
        <Container fluid>
            {/* modal de edicion creacion */}
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
                        {
                            selectorModal
                            ?   <Form.Group>
                                    <Form.Label>Duracion tarea</Form.Label>
                                    <Form.Control type="durationTask" placeholder="00:00:00" value={durationTask} id="durationTask" onChange={handleChange}
                                        onKeyDown={(e)=>{
                                            if (e.which!==190&&e.which!==8&&(e.which<37||(e.which>57&&e.which<96)||e.which>105)){
                                                e.preventDefault()
                                            }
                                        }}
                                    />
                                    {
                                        errorTime
                                        ?   <Form.Text className="text-muted">
                                                Error en la hora, recuerda que no puede ser arriba de dos horas.
                                            </Form.Text>
                                        :   null
                                    }
                                </Form.Group>
                            :   <Form.Group>
                                    <Form.Label>Duracion</Form.Label>
                                    <Form.Control as="select" id="durationTask" value={durationTask} onChange={handleChange}>
                                        <option value="00:00:00">Selecciona</option>
                                        <option value="00:30:00">Corto</option>
                                        <option value="00:45:00">Medio</option>
                                        <option value="01:00:00">Largo</option>
                                    </Form.Control>
                                </Form.Group>
                        }
                        <Form.Group>
                            <Form.Check type="checkbox" label="Ingreso manual" value={selectorModal} onChange={()=>{setSelectorModal(!selectorModal)}}/>
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
            <Row style={{paddingTop:"10px", paddingBottom:"10px"}} md="12">
                <Col class="col-md-5 col-lg-2">
                    {/* botones para creacion de tareas, limpieza de redux y random de historico*/}
                    <Button variant="secondary" onClick={()=>{
                        setIsActive(false)
                        props.clearAllData()
                    }}>Reset</Button>{' '}
                    <Button variant="secondary" onClick={()=>{createData()}}>Random Tareas Finalizadas</Button>{' '}
                    <Button variant="secondary" onClick={()=>{handleCloseModal()}}>Crear Tarea</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    {/* filtro para la primer tabla */}
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Tareas Pendientes</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Duracion</Form.Label>
                                <Form.Control as="select" onChange={(event)=>setTimeClasificationFilter(event.target.value)}>
                                    <option value="0">Selecciona</option>
                                    <option value="1">Corto</option>
                                    <option value="2">Medio</option>
                                    <option value="3">Largo</option>
                                </Form.Control>
                            </Form.Group>
                        </Navbar.Collapse>
                    </Navbar>
                    <GenericTable
                        data={filterData}
                        columns={columns_initial}
                        defaultSorted={false}
                    />
                </Col>
                <Col md="6">
                    {/* titulo de la segunda table de historico */}
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Historial de tareas completadas</Navbar.Brand>
                    </Navbar>
                    <GenericTable
                        data={props.dataTerminated}
                        columns={columns_terminated}
                        defaultSorted={true}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Tareas