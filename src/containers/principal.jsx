import React from 'react'
import { connect } from 'react-redux'
import Navegacion from "../components/navegacion"
import Tareas from "../components/tareas"
import * as actionTypes from '../store/actions/index.js'

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
        clearInitialData:()=>{dispatch(actionTypes.clearInitialData())}
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(Principal);