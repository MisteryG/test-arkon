import React, { useState, useEffect } from 'react'
import {VictoryLabel,VictoryAxis,VictoryLine} from 'victory';
import {Container,Row,Col} from 'reactstrap'
import moment from 'moment'
import { secondsToString, arrayToSeconds } from '../constants/constants'

function Grafica (props) {

    const getStyles = () => {
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
        console.log(dataSend)
        return dataSend;
    }
    
    const getTickValues = () => {
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

    const [styles,setStyles] = useState(getStyles())
    const [dataSetOne,setDataSetOne] = useState(getDataSetOne())
    const [dataSetTwo,setDataSetTwo] = useState(getDataSetTwo())
    const [tickValues,setTickValues] = useState(getTickValues())
    const [fechas,setFechas] = useState({})
    const [maxHourTime,setMaxHourTime] = useState(0)
        
    useEffect(()=>{
        if (Object.keys(fechas).length==0){
            setFechas({start:tickValues[0],end:tickValues[tickValues.length]})
        }
    },[tickValues])

    return (
        <Container style={{display: "flex", alignContent: "center", flexDirection: "column", height:"93vh"}}>
            <Row >
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
                    domain={[0, 12]}
                    offsetX={50}
                    orientation="left"
                    standalone={false}
                    style={styles.axisOne}
                    />

                    {/* dataset one */}
                    <VictoryLine
                    data={dataSetOne}
                    domain={{
                        x: [7, 14],
                        y: [0, 12]
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
                    domain={[0, 12]}
                    orientation="right"
                    standalone={false}
                    style={styles.axisTwo}
                    />

                    {/* dataset two */}
                    <VictoryLine
                    data={dataSetTwo}
                    domain={{
                        x: [7, 14],
                        y: [0, 12]
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
        </Container>
    )
}

export default Grafica