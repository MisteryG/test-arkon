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
                    dataTerminated={this.props.dataTerminated}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataTerminated: state.dataTerminated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createData:(data)=>{dispatch(actionTypes.createData(data))}
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(Principal);