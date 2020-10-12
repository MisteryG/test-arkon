import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Navegacion from "../components/navegacion"
import Tareas from "../components/tareas"

class Principal extends React.Component {
    render (){
        return(
            <React.Fragment>
                <Navegacion/>
                <Tareas/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
      
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(Principal);