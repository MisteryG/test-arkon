import React from 'react'
import { connect } from 'react-redux'
import Navegacion from "../components/navegacion"
import Tareas from "../components/tareas"
import * as actionTypes from '../store/actions/index.js'
//container de la pagina principal se envian los datos del redux y las acciones que se necesitan del redux
//al componente Tareas
class Principal extends React.Component {

    render (){
        return(
            <React.Fragment>
                <Navegacion/>
                <Tareas
                    createData={this.props.createData}
                    addData={this.props.addData}
                    clearInitialData={this.props.clearInitialData}
                    dataTerminated={this.props.dataTerminated}
                    dataInitial={this.props.dataInitial}
                    clearAllData={this.props.clearAllData}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataTerminated: state.dataTerminated,
        dataInitial: state.dataInitial
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createData:(data)=>{dispatch(actionTypes.createData(data))},
        addData:(data)=>{dispatch(actionTypes.addData(data))},
        clearInitialData:()=>{dispatch(actionTypes.clearInitialData())},
        clearAllData:()=>{dispatch(actionTypes.clearAllData())}
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(Principal);