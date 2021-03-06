import React from 'react'
import { connect } from 'react-redux'
import Navegacion from "../components/navegacion"
import Grafica from "../components/grafica"

class GraficaContainer extends React.Component {
    // contenedor para la grafica
    // no hace peticiones solo consume data del redux
    render (){
        return(
            <React.Fragment>
                <Navegacion/>
                <Grafica
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

export default connect (mapStateToProps,null)(GraficaContainer);