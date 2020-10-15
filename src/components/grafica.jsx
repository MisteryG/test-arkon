import React, { useState, useEffect } from 'react'
import {VictoryLabel,VictoryAxis,VictoryLine} from 'victory';
import {Container,Row,Col} from 'reactstrap'
import {Card} from 'react-bootstrap'
import moment from 'moment'
import { secondsToString, arrayToSeconds } from '../constants/constants'

//componente donde se encuentra la grafica usando victory
function Grafica (props) {

    const getStyles = () => {
        // funcion donde se cargan los estilos de la tabla
        const BLUE_COLOR = "#00a3de";
        const RED_COLOR = "#7c270b";
    
        return {
            parent: {
                background: "#ccdee8",
                boxSizing: "border-box",
                display: "inline",
                padding: 0,
                fontFamily: "'Fira Sans', sans-serif"
            },
            title: {
                textAnchor: "start",
                verticalAnchor: "end",
                fill: "#000000",
                fontFamily: "inherit",
                fontSize: "18px",
                fontWeight: "bold"
            },
            labelNumber: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontFamily: "inherit",
                fontSize: "14px"
            },
        
            // INDEPENDENT AXIS
            axisYears: {
                axis: { stroke: "black", strokeWidth: 1},
                ticks: {
                stroke: "black",
                strokeWidth: 1
                },
                tickLabels: {
                fill: "black",
                fontFamily: "inherit",
                fontSize: 16
                }
            },
        
            // DATA SET ONE
            axisOne: {
                grid: {
                stroke: ({ tick }) =>
                    tick === -10 ? "transparent" : "#ffffff",
                strokeWidth: 2
                },
                axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
                ticks: { strokeWidth: 0 },
                tickLabels: {
                fill: BLUE_COLOR,
                fontFamily: "inherit",
                fontSize: 16
                }
            },
            labelOne: {
                fill: BLUE_COLOR,
                fontFamily: "inherit",
                fontSize: 12,
                fontStyle: "italic"
            },
            lineOne: {
                data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
            },
            axisOneCustomLabel: {
                fill: BLUE_COLOR,
                fontFamily: "inherit",
                fontWeight: 300,
                fontSize: 21
            },
        
            // DATA SET TWO
            axisTwo: {
                axis: { stroke: RED_COLOR, strokeWidth: 0 },
                tickLabels: {
                fill: RED_COLOR,
                fontFamily: "inherit",
                fontSize: 16
                }
            },
            labelTwo: {
                textAnchor: "end",
                fill: RED_COLOR,
                fontFamily: "inherit",
                fontSize: 12,
                fontStyle: "italic"
            },
            lineTwo: {
                data: { stroke: RED_COLOR, strokeWidth: 4.5 }
            },
        
            // HORIZONTAL LINE
            lineThree: {
                data: { stroke: "#e95f46", strokeWidth: 2 }
            }
        };
    }

    const getDataSetOne = () => {
        //funcion donde se calcula la informacion de las tareas completadas
        //de acuerdo al tiempo que utilizo el usuario
        let dataOrigin = []
        props.dataTerminated.forEach(element => {
        let day = moment(element.fecha, 'MM/DD/YYYY').format('DD')
        let time = arrayToSeconds(element.totTimeExpend)
        if (dataOrigin.length!==0) {
            let value = dataOrigin.findIndex(val=>val.x==day)
            if (value!=-1) {
                let obj = {...dataOrigin[value]}
                dataOrigin[value]={x:obj.x,y:obj.y+time}
            } else {
                dataOrigin.push({x:day,y:time})
            }
        } else {
            dataOrigin.push({x:day,y:time})
        }
        });
        let dataSend = dataOrigin.map(val=>{
            return {x:parseInt(val.x),y:parseInt(secondsToString(val.y).substring(0,2))}
        })
        return dataSend;
    }
    
    const getDataSetTwo = () => {
        //funcion donde se calcula la informacion de las tareas completadas
        //de acuerdo al tiempo que se ingreso al inicio por el usuario
        let dataOrigin = []
        props.dataTerminated.forEach(element => {
        let day = moment(element.fecha, 'MM/DD/YYYY').format('DD')
        let time = arrayToSeconds(element.totHour)
        if (dataOrigin.length!==0) {
            let value = dataOrigin.findIndex(val=>val.x==day)
            if (value!=-1) {
                let obj = {...dataOrigin[value]}
                dataOrigin[value]={x:obj.x,y:obj.y+time}
            } else {
                dataOrigin.push({x:day,y:time})
            }
        } else {
            dataOrigin.push({x:day,y:time})
        }
        });
        let dataSend = dataOrigin.map(val=>{
            return {x:parseInt(val.x),y:parseInt(secondsToString(val.y).substring(0,2))}
        })
        return dataSend;
    }
    
    const getTickValues = () => {
        // calculo de los dias anteriores a la fecha actual
        // para colocar la informacion de las dos funciones anteriores
        let inicioFecha = moment().subtract(7, 'days').calendar()
        return [
            moment(inicioFecha, 'MM/DD/YYYY').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(1,'day').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(2,'day').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(3,'day').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(4,'day').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(5,'day').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(6,'day').format('DD'),
            moment(inicioFecha, 'MM/DD/YYYY').add(7,'day').format('DD')
        ];
    }

    //constante de los estilos
    const [styles,setStyles] = useState(getStyles())
    //constante del tiempo invertido
    const [dataSetOne,setDataSetOne] = useState(getDataSetOne())
    //contante del tiempo ingresado
    const [dataSetTwo,setDataSetTwo] = useState(getDataSetTwo())
    //constante de los dias anteriores a la fecha para el eje x
    const [tickValues,setTickValues] = useState(getTickValues())
    //objeto que indica el dia inicial y el final en string
    const [fechas,setFechas] = useState({})

    const getMaxTime = () => {
        //calcula el tiempo maximo en horas para el eje y
        let maxtime = 0
        dataSetOne.forEach(val=>{
            if (val.y>maxtime){
                maxtime=val.y
            }
        })
        dataSetTwo.forEach(val=>{
            if (val.y>maxtime){
                maxtime=val.y
            }
        })
        maxtime++
        return maxtime
    }

    //maximo tiempo en horas de las tareas
    const [maxHourTime,setMaxHourTime] = useState(getMaxTime())

    const getRangeDays = () => {
        //calculo del rango de fechas en los datos de tareas terminadas
        let minDate = 31
        let maxDate = 0
        dataSetOne.forEach(val=>{
            if (val.x>maxDate){
                maxDate=val.x
            }
            if (val.x<minDate){
                minDate=val.x
            }
        })
        maxDate++
        return {min:minDate,max:maxDate}
    }

    //objeto que indica el dia inicial y final en entero
    //para indicar donde se coloca el dato en el eje x
    const [rangeDays,setRangeDays] = useState(getRangeDays())
        
    useEffect(()=>{
        //useeffect que verifica que se cuente con las fechas para colocar el string inicial y final
        if (Object.keys(fechas).length==0){
            setFechas({start:tickValues[0],end:tickValues[tickValues.length]})
        }
    },[tickValues])

    return (
        <Container style={{display: "flex", alignContent: "center", flexDirection: "column", height:"93vh"}}>
            {/* validacion que veririfica si hay data para mostrar grafica */}
            {
                props.dataTerminated.length===0
                ?   <Row style={{padding:"10px"}}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>No se puede mostrar la gráfica</Card.Title>
                                    <Card.Text>
                                        No hay información con la que se pueda generar la gráfica
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                :   <Row >
                        <Col md="12">
                        <svg style={styles.parent} viewBox="0 0 450 350">
                        {/* Create stylistic elements */}
                        <rect x="0" y="0" width="10" height="30" fill="#f01616"/>

                        {/* Define labels */}
                        <VictoryLabel x={25} y={24} style={styles.title}
                            text="Productividad por 7 dias"
                        />
                        <VictoryLabel x={25} y={55} style={styles.labelOne}
                            text={"Horas laboradas\n por día"}
                        />
                        <VictoryLabel x={425} y={55} style={styles.labelTwo}
                            text={"Horas calculadas\n por día"}
                        />

                        <g transform={"translate(0, 40)"}>
                            {/* Add shared independent axis */}
                            <VictoryAxis
                            scale="time"
                            standalone={false}
                            style={styles.axisYears}
                            tickValues={tickValues}
                            />

                            {/*
                            Add the dependent axis for the first data set.
                            Note that all components plotted against this axis will have the same y domain
                            */}
                            <VictoryAxis dependentAxis
                            domain={[0, maxHourTime]}
                            offsetX={50}
                            orientation="left"
                            standalone={false}
                            style={styles.axisOne}
                            />

                            {/* dataset one */}
                            <VictoryLine
                            data={dataSetOne}
                            domain={{
                                x: [rangeDays.min, rangeDays.max],
                                y: [0, maxHourTime]
                            }}
                            interpolation="monotoneX"
                            scale={{x: "linear", y: "linear"}}
                            standalone={false}
                            style={styles.lineOne}
                            />

                            {/*
                            Add the dependent axis for the second data set.
                            Note that all components plotted against this axis will have the same y domain
                            */}
                            <VictoryAxis dependentAxis
                            domain={[0, maxHourTime]}
                            orientation="right"
                            standalone={false}
                            style={styles.axisTwo}
                            />

                            {/* dataset two */}
                            <VictoryLine
                            data={dataSetTwo}
                            domain={{
                                x: [rangeDays.min, rangeDays.max],
                                y: [0, maxHourTime]
                            }}
                            interpolation="monotoneX"
                            scale={{x: "linear", y: "linear"}}
                            standalone={false}
                            style={styles.lineTwo}
                            />
                        </g>
                        </svg>
                        </Col>
                    </Row>
            }
        </Container>
    )
}

export default Grafica